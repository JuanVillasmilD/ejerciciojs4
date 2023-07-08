// Arreglo para almacenar las listas de tareas
var lists = [];

// Variable para controlar el modo oscuro
var darkMode = false;

// Función para crear una nueva lista
function addList() {
  var listInput = document.getElementById('listInput');

  if (listInput.value !== '') {
    var newList = {
      name: listInput.value,
      tasks: []
    };

    lists.push(newList);
    renderLists();
    listInput.value = '';
  }
}

// Función para agregar una tarea a una lista
function addTask(index) {
  var taskInput = document.getElementById('taskInput-' + index);

  if (taskInput.value !== '') {
    lists[index].tasks.push({ name: taskInput.value, completed: false });
    renderLists();
    taskInput.value = '';
  }
}

// Función para editar el nombre de la lista
function editListName(index) {
  var newName = prompt('Ingrese el nuevo nombre de la lista', lists[index].name);
  if (newName !== null) {
    lists[index].name = newName;
    renderLists();
  }
}

// Función para editar una tarea
function editTask(listIndex, taskIndex) {
  var newTask = prompt('Ingrese la nueva tarea', lists[listIndex].tasks[taskIndex].name);
  if (newTask !== null) {
    lists[listIndex].tasks[taskIndex].name = newTask;
    renderLists();
  }
}

// Función para eliminar una tarea de una lista
function deleteTask(listIndex, taskIndex) {
  lists[listIndex].tasks.splice(taskIndex, 1);
  renderLists();
}

// Función para marcar o desmarcar una tarea como completada
function toggleCompleted(listIndex, taskIndex) {
  lists[listIndex].tasks[taskIndex].completed = !lists[listIndex].tasks[taskIndex].completed;
  renderLists();
}

// Función para eliminar una lista
function deleteList(index) {
  var confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta lista?');

  if (confirmDelete) {
    lists.splice(index, 1);
    renderLists();
  }
}

// Función para cambiar al modo oscuro
function toggleDarkMode() {
  darkMode = !darkMode;
  var body = document.body;
  var darkModeButton = document.getElementById('darkModeButton');
  var darkModeIcon = document.getElementById('darkModeIcon');

  if (darkMode) {
    body.classList.add('dark-mode');
    darkModeButton.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.remove('dark-mode');
    darkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Función para renderizar las listas de tareas en el documento
function renderLists() {
  var listContainer = document.getElementById('listContainer');
  listContainer.innerHTML = '';

  for (var i = 0; i < lists.length; i++) {
    var list = lists[i];
    var listName = list.name;

    var listTasksHTML = '';
    for (var j = 0; j < list.tasks.length; j++) {
      var task = list.tasks[j];
      var taskName = task.name;
      if (task.completed) {
        taskName = '<span class="completed">' + taskName + '</span>';
      }
      listTasksHTML += '<li>' +
        '<input type="checkbox" onclick="toggleCompleted(' + i + ', ' + j + ')"' + (task.completed ? ' checked' : '') + '> ' +
        taskName +
        ' <i class="fas fa-pencil-alt edit-icon" style="color: yellow;" onclick="editTask(' + i + ', ' + j + ')"></i> ' +
        '<i class="fas fa-times delete-icon" style="color: red;" onclick="deleteTask(' + i + ', ' + j + ')"></i></li>';
    }

    var listHTML = '<div class="list-container">' +
      '<h2>' + listName +
      ' <button onclick="editListName(' + i + ')">Editar</button>' +
      ' <button onclick="deleteList(' + i + ')">Eliminar</button></h2>' +
      '<input type="text" id="taskInput-' + i + '" placeholder="Agregar tarea" onkeydown="handleTaskInput(event, ' + i + ')">' +
      '<button onclick="addTask(' + i + ')">Agregar</button>' +
      '<ul>' + listTasksHTML + '</ul>' +
      '</div>';

    listContainer.innerHTML += listHTML;
  }
}

// Función para manejar el evento keydown del input de lista
function handleListInput(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar que se realice un salto de línea en el input
    addList();
  }
}

// Función para manejar el evento keydown del input de tarea
function handleTaskInput(event, index) {
  if (event.keyCode === 13) {
    addTask(index);
  }
}
