import { sayHello } from './todo';

// console.log(sayHello('Tendai'));

async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1/posts');

  const data = await response.json();
  return data;
}

getPosts().then(posts => console.log(posts));