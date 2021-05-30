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
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
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

function createProject(name) {
  return {
    id: Date.now().toString(),
    name,
    tasks: [],
  };
}

function createTask(name) {
  return {
    id: Date.now().toString(),
    name,
    complete: false,
  };
}

deleteProjectButton.addEventListener('click', e => {
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

newProjectForm.addEventListener('submit', e => {
  e.preventDefault();
  const projectName = newProjectInput.value;
  if (projectName == null || projectName === '') return;
  const project = createProject(projectName);
  newProjectInput.value = null;
  projects.push(project);
  render();
  saveAndRender();
});

newTaskForm.addEventListener('submit', e => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  if (taskName == null || taskName === '') return;
  const task = createTask(taskName);
  newTaskInput.value = null;
  const selectedProject = projects.find(project => project.id === selectedProjectId);
  selectedProject.tasks.push(task);
  saveAndRender();
});

render();
