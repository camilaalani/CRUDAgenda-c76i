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
  //dibujar una fila
  crearFila(nuevoContacto, agenda.length);
  modalAdminContacto.hide();
  //mostrar un mensaje al usuario
  Swal.fire({
    title: "Contacto creado",
    text: `El contacto ${nuevoContacto.nombre} fue creado correctamente`,
    icon: "success",
  });
};

function limpiarFormulario() {
  formularioContacto.reset();
}

function guardarEnLocalStorage() {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
}

function crearFila(contacto, fila) {
  const tablaContactos = document.querySelector("tbody");
  tablaContactos.innerHTML += `<tr>
    <th scope="row">${fila}</th>
    <td>${contacto.nombre}</td>
    <td>${contacto.apellido}</td>
    <td>${contacto.email}</td>
    <td>${contacto.celular}</td>
    <td>
      <button class="btn btn-warning">Editar</button
      ><button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
    </td>
  </tr>`;
}

function cargaInicial() {
  if (agenda.length > 0) {
    agenda.map((itemcontacto, posicion) =>
      crearFila(itemcontacto, posicion + 1)
    );

    //const tablaContactos = document.querySelector("tbody");
    //for(let i=0; i < agenda.length; i++){
    // tablaContactos.innerHTML += `<tr>
    //<th scope="row">${i++}</th>
    //<td>${agenda[i].nombre}</td>
    //<td>${agenda[i].apellido}</td>
    //<td>${agenda[i].email}</td>
    // <td>${agenda[i].celular}</td>
    //<td>
    //  <button class="btn btn-warning">Editar</button
    // ><button class="btn btn-danger">Borrar</button>
    // </td>
    //</tr>`
    //  }
  }
  //agregar un cartel informativo para el usuario
}


window.borrarContacto = (idContacto)=>{
  console.log("desde la funcion borrar contacto");
  console.log(idContacto);
  //buscar en el array el objeto que tiene este idContacto array.findIndex
  const posicionContactoBuscado = agenda.findIndex((itemcontacto)=> itemcontacto.id === idContacto);
  console.log(posicionContactoBuscado)
  //borrar el objeto del array usando splice(posicion del objeto, cuantos borro)
  agenda.splice(posicionContactoBuscado, 1);
  //actualizar el localstorage
  guardarEnLocalStorage();
  //borrar una fila de la tabla
}

//logica extra
btnAgregarContacto.addEventListener("click", mostrarModal);
formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();
