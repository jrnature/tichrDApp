import * as React from "react"
import { createRoot } from "react-dom/client"
import {
    materia as canister,
    createActor,
} from "../../declarations/video";

let actor = canister;

import { Input, Button } from "@chakra-ui/react";
//import styles from "../assets/app.module.css";
 
const videoAdmin = () => {
    const [videoSearch, setvideoSearch] = React.useState(null);
    const [videoBorrar, setvideoBorrar] = React.useState(null);

    const obtenerVideo = () => {
        const inputIDs = ["idVideo"];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [idVideo] = inputs.map((input) => input.value);
        console.log(idVideo)
        if (idVideo === "") {
            alert("Inserte un Id");
        }
        canister.obtenerMateria(idVideo)
            .then((result) => {
                console.log(result);
                setvideoSearch(result);
            })
            .catch((err) => {
                console.log(err);
                alert("Video No Encontrada");
            });
    };

    const nuevoVideo = () => {
        const inputIDs = [
            "crearVideo_idVideo",
            "crearVideo_nombre",
            "crearVideo_descripcion",
            "crearVideo_autor",
            "crearVideo_fecha",
            "crearVideo_idMateria"
        ];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [
            idVideo,
            nombre,
            descripcion,
            autor,
            fecha,
            idMateria,
        ] = inputs.map((input) => input.value);
        console.log(
            idVideo,
            nombre,
            descripcion,
            autor,
            fecha,
            idMateria,
        );
        if (inputs.some((input) => input.value === "")) {
            alert("Debe de registrar todos los campos");
            return;
        }
        canister.nuevoVideo(idVideo, {
            nombre: nombre,
            descripcion: descripcion,
            autor: autor,
            fecha: fecha,
            idMateria: idMateria 
        })
            .then((result) => {
                alert("Video Registrado");
            })
            .catch((err) => {
                console.log(err);
                alert("Error en la creación del video" + err)
            });
    };

    const actualizaVideo = () => {
        const inputIDs = [
            "actualizaVideo_idVideo",
            "actualizaVideo_nombre",
            "actualizaVideo_descripcion",
            "actualizaVideo_autor",
            "actualizaVideo_fecha",
            "actualizaVideo_idMateria"
        ];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [
            idVideo,
            nombre,
            descripcion,
            autor,
            fecha,
            idMateria
        ] = inputs.map((input) => input.value);
        console.log(
            idVideo,
            nombre,
            descripcion,
            autor,
            fecha,
            idMateria
        );
        if (inputs.some((input) => input.value === "")) {
            alert("Debe de registrar todos los campos");
            return;
        }
        canister.actualizaVideo(idVideo, {
            nombre: nombre,
            descripcion: descripcion,
            autor: autor,
            fecha: fecha,
            idMateria: idMateria
        })
            .then((result) => {
                alert("El video con el identificador:"+idVideo+" ha sido actualizada");
            })
            .catch((err) => {
                console.log(err);
                alert("Error en la actualización del video con Identificador:" + idVideo)
            });
    };


    const borrarVideo = () => {
        const inputIDs = ["idVideo_borrar"];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [idVideo_borrar] = inputs.map((input) => input.value);
        console.log(idVideo_borrar);
        if (idVideo_borrar === "") {
            alert("Debe de introducir un ID de Video correcto");
        }

        const confirmar = confirm("Está seguro de borrar el registro de video?");
        if (!confirmar) {
            return;
        }
        canister.borraVideo(idMateria_borrar)
            .then(() => {
                alert("El video ha sido borrado");
            })
            .catch((err) => {
                console.log(err);
                alert("Error en el proceso de borrado del Video")
            });
    };
    return (
        <div>
            <div>
                <h1>Buscar un Video</h1>
                <div>
                    {videoSearch && videoSearch.nombre ? (
                        <div>
                            <p>
                                Materia:{" "} {`${videoSearch.nombre} -> ${videoSearch.descripcion}`}
                            </p>
                            <Button size="sm" onClick={() => setvideoSearch(null)}>Limpiar</Button>
                        </div>
                    ) : (
                        <div>
                            <Input size = "sm" id="idVideo" type="text" placeholder="Introduce un identificador de video" />
                            <Button size = "sm" onClick={obtenerVideo}>Buscar Video</Button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h1> Registrar un nuevo video</h1>
                <div>
                    <Input size = "sm" id="crearVideo_idVideo" type="text" placeholder="Introduce un identificador de Video" />
                    <Input size = "sm" id="crearVideo_nombre" type="text" placeholder="Introduce el nombre del Video" />
                    <Input size = "sm" id="crearVideo_descripcion" type="text" placeholder="Introduce la descripción general del Video" />
                    <Input size = "sm" id="crearVideo_autor" type="text" placeholder="Introduce el nombre del autor del video" />
                    <Input size = "sm" id="crearVideo_fecha" type="text" placeholder="Introduce la fecha de creación del video" />
                    <Input size = "sm" id="crearVideo_idMateria" type="text" placeholder="Introduce el id de la Materia" />
                    <Button size = "sm" onClick={nuevoVideo}>Registrar Video</Button>
                </div>
            </div>
            <div>
                <h1>Borrar un Video</h1>
                <div>
                    {videoBorrar && videoBorrar.nombre ? (
                        <div>
                            <p>
                               El Video fue borrado
                            </p>
                            <Button size="sm" onClick={() => setvideoBorrar(null)}>Limpiar</Button>
                        </div>
                    ) : (
                        <div>
                            <Input size = "sm" id="idVideo_borrar" type="text" placeholder="Introduce un identificador de video" />
                            <Button size = "sm" onClick={borrarVideo}>Borrar video</Button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h1> Actualziar los datos de un video</h1>
                <div>
                    <Input size = "sm" id="actualizaVideo_idVideo" type="text" placeholder="Introduce un identificador de video" />
                    <Input size = "sm" id="actualizaVideo_nombre" type="text" placeholder="Introduce el nombre del video" />
                    <Input size = "sm" id="actualizaVideo_descripcion" type="text" placeholder="Introduce la descripción general del video" />
                    <Input size = "sm" id="actualizaVideo_autor" type="text" placeholder="Introduce el nombre del autor del video" />
                    <Input size = "sm" id="actualizaVideo_fecha" type="text" placeholder="Introduce la fecha de creación del video" />
                    <Input size = "sm" id="actualizaVideo_idMateria" type="text" placeholder="Introduce el id de la Materia" />
                    <Button size = "sm" onClick={actualizaVideo}>Actualizar video</Button>
                </div>
            </div>
        </div>
    );
};

export default videoAdmin; 