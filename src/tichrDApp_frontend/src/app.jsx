import * as React from "react";
import { Button } from "@chakra-ui/react";
import EscuelaAdmin from "./escuelaAdmin.jsx";
import MateriaAdmin from "./materiaAdmin.jsx";

const App = () => {
    const [usuarioSearch, setUsuarioSearch] = React.useState(0);
    return (
        <>
            {usuarioSearch === 1 ? (
                <h1>
                    <EscuelaAdmin />
                </h1>
            ) : (
                <Button colorScheme='blue' onClick={() => setUsuarioSearch(1)}>Registro de Escuelas</Button>
            )}
            {usuarioSearch === 2 ? (
                <h1>
                    <MateriaAdmin />
                </h1>
            ) : (
                <Button colorScheme='red' onClick={() => setUsuarioSearch(2)}>Registro de Materias</Button>
            )}

        </>
    )
};

export default App; 