/*  Flujo Principal de la Aplicacion*/
// import './request.js'

const LS_DESEA_GUARDAR_DATOS = "desGuarDat";
const LS_QUIERE_RECIBIR_EMAIL = "quiereRecibirEmail";
const LS_NAME = "name";
const LS_EMAIL = "email";
const TOKEN = "GRUPOA2020"

let name;
let email;
let recibirEmail;

obtenerPortada();

// Verifica si el usuario tiene datos guardados y su respuesta
let desGuardarDatos = localStorage.getItem(LS_DESEA_GUARDAR_DATOS);

if (desGuardarDatos == null) {

    if (confirm("Desea Ingresar su Nombre y email?")) {

        guardarDatos()

    } else {

        localStorage.setItem(LS_DESEA_GUARDAR_DATOS, false)
        desGuardarDatos = false
        eliminarDatos()

    }

} else if (desGuardarDatos) {
    recuperarDatos()
}


// Funcion Guardar Datos
function guardarDatos() {

    if (pedirDatos()) {

        localStorage.setItem(LS_NAME, name)
        localStorage.setItem(LS_EMAIL, email)
        localStorage.setItem(LS_DESEA_GUARDAR_DATOS, true)

        if (confirm("Podemos enviarte novedades al email?")) {
            localStorage.setItem(LS_QUIERE_RECIBIR_EMAIL, true);
            recibirEmail = true
        } else {
            localStorage.setItem(LS_QUIERE_RECIBIR_EMAIL, false);
            recibirEmail = false
        }

        // Envia datos del usuario al servidor si es que quiere guardarlos
        enviarDatosServer(name, email, recibirEmail, TOKEN)

    } else {

        console.log("Ha cancelado el ingreso de datos")
        eliminarDatos()
        localStorage.setItem(LS_DESEA_GUARDAR_DATOS, false)
    }

}


// Funcion pedir datos
function pedirDatos() {

    let resp = false
    let entrada = false

    // Pide Nombre
    do {
        name = prompt("Ingrese su nombre: ");

        if (!name || name.trim() !== "") {
            entrada = true
        };

    } while (entrada === false);

    entrada = false;
    //Pide Email
    do {
        email = prompt("Ingrese su Email:");

        if (!email || validarEmail(email)) {
            entrada = true
        }

    } while (entrada === false);

    (!name || !email) ? resp = false : resp = true

    return resp
}


// Funcion Recuperar Datos LS
function recuperarDatos() {
    name = localStorage.getItem(LS_NAME)
    email = localStorage.getItem(LS_EMAIL)
}

// Funcion Eliminar datos LS
function eliminarDatos() {
    localStorage.removeItem(LS_NAME)
    localStorage.removeItem(LS_EMAIL)
}

// Funcion validar email
function validarEmail(email) {

    let resul = false

    if (/^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/.test(email)) {
        resul = true
    }

    return resul
}
