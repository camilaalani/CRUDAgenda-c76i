import Contacto from "./classContacto.js";
import { validarCantidadCaracteres, validarEmail } from "./validaciones.js";
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
  limpiarFormulario();
  modalAdminContacto.show();
};

const crearContacto = (e) => {
  e.preventDefault();
  console.log("aqui debo crear el contacto nuevo");
  //verificar que los datos sean validos
  //if(true)
  if (validarCantidadCaracteres(nombre.value, 2, 20) && validarCantidadCaracteres(apellido.value, 2, 20) && validarEmail(email.value)) {
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
  }else{
    alert("Hay errores en el formulario")
  }
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
    <button class="btn btn-primary" onclick="verDetalleContacto('${contacto.id}')">Ver detalle</button>
      <button class="btn btn-warning me-1">Editar</button
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

window.borrarContacto = (idContacto) => {
  Swal.fire({
    title: "¿Estas seguro que quieres borrar?",
    text: "No puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //aqui agrego mi logica
      console.log("desde la funcion borrar contacto");
      console.log(idContacto);
      //buscar en el array el objeto que tiene este idContacto array.findIndex
      const posicionContactoBuscado = agenda.findIndex(
        (itemcontacto) => itemcontacto.id === idContacto
      );
      console.log(posicionContactoBuscado);
      //borrar el objeto del array usando splice(posicion del objeto, cuantos borro)
      agenda.splice(posicionContactoBuscado, 1);
      //actualizar el localstorage
      guardarEnLocalStorage();
      //borrar una fila de la tabla
      const tablaContactos = document.querySelector("tbody");
      console.log(tablaContactos.children[posicionContactoBuscado]); //objeto.propiedad[posicionarray]
      tablaContactos.removeChild(
        tablaContactos.children[posicionContactoBuscado]
      );
      Swal.fire({
        title: "Contacto eliminado",
        text: "El contacto fue eliminado exitosamente",
        icon: "success",
      });
    }
  });
};

window.verDetalleContacto = (idContacto) => {
  console.log(window.location);
  window.location.href =
    window.location.origin + "/pages/detalleContacto.html?id=" + idContacto;
};

//logica extra
btnAgregarContacto.addEventListener("click", mostrarModal);
formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();
