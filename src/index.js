/* eslint-disable no-unused-expressions */
const projectsContainer = document.querySelector('[data-projects]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input]');
const deleteProjectButton = document.querySelector('[data-delete-project-button]');
const projectDisplayContainer = document.querySelector('[data-project-display-container]');
const projectTitleElement = document.querySelector('[data-project-title]');
const projectCountElement = document.querySelector('[data-project-count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');

const newTaskDescription = document.querySelector('[data-new-task-description]');
const newTaskDate = document.querySelector('[data-new-task-date]');
const newTaskPriority = document.querySelector('[data-new-task-priority]');

const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]');

const LOCAL_STORAGE_PROJECT_KEY = 'task.projects';
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'task.selectedProjectId';

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY);

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId);
}

function renderProjects() {
  projects.forEach(project => {
    const projectElement = document.createElement('li');
    projectElement.dataset.projectId = project.id;
    projectElement.classList.add('project-name');
    projectElement.innerText = project.name;
    if (project.id === selectedProjectId) {
      projectElement.classList.add('active-project');
    }
    projectsContainer.appendChild(projectElement);
  });
}

function renderTaskCount(selectedProject) {
  const incompleteTaskCount = selectedProject.tasks.filter(task => !task.complete).length;
  const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks';
  projectCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

function renderTasks(selectedProject) {
  selectedProject.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    const body = taskElement.querySelector('div');
    label.htmlFor = task.id;
    label.append(task.name);
    body.append(`${task.date} `);
    body.append(`${task.priority} `);
    body.append(`${task.description} `);

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.classList.add('edit');
    // eslint-disable-next-line no-use-before-define
    editButton.addEventListener('click', editTask(task, label));
    const todoTask = taskElement.querySelector('.todo');
    todoTask.append(editButton);
    tasksContainer.append(taskElement);
  });
}

function render() {
  clearElement(projectsContainer);
  renderProjects();

  const selectedProject = projects.find(project => project.id === selectedProjectId);
  if (selectedProjectId == null) {
    projectDisplayContainer.style.display = 'none';
  } else {
    projectDisplayContainer.style.display = '';
    projectTitleElement.innerText = selectedProject.name;
    renderTaskCount(selectedProject);
    clearElement(tasksContainer);
    renderTasks(selectedProject);
  }
}

function saveAndRender() {
  save();
  render();
}

function editTask(task, label) {
  newTaskInput.value = task.name;
  newTaskDate.value = task.date;
  newTaskPriority.value = task.priority;
  newTaskDescription.value = task.description;
  task.id = null;

  newTaskForm.addEventListener('submit', () => {
    task.name = newTaskInput.value;
    task.date = newTaskDate.value;
    task.priority = newTaskPriority.value;
    task.description = newTaskDescription.value;
    label.innerHTML = `${task.name}, ${task.date}, ${task.priority}, ${task.description}`;
    saveAndRender();
  });
}

function createProject(name) {
  return {
    id: Date.now().toString(),
    name,
    tasks: [],
  };
}

const createTask = (id, name, date, priority, description, complete) => {
  if (newTaskInput || newTaskDate || newTaskPriority || newTaskDescription) {
    // eslint-disable-next-line no-unused-expressions
    id = Date.now().toString();
    name = newTaskInput.value;
    date = newTaskDate.value;
    priority = newTaskPriority.value;
    description = newTaskDescription.value;
    complete = false;
  }
  return {
    id,
    name,
    date,
    priority,
    description,
    complete,
  };
};

deleteProjectButton.addEventListener('click', () => {
  projects = projects.filter(project => project.id !== selectedProjectId);
  selectedProjectId = null;
  saveAndRender();
});

projectsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedProjectId = e.target.dataset.projectId;
    saveAndRender();
  }
});

tasksContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedProject = projects.find(project => project.id === selectedProjectId);
    const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id);
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedProject);
  }
});

newProjectForm.addEventListener('submit', e => {
  e.preventDefault();
  const projectName = newProjectInput.value;
  const id = Date.now().toString();
  if (projectName == null || projectName === '') return;
  const project = createProject(projectName, id);
  newProjectInput.value = null;
  projects.push(project);
  render();
  saveAndRender();
});

clearCompleteTasksButton.addEventListener('click', e => {
  e.preventDefault();
  const selectedProject = projects.find(project => project.id === selectedProjectId);
  selectedProject.tasks = selectedProject.tasks.filter(task => !task.complete);
  saveAndRender();
});

if (newTaskForm) {
  newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    const taskName = newTaskInput.value;
    const taskDate = newTaskDate.value;
    const taskDescription = newTaskDescription.value;
    const taskPriority = newTaskPriority.value;

    if (!(taskName || taskDate || taskDescription || taskPriority)) return;
    const task = createTask();
    // if (task == null || task === '') return;
    newTaskInput.value = null;
    newTaskDate.value = null;
    newTaskDescription.value = null;
    newTaskPriority.value = null;

    const selectedProject = projects.find(project => project.id === selectedProjectId);
    selectedProject.tasks.push(task);
    saveAndRender();
  });
}

render();
