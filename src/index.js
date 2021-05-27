import { divide } from 'lodash';
// import { format, compareAsc } from 'date-fns';
import { todoTask } from './todo';
import Project from './projects';

const projectsContainer = document.querySelector('[data-projects]');

let projects = ['name', 'todo'];

function clearElement(element) {

}

function render() {
  <li class="project-name">Study</li>;
  clearElement(projectsContainer);
  projectsContainer(project => {
    const projectElement = document.createElement('li');
    projectElement.classList.add('project-name');
    projectElement.innerText = project;
  });
}
