const projectsContainer = document.querySelector('[data-projects]');

let projects = [{
  id:1,
  name: 'name'
}];

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function render() {
  clearElement(projectsContainer);
  projects.forEach(project => {
    const projectElement = document.createElement('li');
    projectElement.classList.add('project-name');
    projectElement.innerText = project;
    projectsContainer.append(projectElement);
  });
}

render();
