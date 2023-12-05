import Contacto from "./classContacto.js";
//Create - Read - Update - Delete contactos

//const contacto = new Contacto(1, 'Juan', 'Pérez', 'juan.perez@email.com', '555-123-4567');

const modalAdminContacto = new bootstrap.Modal(
  document.getElementById("administrarContacto")
);
const btnAgregarContacto = document.getElementById("btnNuevoContacto");
const formularioContacto = document.querySelector("form");
const nombre = document.getElementById("nombre"),
  apellido = document.getElementById("apellido"),
  telefono = document.getElementById("telefono"),
  email = document.getElementById("email");
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

//funciones
const mostrarModal = () => {
  modalAdminContacto.show();
};

const crearContacto = (e) => {
  e.preventDefault();
  console.log("aqui debo crear el contacto nuevo");
  //verificar que los datos sean validos

  //crearia el contacto
  const nuevoContacto = new Contacto(
    undefined,
    nombre.value,
    apellido.value,
    email.value,
    telefono.value
  );
  console.log(nuevoContacto);
  //agrego el contacto nuevo al array
  agenda.push(nuevoContacto);
  console.log(agenda);
  //resetear el formulario
  limpiarFormulario();
  //guardar el array en localstorage
  guardarEnLocalStorage();
};

function limpiarFormulario() {
  formularioContacto.reset();
}

function guardarEnLocalStorage(){
    localStorage.setItem("agendaKey", JSON.stringify(agenda))
}

function crearFila(contacto, fila){
    const tablaContactos = document.querySelector("tbody");
    tablaContactos.innerHTML += `<tr>
    <th scope="row">${fila}</th>
    <td>${contacto.nombre}</td>
    <td>${contacto.apellido}</td>
    <td>${contacto.email}</td>
    <td>${contacto.celular}</td>
    <td>
      <button class="btn btn-warning">Editar</button
      ><button class="btn btn-danger">Borrar</button>
    </td>
  </tr>`
}

function cargaInicial(){
    if(agenda.length > 0){
        agenda.map((contacto, posicion)=> crearFila(contacto, posicion + 1))
    }
}

//logica extra
btnAgregarContacto.addEventListener("click", mostrarModal);
formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();