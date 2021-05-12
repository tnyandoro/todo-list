import _ from 'lodash';
import './style.css';
import Bg from './images/wood-bg.jpg';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // Add the image to our existing div.
  const myBg = new Image();
  myBg.src = Bg;

  element.appendChild(myBg);

  return element;
}

document.body.appendChild(component());