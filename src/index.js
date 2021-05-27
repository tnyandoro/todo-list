import { divide } from 'lodash';
// import { format, compareAsc } from 'date-fns';
import { todoTask } from './todo';
import Project from './projects';

const projectsContainer = document.querySelector('[data-projects]');

let projects = [];