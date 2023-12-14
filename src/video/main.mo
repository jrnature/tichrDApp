import Map "mo:base/HashMap";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";
import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Nat16 "mo:base/Nat16";
import Hash "mo:base/Hash";
import Blob "mo:base/Blob";

actor {

  type metaVideo = {
    nombre : Text;
    descripcion : Text;
    fecha : Text;
    autor : Text;
    vide : Blob;
    idMateria : Text;
    };

  type metaVideoInput = {
    nombre : Text;
    descripcion : Text;
    fecha : Text;
    autor : Text;
    vide : Blob;
    idMateria : Text;
  };
  

  let videos = Map.HashMap<Text, metaVideo>(0, Text.equal, Text.hash);

  public func newUsuario(idVideo : Text, datos : metaVideoInput) : async () { 

    if (datos.nombre == "") {
      Debug.trap("Ingrese un nombre del video");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripción general del video");
    };
    if (datos.fecha == "") {
      Debug.trap("Ingrese la fecha de grabación del video");
    };
    if (datos.autor == "") {
      Debug.trap("Ingrese el nombre de la o el autor del video");
    };
    if (datos.idMateria == "") {
      Debug.trap("Ingrese el identificador de la materia a la cual pertenece el video");
    };
    
    videos.put(idVideo, 
      {
        nombre = datos.nombre;
        descripcion =datos.descripcion;
        fecha = datos.fecha;
        autor = datos.autor;
        vide = datos.vide;
        idMateria =datos.idMateria;
      } 
    );

    Debug.print("Video agregado");
  };

  public query func obtenerVideo(idVideo : Text) : async metaVideo  {
    let videoResp = videos.get(idVideo);
    var aux = switch (videoResp) {
      case (null) {
        {
          nombre = "";
          descripcion ="";
          fecha = "";
          autor = "";
          vide = "" : Blob;
          idMateria ="";
        };
      };
      case (?videoResp) videoResp;
    };
    return {
        nombre= aux.nombre;
        descripcion = aux.descripcion;
        fecha = aux.fecha;
        autor = aux.autor;
        vide = aux.vide;
        idMateria = aux.idMateria;
    };
  };

  public func actualizaVideo(idVideo : Text, datos : metaVideoInput) : async () {
    if (datos.nombre == "") {
      Debug.trap("Ingrese un nombre del video");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripción general del video");
    };
    if (datos.fecha == "") {
      Debug.trap("Ingrese la fecha de grabación del video");
    };
    if (datos.autor == "") {
      Debug.trap("Ingrese el nombre de la o el autor del video");
    };
    if (datos.idMateria == "") {
      Debug.trap("Ingrese el identificador de la materia a la cual pertenece el video");
    };

    if (videos.replace(idVideo, datos) == null) {
      Debug.trap("Video no encontrado");
    };
  };

  public func borraVideo(idVideo : Text) : async () {
    if (videos.remove(idVideo) == null) {
      Debug.trap("Video no encontrado");
    };
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};