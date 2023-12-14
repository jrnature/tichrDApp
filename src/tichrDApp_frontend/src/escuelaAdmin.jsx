import * as React from "react"
import { createRoot } from "react-dom/client"
import {
    escuela as canister,
    createActor,
} from "../../declarations/escuela";

let actor = canister;

import { Input, Button } from "@chakra-ui/react";
//import styles from "../assets/app.module.css";
 
const escuelaAdmin = () => {
    const [escuelaSearch, setEscuelaSearch] = React.useState(null);
    const [escuelaBorrar, setEscuelaBorrar] = React.useState(null);

    const obtenerEscuela = () => {
        const inputIDs = ["idEscuela"];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [idEscuela] = inputs.map((input) => input.value);
        console.log(idEscuela)
        if (idEscuela === "") {
            alert("Inserte un Id");
        }
        canister.obtenerEscuela(idEscuela)
            .then((result) => {
                console.log(result);
                setEscuelaSearch(result);
            })
            .catch((err) => {
                console.log(err);
                alert("Escuela No Encontrada");
            });
    };

    const nuevaEscuela = () => {
        const inputIDs = [
            "crearEscuela_idEscuela",
            "crearEscuela_nombre",
            "crearEscuela_descripcion",
            "crearEscuela_direccion",
            "crearEscuela_nombreDirector",
            "crearEscuela_web"
        ];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [
            idEscuela,
            nombre,
            descripcion,
            direccion,
            nombreDirector,
            web
        ] = inputs.map((input) => input.value);
        console.log(
            idEscuela,
            nombre,
            descripcion,
            direccion,
            nombreDirector,
            web
        );
        if (inputs.some((input) => input.value === "")) {
            alert("Debe de registrar todos los campos");
            return;
        }
        canister.nuevaEscuela(idEscuela, {
            nombre: nombre,
            descripcion: descripcion,
            direccion: direccion,
            nombreDirector: nombreDirector,
            web: web
        })
            .then((result) => {
                alert("Escuela Registrada");
            })
            .catch((err) => {
                console.log(err);
                alert("Error en la creación del Usuario" + err)
            });
    };

    const actualizaEscuela = () => {
        const inputIDs = [
            "actualizaEscuela_idEscuela",
            "actualizaEscuela_nombre",
            "actualizaEscuela_descripcion",
            "actualizaEscuela_direccion",
            "actualizaEscuela_nombreDirector",
            "actualizaEscuela_web"
        ];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [
            idEscuela,
            nombre,
            descripcion,
            direccion,
            nombreDirector,
            web
        ] = inputs.map((input) => input.value);
        console.log(
            idEscuela,
            nombre,
            descripcion,
            direccion,
            nombreDirector,
            web
        );
        if (inputs.some((input) => input.value === "")) {
            alert("Debe de registrar todos los campos");
            return;
        }
        canister.actualizaEscuela(idEscuela, {
            nombre: nombre,
            descripcion: descripcion,
            direccion: direccion,
            nombreDirector: nombreDirector,
            web: web
        })
            .then((result) => {
                alert("La escuela con el identificador:"+idEscuela+" ha sido actualizada");
            })
            .catch((err) => {
                console.log(err);
                alert("Error en la actualización de la escuela con Identificador:" + idEscuela)
            });
    };


    const borrarEscuela = () => {
        const inputIDs = ["idEscuela_borrar"];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [idEscuela] = inputs.map((input) => input.value);
        console.log(idEscuela);
        if (idEscuela === "") {
            alert("Debe de introducir un ID de Usuario");
        }

        const confirmar = confirm("Está seguro de borrar el registro de la escuela?");
        if (!confirmar) {
            return;
        }
        canister.borraEscuela(idEscuela)
            .then(() => {
                alert("Escuela borrado");
            })
            .catch((err) => {
                console.log(err);
                alert("Error en el proceso de borrado de la Escuela")
            });

    };
    return (
        <div>
            <div>
                <h1>Buscar una Escuela</h1>
                <div>
                    {escuelaSearch && escuelaSearch.nombre ? (
                        <div>
                            <p>
                                Escuela:{" "} {`${escuelaSearch.nombre} -> ${escuelaSearch.descripcion}`}
                            </p>
                            <Button size="sm" onClick={() => setEscuelaSearch(null)}>Limpiar</Button>
                        </div>
                    ) : (
                        <div>
                            <Input size = "sm" id="idEscuela" type="text" placeholder="Introduce un identificador de escuela" />
                            <Button size = "sm" onClick={obtenerEscuela}>Buscar Usuario</Button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h1> Registrar una escuela nueva</h1>
                <div>
                    <Input size = "sm" id="crearEscuela_idEscuela" type="text" placeholder="Introduce un identificador de la Escuela" />
                    <Input size = "sm" id="crearEscuela_nombre" type="text" placeholder="Introduce el nombre de la Escuela" />
                    <Input size = "sm" id="crearEscuela_descripcion" type="text" placeholder="Introduce la descripción general de la Escuela" />
                    <Input size = "sm" id="crearEscuela_direccion" type="text" placeholder="Introduce la dirección de la Escuela" />
                    <Input size = "sm" id="crearEscuela_nombreDirector" type="text" placeholder="Introduce el nombre de la o el Director de la Escuela" />
                    <Input size = "sm" id="crearEscuela_web" type="text" placeholder="Introduce la dirección de la página web de la Escuela" />
                    <Button size = "sm" onClick={nuevaEscuela}>Registrar Escuela</Button>
                </div>
            </div>
            <div>
                <h1>Borrar una Escuela</h1>
                <div>
                    {escuelaBorrar && escuelaBorrar.nombre ? (
                        <div>
                            <p>
                               La escuela fue borrada
                            </p>
                            <Button size="sm" onClick={() => setEscuelaBorrar(null)}>Limpiar</Button>
                        </div>
                    ) : (
                        <div>
                            <Input size = "sm" id="idEscuela_borrar" type="text" placeholder="Introduce un identificador de escuela" />
                            <Button size = "sm" onClick={borrarEscuela}>Borrar escuela</Button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h1> Actualziar los datos de una escuela</h1>
                <div>
                    <Input size = "sm" id="actualizaEscuela_idEscuela" type="text" placeholder="Introduce un identificador de la Escuela a actualizar" />
                    <Input size = "sm" id="actualizaEscuela_nombre" type="text" placeholder="Introduce el nombre de la Escuela a actualizar" />
                    <Input size = "sm" id="actualizaEscuela_descripcion" type="text" placeholder="Introduce la descripción general de la Escuela a actualizar" />
                    <Input size = "sm" id="actualizaEscuela_direccion" type="text" placeholder="Introduce la dirección de la Escuela a actualizar" />
                    <Input size = "sm" id="actualizaEscuela_nombreDirector" type="text" placeholder="Introduce el nombre de la o el Director de la Escuela a actualizar" />
                    <Input size = "sm" id="actualizaEscuela_web" type="text" placeholder="Introduce la dirección de la página web de la Escuela a actualizar"/>
                    <Button size = "sm" onClick={actualizaEscuela}>Actualizar Escuela</Button>
                </div>
            </div>
        </div>
    );
};

export default escuelaAdmin; 