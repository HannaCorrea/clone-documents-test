import React, { useEffect, useRef, useState } from "react";
import DocumentsUpload from "./Components/DocumentsUpload/DocumentsUploadComp";

function App() {
  const [descriptionList, setDescriptionList] = useState<any>();
  const [filesToSend, setFilesToSend] = useState<any>();

  const [allFilesUser, setAllFilesUser] = useState<Document[]>([]);
  const [uploadCurrentFiles, setUploadCurrentFiles] = useState<any>([]);
  const [deleteDescription, setDeleteDescription] = useState(false);
  const [validDescription, setValidDescription] = useState(false);

  const inputRef = useRef<any>();

  const handleUpload = (event: any) => {
    const fileList = event.target.files;
    console.log(fileList);

    const newArray: any = [];
    const clone = { ...fileList };
    newArray.push(clone);
    console.log(newArray);

    // const newFiles: any = [];

    const filesArray: any = Array.from(fileList);

    const filesCurrent: any = [];
    filesArray.forEach((file: any) => {
      const name = file.name;
      const nameArray: string[] = name.split(".");

      // Crea un objeto con los detalles del archivo
      const doc = {
        name: name,
        ext: nameArray[nameArray.length - 1],
        description: "",
      };

      filesCurrent.push(doc);
    });
    setFilesToSend(fileList);
    setUploadCurrentFiles(filesCurrent);

    setDescriptionList([]);
    setDeleteDescription(!deleteDescription);
    const newComments = filesArray.map(() => "");
    setDescriptionList(newComments);
  };

  /** ENVÍO DE ARCHIVOS CARGADOS */
  const handleSendData = async (e: any) => {
    e.preventDefault();

    /** VALIDACIÓN DE CAMPOS VACÍOS EN EL FORMULARIO DE CARGA DE ARCHIVOS */
    const isValidValue = (currentValue: any) => currentValue !== "";
    const validateValue = descriptionList.every(isValidValue);

    /** VALIDA SI LA CANTIDAD DE ARCHIVOS ES IGUAL QUE LA CANTIDAD DE COMENTARIOS */
    if (filesToSend?.length === descriptionList.length && validateValue) {
      const formData = new FormData();

      if (Array.isArray(filesToSend)) {
        filesToSend.forEach((file: any, index: any) => {
          console.log(file);

          formData.append("file[]", file);
          formData.append("comment", descriptionList[index]);
        });
      } else {
        console.log("no es array", filesToSend);
        const vv = [...filesToSend];
        console.log(vv);

        vv.forEach((file: any, index: any) => {
          console.log(file);

          formData.append("file[]", file);
          formData.append("comment", descriptionList[index]);
        });
      }
      const list = {
        "file[]": filesToSend,
        comment: descriptionList,
      };

      const url = " https://api.formarte.co/api/module/students/10/document/";

      console.log(formData);

      const token =
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoibmF0YWxpYXpAZ21haWwuY29tIiwibmFtZSI6Ik5hdGFsaWEiLCJsYXN0IjoiWnVsZXRhIiwidHlwZV91c2VyIjoiWzcsIDFdIiwiaWF0IjoxNzE0MDU2MTY4LCJleHAiOjE3MTQwNTk3Njh9.ncCLUTY3Jy2wm5Cd1M_SwOT-YCDId6w9ay7O-8NGzPjq2291UBaFYCSVSnPvq7gewtu-2prchhFCLj-Za9j5UXt9sNQundU0DNiAmBPvGsvPwZ59EnYt9-Tu37uNc0RHAcCZNQMrglLkZQ5koCngO2Ut4keolqT82MEV_UjQGarns9pvqksWKN6bixAWlTZWb7HDDM0YEJm-gK-r3ZpOzQVUWvX1bRxhBHoLb8ciDyELOVyHf3YYDeUJseFqteUkBMwNmK0FwU4Uu7Mj-kaTEkszk4F7zQFLbSzTPAaETfod-vHURPxrO8FVOyhp7DxSofiN9i5_QrCcHvayPO-xWg";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify(list),
        intercept: false,
      };

      try {
        const response = await window.fetch(url, options);
        const data = await response.json();
        console.log(data);

        if (data?.message === "Archivos subidos exitosamente") {
          inputRef.current.value = null;
          setDescriptionList([]);
          setDeleteDescription(true);
          setUploadCurrentFiles([]);
          alert("Documentos guardados correctamente");
          // getAllFiles();
        } else {
          alert("Error al guardar documentos");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("faltan datos por cargar");
    }
  };

  const cancelUpload = () => {
    inputRef.current.value = null;
    setDescriptionList([]);
    setDeleteDescription(true);
    setUploadCurrentFiles([]);
    // getAllFiles();
  };

  /** ELIMINA UN DOCUMENTO DE LA LISTA DE DOCUMENTOS SELECCIONADOS */
  const deleteOneFile = (e: any, name: any) => {
    e.preventDefault();

    /** eliminamos de la vista previa de doc por enviar */
    const nuevoFilesToSend = filesToSend.filter(
      (file: any) => file.name !== name
    );
    setFilesToSend(nuevoFilesToSend);

    /** eliminamos de la lista oficial de doc por enviar */
    const nuevoCurrentFiles = uploadCurrentFiles.filter(
      (file: any) => file.name !== name
    );
    setUploadCurrentFiles(nuevoCurrentFiles);

    // Eliminamos el elemento correspondiente en descriptionList
    const nuevoDescriptionList = descriptionList.filter(
      (_item: any, index: number) => index !== nuevoFilesToSend.length
    );
    setDescriptionList(nuevoDescriptionList);
  };

  const handleDescription = (index: any, value: any) => {
    if (value.length > 8) {
      setValidDescription(true);
      const newDescriptionList = [...descriptionList];
      newDescriptionList[index] = value;
      setDescriptionList(newDescriptionList);
    } else setValidDescription(false);
  };
  useEffect(() => {
    // getAllFiles();
  }, []);

  useEffect(() => {
    console.log(descriptionList, filesToSend);
    console.log(descriptionList?.length, filesToSend?.length);
  }, [descriptionList, filesToSend]);

  return (
    <section className="documentos-info-user-dashboard">
      <p className="title-documents">Documentos</p>
      <form
        className="uploaded-documents-container"
        // onSubmit={handleSendData}
        id="form_id"
      >
        <div className="upload-button">
          <input
            className="input-file"
            id={"upload"}
            type="file"
            multiple
            ref={inputRef}
            onChange={(e) => handleUpload(e)}
            accept=".png, .jpg, .pdf, .docx"
          />
          <label className="label-file" htmlFor="upload">
            {/* <IconUpload size={"29px"} /> */}
            <p className="title-upload">Adjuntar archivo </p>
          </label>
        </div>
        <div className="current-files-container"></div>
      </form>

      <div className="current-files-container">
        {uploadCurrentFiles?.length ? (
          <>
            {uploadCurrentFiles.map((file: any, index: any) => (
              <div className="document-container">
                <div className="document">
                  <p className="document-name">{file?.name}</p>

                  <div className="description-file-container">
                    <input
                      type="text"
                      id={descriptionList[index]}
                      onChange={(e) => handleDescription(index, e.target.value)}
                      placeholder="Descripción... "
                      maxLength={50}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => deleteOneFile(e, file.name)}
                    className="deleteOne"
                  ></button>

                  {!validDescription && (
                    <p className="request">
                      * Debe añadir una descripción del archivo *
                    </p>
                  )}
                </div>
              </div>
            ))}

            <button onClick={() => cancelUpload()} className="cancel">
              Cancelar
            </button>

            <button
              type="submit"
              onClick={(e) => handleSendData(e)}
              className="button-save"
            >
              Guardar
            </button>
          </>
        ) : (
          <span>{""}</span>
        )}
      </div>
      <button onClick={(e) => handleSendData(e)}>Enviar</button>
    </section>
  );
}

export default App;
