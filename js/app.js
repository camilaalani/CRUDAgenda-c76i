import Contacto from "./classContacto.js";

//const contacto = new Contacto(1, 'Juan', 'Pérez', 'juan.perez@email.com', '555-123-4567');

const modalAdminContacto = new bootstrap.Modal(document.getElementById("administrarContacto"));
const btnAgregarContacto = document.getElementById("btnNuevoContacto");
const formularioContacto = document.querySelector("form");
const nombre = document.getElementById("nombre"),
apellido = document.getElementById("apellido"),
telefono = document.getElementById("telefono"),
email = document.getElementById("email");

//funciones
const mostrarModal = ()=>{
    modalAdminContacto.show();
}

const crearContacto = (e) =>{
    e.preventDefault();
    console.log("aqui debo crear el contacto nuevo");
    //verificar que los datos sean validos

    //crearia el contacto
    const nuevoContacto = new Contacto(undefined, nombre.value, apellido.value, email.value, telefono.value);
    console.log(nuevoContacto);

    //resetear el formulario
}

//logica extra
btnAgregarContacto.addEventListener("click", mostrarModal);
formularioContacto.addEventListener("submit", crearContacto);