import { useEffect, useState, useRef } from "react";
// import IconUpload from "../../svg/IconUpload";
// import { BASEURL, PrivateRoutes, RoutesApi } from "../../models";
// import { useSelector } from "react-redux";
// import { AppStore } from "redux/store";
// import DocumentItem from "./DocumentItem/DocumentItem";

import "./DocumentsUploadComp.scss";
import React from "react";
// import ItemDocumentList from "./ItemDocumentList/ItemDocumentLIst";
// import { uploadDocuments } from "../../Pages/Private/services/uploadDocuments";
// import { getDocumentsByUser } from "../../Pages/Private/services/getDocumentsByUser";
// import { useFetchInterceptor } from "../../API/Interceptor";
// import { NameRoles } from "../../models/roles";

interface Document {
  name: string | null;
  ext: string | null;
  description: string | null;
}

function DocumentsUploadComp({ nameSite, user_id }: any) {
  const [descriptionList, setDescriptionList] = useState<any>();
  const [filesToSend, setFilesToSend] = useState<any>();

  const [allFilesUser, setAllFilesUser] = useState<Document[]>([]);
  const [uploadCurrentFiles, setUploadCurrentFiles] = useState<any>([]);
  const [deleteDescription, setDeleteDescription] = useState(false);

  const inputRef = useRef<any>();
  // const { interceptFetch } = useFetchInterceptor();

  /** EXTRAER EL TOKEN */
  // const userState = useSelector((store: AppStore) => store.user);
  // const token: any = userState.userToken;

  /** MANEJADOR DE ARCHIVOS SELECCIONADOS */

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

      // const filePrototype = Object.getPrototypeOf(file);
      // const fileP = Object.getPrototypeOf(file.lastModifiedDate);
      // console.log("Otro prot:", fileP);
      // console.log("Prototipo del archivo:", filePrototype);
      // const fileSingle = {
      //   lastModified: file.lastModified,
      //   lastModifiedDate: file.lastModifiedDate,
      //   name: file.name,
      //   size: file.size,
      //   type: file.type,
      //   webkitRelativePath: file.webkitRelativePath,
      // };

      // console.log(file);
      // console.log(fileSingle);

      // newFiles.push(fileSingle);
    });
    setFilesToSend(fileList);
    setUploadCurrentFiles(filesCurrent);

    setDescriptionList([]);
    setDeleteDescription(!deleteDescription);
    const newComments = filesArray.map(() => "");
    setDescriptionList(newComments);
  };

  /** ENVÍO DE ARCHIVOS CARGADOS */
  // const handleSendData = async (e: any) => {
  //   e.preventDefault();

  //   /** VALIDACIÓN DE CAMPOS VACÍOS EN EL FORMULARIO DE CARGA DE ARCHIVOS */
  //   const isValidValue = (currentValue: any) => currentValue !== "";
  //   const validateValue = descriptionList.every(isValidValue);

  //   /** VALIDA SI LA CANTIDAD DE ARCHIVOS ES IGUAL QUE LA CANTIDAD DE COMENTARIOS */
  //   if (filesToSend?.length === descriptionList.length && validateValue) {
  //     const formData = new FormData();

  //     filesToSend.forEach((file: any, index: any) => {
  //       console.log(file);

  //       formData.append("file[]", file);
  //       formData.append("comment", descriptionList[index]);
  //     });

  //     const ff: any = [];
  //     filesToSend.forEach((file: any, index: any) => {
  //       ff.push(file.data);
  //     });
  //     const list = {
  //       "file[]": filesToSend,
  //       comment: descriptionList,
  //     };

  //     const url = `${BASEURL}${RoutesApi.STUDENTSURL}${user_id}/document/`;

  //     console.log(formData);

  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${token}`,
  //         "access-control-allow-origin": "*",
  //       },
  //       body: JSON.stringify(list),
  //       intercept: false,
  //     };

  //     try {
  //       const response = await window.fetch(url, options);
  //       const data = await response.json();
  //       console.log(data);

  //       if (data?.message === "Archivos subidos exitosamente") {
  //         inputRef.current.value = null;
  //         setDescriptionList([]);
  //         setDeleteDescription(true);
  //         setUploadCurrentFiles([]);
  //         alert("Documentos guardados correctamente");
  //         getAllFiles();
  //       } else {
  //         alert("Error al guardar documentos");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     alert("faltan datos por cargar");
  //   }
  // };

  /** OBTIENE TODOS LOS ARCHIVOS GUARDADOS POR EL USUARIO */
  // const getAllFiles = async () => {
  //   const url = `${RoutesApi.STUDENTSURL}${user_id}/document/`;

  //   const dataFiles = await interceptFetch(url, { method: "GET" }, true);

  //   const newFiles: any = [];
  //   dataFiles.map((file: any) => {
  //     const name = file.name;
  //     const nameArray: string[] = name.split(".");

  //     const doc = {
  //       name: name,
  //       ext: nameArray[nameArray.length - 1],
  //       description: file.description,
  //       url: file.url_doc,
  //     };

  //     newFiles.push(doc);
  //   });
  //   setAllFilesUser(newFiles);
  // };

  /** CANCELA LA CARGA DE DOCUMENTOS DE MANERA GENERAL */

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
        <div className="current-files-container">
          {/* {uploadCurrentFiles?.length ? (
              <>
                {uploadCurrentFiles.map((file: any, index: any) => (
                  <DocumentItem
                    key={index}
                    index={index}
                    file={file}
                    deleteOneFile={deleteOneFile}
                    descriptionList={descriptionList}
                    setDescriptionList={setDescriptionList}
                    deleteDescription={deleteDescription}
                  />
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
            )} */}
        </div>
      </form>

      {/* <div
        className={`all-files-container ${
          nameSite === PrivateRoutes.PRE_REGISTRATION ? "" : "no-margin"
        }`}
      >
        {allFilesUser && allFilesUser.length > 0 ? (
          allFilesUser.map((file: any, i: number) => (
            <ItemDocumentList key={i} file={file} />
          ))
        ) : (
          <p className="no-documents">No tienes documentos guardados</p>
        )}
      </div> */}
    </section>
  );
}

export default DocumentsUploadComp;
