const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
document.addEventListener("DOMContentLoaded", getTodos);

// FUNKCJA DODAJĄCA NOWE TODO

function addTodo(event) {
  event.preventDefault();
  // TWORZYMY TODODIV I DODAJEMY DO DOM
  if (todoInput.value !== "") {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // TWORZYMY TODO LI I PRZYPISUJEMY GO DO DIV'A TODODIV
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);
    //
    saveLocalTodos(todoInput.value);
    // DODAJEMY PRZYCISK USUNIĘCIA DO <LI> Z TODO
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // DODAJEMY TODODIV DO UL TODOLIST
    todoList.appendChild(todoDiv);
    // CZYŚCIMY TEKST WPISANY DO ELEMENTU INPUT
    todoInput.value = "";
  }
}

// FUNCKAJ USUWAJĄCA TODO
function deleteCheck(event) {
  const item = event.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("delete");
    todo.addEventListener("transitionend", () => todo.remove());
    removeLocalTodos(todo);
    // todo.remove();
  }
}
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
