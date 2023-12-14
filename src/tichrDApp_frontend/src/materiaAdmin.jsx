import * as React from "react"
import { createRoot } from "react-dom/client"
import {
    materia as canister,
    createActor,
} from "../../declarations/materia";

let actor = canister;

import { Input, Button } from "@chakra-ui/react";
//import styles from "../assets/app.module.css";
 
const materiaAdmin = () => {
    const [materiaSearch, setMateriaSearch] = React.useState(null);
    const [materiaBorrar, setMateriaBorrar] = React.useState(null);

    const obtenerMateria = () => {
        const inputIDs = ["idMateria"];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [idMateria] = inputs.map((input) => input.value);
        console.log(idMateria)
        if (idMateria === "") {
            alert("Inserte un Id");
        }
        canister.obtenerMateria(idMateria)
            .then((result) => {
                console.log(result);
                setMateriaSearch(result);
            })
            .catch((err) => {
                console.log(err);
                alert("Materia No Encontrada");
            });
    };

    const nuevaMateria = () => {
        const inputIDs = [
            "crearMateria_idMateria",
            "crearMateria_nombre",
            "crearMateria_descripcion",
            "crearMateria_nivel",
            "crearMateria_idEscuela"
        ];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [
            idMateria,
            nombre,
            descripcion,
            nivel,
            idEscuela
        ] = inputs.map((input) => input.value);
        console.log(
            idMateria,
            nombre,
            descripcion,
            nivel,
            idEscuela
        );
        if (inputs.some((input) => input.value === "")) {
            alert("Debe de registrar todos los campos");
            return;
        }
        canister.nuevaMateria(idMateria, {
            nombre: nombre,
            descripcion: descripcion,
            nivel: nivel,
            idEscuela: idEscuela
        })
            .then((result) => {
                alert("Materia Registrada");
            })
            .catch((err) => {
                console.log(err);
                alert("Error en la creación de la Materia" + err)
            });
    };

    const actualizaMateria = () => {
        const inputIDs = [
            "actualizaMateria_idMateria",
            "actualizaMateria_nombre",
            "actualizaMateria_descripcion",
            "actualizaMateria_nivel",
            "actualizaMateria_idEscuela"
        ];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [
            idMateria,
            nombre,
            descripcion,
            nivel,
            idEscuela
        ] = inputs.map((input) => input.value);
        console.log(
            idMateria,
            nombre,
            descripcion,
            nivel,
            idEscuela
        );
        if (inputs.some((input) => input.value === "")) {
            alert("Debe de registrar todos los campos");
            return;
        }
        canister.actualizaMateria(idMateria, {
            nombre: nombre,
            descripcion: descripcion,
            nivel: nivel,
            idEscuela: idEscuela
        })
            .then((result) => {
                alert("La Materia con el identificador:"+idMateria+" ha sido actualizada");
            })
            .catch((err) => {
                console.log(err);
                alert("Error en la actualización de la materia con Identificador:" + idMateria)
            });
    };


    const borrarMateria = () => {
        const inputIDs = ["idMateria_borrar"];
        const inputs = inputIDs.map((id) => document.getElementById(id));
        const [idMateria_borrar] = inputs.map((input) => input.value);
        console.log(idMateria_borrar);
        if (idMateria_borrar === "") {
            alert("Debe de introducir un ID de Materia correcto");
        }

        const confirmar = confirm("Está seguro de borrar el registro de la materia?");
        if (!confirmar) {
            return;
        }
        canister.borraMateria(idMateria_borrar)
            .then(() => {
                alert("La materia ha sido borrada");
            })
            .catch((err) => {
                console.log(err);
                alert("Error en el proceso de borrado de la Materia")
            });
    };
    return (
        <div>
            <div>
                <h1>Buscar una materia</h1>
                <div>
                    {materiaSearch && materiaSearch.nombre ? (
                        <div>
                            <p>
                                Materia:{" "} {`${materiaSearch.nombre} -> ${materiaSearch.descripcion}`}
                            </p>
                            <Button size="sm" onClick={() => setMateriaSearch(null)}>Limpiar</Button>
                        </div>
                    ) : (
                        <div>
                            <Input size = "sm" id="idMateria" type="text" placeholder="Introduce un identificador de materia" />
                            <Button size = "sm" onClick={obtenerMateria}>Buscar Materia</Button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h1> Registrar una materia nueva</h1>
                <div>
                    <Input size = "sm" id="crearMateria_idMateria" type="text" placeholder="Introduce un identificador de la Materia" />
                    <Input size = "sm" id="crearMateria_nombre" type="text" placeholder="Introduce el nombre de la Materia" />
                    <Input size = "sm" id="crearMateria_descripcion" type="text" placeholder="Introduce la descripción general de la Materia" />
                    <Input size = "sm" id="crearMateria_nivel" type="text" placeholder="Introduce el nivel donde se imparte la materia" />
                    <Input size = "sm" id="crearMateria_idEscuela" type="text" placeholder="Introduce el id de la Escuela" />
                    <Button size = "sm" onClick={nuevaMateria}>Registrar Materia</Button>
                </div>
            </div>
            <div>
                <h1>Borrar una materia</h1>
                <div>
                    {materiaBorrar && materiaBorrar.nombre ? (
                        <div>
                            <p>
                               La materia fue borrada
                            </p>
                            <Button size="sm" onClick={() => setMateriaBorrar(null)}>Limpiar</Button>
                        </div>
                    ) : (
                        <div>
                            <Input size = "sm" id="idMateria_borrar" type="text" placeholder="Introduce un identificador de escuela" />
                            <Button size = "sm" onClick={borrarMateria}>Borrar materia</Button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h1> Actualziar los datos de una materia</h1>
                <div>
                    <Input size = "sm" id="actualizaMateria_idMateria" type="text" placeholder="Introduce un identificador de la Materia" />
                    <Input size = "sm" id="actualizaMateria_nombre" type="text" placeholder="Introduce el nombre de la Materia" />
                    <Input size = "sm" id="actualizaMateria_descripcion" type="text" placeholder="Introduce la descripción general de la Materia" />
                    <Input size = "sm" id="actualizaMateria_nivel" type="text" placeholder="Introduce el nivel donde se imparte la materia" />
                    <Input size = "sm" id="actualizaMateria_idEscuela" type="text" placeholder="Introduce el id de la Escuela" />
                    <Button size = "sm" onClick={actualizaMateria}>Actualizar materia</Button>
                </div>
            </div>
        </div>
    );
};

export default materiaAdmin; 