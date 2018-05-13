import './style.css';
import * as CONST from './utils/constants';
import * as HELP from './utils/help_func';
import Maze from './maze';

let maze = new Maze();
maze.genArea(CONST.SIZE, CONST.SIZE, document.getElementById('my_maze'));
maze.setStart(0, 0);
maze.setEnd(CONST.SIZE -1, CONST.SIZE -1);

document.getElementById('my_maze').addEventListener('click', e => {
  let id = e.target.id;
  let pos = id.split('_');
  maze.addBarrier(pos[0], pos[1], document.getElementById(`${pos[0]}_${pos[1]}`));
});

document.getElementById('get-in').addEventListener('click', ()=> {
  let currentPath = [];
  let new_map = maze.getMap(document.getElementsByClassName('cell'));
  let curr_map = document.getElementsByClassName('cell');

  if(new_map[maze.start.x][maze.start.y] === CONST.WALL || new_map[maze.end.x][maze.end.y] === CONST.WALL){
    document.getElementById('answer').innerHTML = `<h3>Not path exist</h3>`;
  } else {
    let step = 0
  	while (step < 100)
  	{
      step++;
  		let pathStart = [maze.start.x, maze.start.y];
  		let pathEnd = [maze.end.x, maze.end.y];
      currentPath = maze.findPath(new_map, pathStart, pathEnd);
  	}
  }

  if(currentPath.length > 0) {
    for(let i = 0; i < currentPath.length; i++){
        curr_map[currentPath[i][0]*10 + currentPath[i][1]].classList.toggle('path');
      }
  } else {
    document.getElementById('answer').innerHTML = `<h3>Not path exist</h3>`;
  }
});

document.getElementById('clear').addEventListener('click', ()=>{
  let clear_maze = document.getElementsByClassName('cell');
    for(let i = 0; i < clear_maze.length; i++){
      if(clear_maze[i].className === 'cell close'){
        clear_maze[i].className = 'cell';
      }
      if(clear_maze[i].className === 'cell path'){
        clear_maze[i].className = 'cell';
      }
    }
    document.getElementById('answer').innerHTML = '';
});

document.getElementById('random').addEventListener('click', ()=>{
  let random_maze = document.getElementsByClassName('cell');
  for(let i = 1; i < random_maze.length -1;){
    if(HELP.getRandom(0, 1) !== 0){
      random_maze[i].className = 'cell close';
    }
    i +=2;
  }
});
