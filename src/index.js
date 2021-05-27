const projectsContainer = document.querySelector('[data-projects]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-Input]');

let projects = [{
  id: 1,
  name: 'name',
},
{
  id: 2,
  name: 'todo',
}];

newProjectForm.addEventListener('submit', e => {
  
})

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function render() {
  clearElement(projectsContainer);
  projects.forEach(project => {
    const projectElement = document.createElement('li');
    projectElement.dataset.projectId = project.id;
    projectElement.classList.add('project-name');
    projectElement.innerText = project;
    projectsContainer.append(projectElement);
  });
}

render();
