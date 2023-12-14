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

  type metaEscuela = {
    nombre : Text;
    descripcion : Text;
    direccion : Text;
    nombreDirector : Text;
    web : Text;
    };

  type metaEscuelaInput = {
    nombre : Text;
    descripcion : Text;
    direccion : Text;
    nombreDirector : Text;
    web : Text;
  };
  

  let escuelas = Map.HashMap<Text, metaEscuela>(0, Text.equal, Text.hash);

  public func nuevaEscuela(idEscuela : Text, datos : metaEscuelaInput) : async () { 

    if (datos.nombre == "") {
      Debug.trap("Ingrese un nombre de la escuela");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripción general de la escuela");
    };
    if (datos.direccion == "") {
      Debug.trap("Ingrese la direccion de la escuela");
    };
    if (datos.nombreDirector == "") {
      Debug.trap("Ingrese el nombre de la o el director de la escuela");
    };
    if (datos.web == "") {
      Debug.trap("Ingrese la dirección de la página web de la escuela");
    };
    
    escuelas.put(idEscuela, 
      {
        nombre= datos.nombre;
        descripcion = datos.descripcion;
        direccion = datos.direccion;
        nombreDirector = datos.nombreDirector;
        web = datos.web;
      } 
    );

    Debug.print("Escuela agregada");
  };

  public query func obtenerEscuela(idEscuela : Text) : async metaEscuela  {
    let escuelaResp = escuelas.get(idEscuela);
    var aux = switch (escuelaResp) {
      case (null) {
        {
          nombre= "";
        descripcion = "";
        direccion = "";
        nombreDirector = "";
        web = "";
        };
      };
      case (?escuelaResp) escuelaResp;
    };
    return {
      nombre= aux.nombre;
        descripcion = aux.descripcion;
        direccion = aux.direccion;
        nombreDirector = aux.nombreDirector;
        web = aux.web;
    };
  };

  public func actualizaEscuela(idEscuela : Text, datos : metaEscuelaInput) : async () {
    if (datos.nombre == "") {
      Debug.trap("Ingrese un nombre de la escuela");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripción general de la escuela");
    };
    if (datos.direccion == "") {
      Debug.trap("Ingrese la direccion de la escuela");
    };
    if (datos.nombreDirector == "") {
      Debug.trap("Ingrese el nombre de la o el director de la escuela");
    };
    if (datos.web == "") {
      Debug.trap("Ingrese la dirección de la página web de la escuela");
    };

    if (escuelas.replace(idEscuela, datos) == null) {
      Debug.trap("Escuela no encontrada");
    };
  };

  public func borraEscuela(idEscuela : Text) : async () {
    if (escuelas.remove(idEscuela) == null) {
      Debug.trap("Escuela no encontrada");
    };
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};