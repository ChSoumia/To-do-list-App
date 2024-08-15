const fecha = document.getElementById("fecha");
const input = document.getElementById("input");
const btnEnter = document.getElementById("enter");
const lista = document.getElementById("lista");

const check = "fa-circle-check";
const uncheck = "fa-circle";
const lineThrough = "line-through";

let id;
let LIST;

//creación de fecha actualizada
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-ES", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});
// función de Tarea Realizada
function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  const text = element.parentNode.querySelector(".text");
  text.classList.toggle(lineThrough);

  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

// función de Tarea Eliminada
function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].eliminado = true;
}

// función de carga inicial de tareas

// función de agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }
  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";
  const elemento = `
            <li id="elemento"><i class="fa-regular ${REALIZADO}" data="realizado" id=${id}></i>
            <p class="text ${LINE}">${tarea}</p>
            <i class="fa-solid fa-trash" data="eliminado" id=${id}></i></li>`;

  lista.insertAdjacentHTML("beforeend", elemento);
}

btnEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);

    LIST.push({
      nombre: tarea,
      id,
      realizado: false,
      eliminado: false,
    });
  }

  //Agregar
  localStorage.setItem("TODO", JSON.stringify(LIST));

  input.value = "";
  id++;
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);

      LIST.push({
        nombre: tarea,
        id,
        realizado: false,
        eliminado: false,
      });
    }

    //Agregar
    localStorage.setItem("TODO", JSON.stringify(LIST));

    input.value = "";
    id++;
  }
});

lista.addEventListener("click", (event) => {
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData === "realizado") {
    tareaRealizada(element);
  } else {
    if (elementData === "eliminado") {
      tareaEliminada(element);
    }
  }
  //Agregar
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

//Obtener
let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}
//Recuperación de tareas guardadas

function cargarLista(DATA) {
  DATA.forEach((i) => {
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}
