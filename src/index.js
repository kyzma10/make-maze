import sayHello from './sayHello';
import User from './user.js';
import './style.css';

const title = document.createElement('h2');
title.innerHTML = sayHello('Daemon');
document.querySelector('body').appendChild(title);
console.log(sayHello('Demon'));
let user = new User('Nike');
console.log(user.sayName());
