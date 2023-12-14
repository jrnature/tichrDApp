import Map "mo:base/HashMap";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";
import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Nat16 "mo:base/Nat16";
import Hash "mo:base/Hash";

actor {

  type metaMateria = {
    nombre : Text;
    descripcion : Text;
    nivel : Text;
    idEscuela : Text;
    };

  type metaMateriaInput = {
    nombre : Text;
    descripcion : Text;
    nivel : Text;
    idEscuela : Text;
  };
  

  let materias = Map.HashMap<Text, metaMateria>(0, Text.equal, Text.hash);

  public func nuevaMateria(idMateria : Text, datos : metaMateriaInput) : async () { 

    if (datos.nombre == "") {
      Debug.trap("Ingrese un nombre de materia");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripción general de la materia");
    };
    if (datos.nivel == "") {
      Debug.trap("Ingrese el nivel educativo de la materia");
    };
    if (datos.idEscuela == "") {
      Debug.trap("Ingrese identificador de la escuela");
    };
    
    materias.put(idMateria, 
      {
        nombre= datos.nombre;
        descripcion = datos.descripcion;
        nivel = datos.nivel;
        idEscuela = datos.idEscuela;
      } 
    );

    Debug.print("Materia agregada");
  };

  public query func obtenerMateria(idMateria : Text) : async metaMateria  {
    let materiaResp = materias.get(idMateria);
    var aux = switch (materiaResp) {
      case (null) {
        {
          nombre= "";
          descripcion = "";
          nivel = "";
          idEscuela = "";
        };
      };
      case (?materiaResp) materiaResp;
    };
    return {
      nombre= aux.nombre;
        descripcion = aux.descripcion;
        nivel = aux.nivel;
        idEscuela = aux.idEscuela;
    };
  };

  public func actualizaMateria(idMateria : Text, datos : metaMateriaInput) : async () {
    if (datos.nombre == "") {
      Debug.trap("Ingrese un nombre de materia");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripción general de la materia");
    };
    if (datos.nivel == "") {
      Debug.trap("Ingrese el nivel educativo de la materia");
    };
    if (datos.idEscuela == "") {
      Debug.trap("Ingrese identificador de la escuela");
    };

    if (materias.replace(idMateria, datos) == null) {
      Debug.trap("Materia no encontrada");
    };
  };

  public func borraMateria(idMateria : Text) : async () {
    if (materias.remove(idMateria) == null) {
      Debug.trap("Materia no encontrada");
    };
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};