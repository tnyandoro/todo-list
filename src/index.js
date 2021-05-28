const projectsContainer = document.querySelector('[data-projects]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input]');

const LOCAL_STORAGE_PROJECT_KEY = 'task.projects';

const projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY) || []);

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringfy(projects));
}

function render() {
  clearElement(projectsContainer);
  projects.forEach(project => {
    const projectElement = document.createElement('li');
    projectElement.dataset.projectId = project.id;
    projectElement.classList.add('project-name');
    projectElement.innerText = project.name;
    projectsContainer.appendChild(projectElement);
  });
}

function saveAndRender() {
  save();
  render();
}

function createProject(name) {
  return { id: Date.now().toString(), name, tasks: [] };
}

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

render();
