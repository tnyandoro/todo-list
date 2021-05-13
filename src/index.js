import { divide } from 'lodash';
// import { format, compareAsc } from 'date-fns';
import { person, sayHello } from './todo';

const datefns = require('date-fns');

const arrDates = [new Date(1985, 5, 30), new Date(2007, 11, 15), new Date()];

console.log(arrDates);

arrDates.forEach((date) => {
  console.log(datefns.addYears(date, 5));
});