import * as CONST from './utils/constants';
import * as HELP from './utils/help_func';

class Maze {
    constructor() {
      this.size = {};
      this.start = {};
      this.end = {};
    }

    genArea(size_x, size_y, area) {
        this.size = {x: size_x, y: size_y};
        for (let x = 0; x < size_x; x++){
            for (let y = 0; y < size_y; y++){
              let cell = document.createElement('div');
              cell.className = 'cell';
              cell.id = `${x}_${y}`;
              area.appendChild(cell);
            }
        }
    }

    setStart(pos_x, pos_y) {
        this.start = {x: pos_x, y: pos_y};
        this.curr = this.start;
    }

    setEnd(pos_x, pos_y) {
        this.end = {x: pos_x, y: pos_y};
    }


    getMap(all_cell) {
      let map_maze = [];
      map_maze = HELP.generateMaze(map_maze, CONST.SIZE);
      let k = 0;
      for(let i = 0; i < CONST.SIZE; i++){
        for(let j = 0; j < CONST.SIZE; j++){
          if(all_cell[k].className === 'cell close'){
            map_maze[i][j] = CONST.WALL;
          }
          k++;
        }
      }
      return map_maze;
    }

    addBarrier(pos_x, pos_y, element) {
        element.classList.toggle('close');
    }


    findPath(world, pathStart, pathEnd) {

    	let maxWalkableTileNum = 0;

    	function distanceFunction(Point, Goal) {
    		return Math.abs(Point.x - Goal.x) + Math.abs(Point.y - Goal.y);
    	}

    	function Neighbours(x, y) {
    		let	N = y - 1;
    		let S = y + 1;
    		let E = x + 1;
    		let W = x - 1;
    		let myN = N > -1 && canWalkHere(x, N);
    		let myS = S < CONST.SIZE && canWalkHere(x, S);
    		let myE = E < CONST.SIZE && canWalkHere(E, y);
    		let myW = W > -1 && canWalkHere(W, y);
    		let result = [];

    		if(myN)
    		  result.push({x:x, y:N});
    		if(myE)
    		  result.push({x:E, y:y});
    		if(myS)
    		  result.push({x:x, y:S});
    		if(myW)
    		  result.push({x:W, y:y});
    		return result;
    	}

    	function canWalkHere(x, y)
    	{
    		return ((world[x] != null) &&
    			(world[x][y] != null) &&
    			(world[x][y] <= maxWalkableTileNum));
    	};

    	function Node(Parent, Point)
    	{
    		let newNode = {
    			Parent:Parent,
    			value:Point.x + (Point.y * CONST.SIZE),
    			x:Point.x,
    			y:Point.y,
    			f:0,
    			g:0
    		};
    		return newNode;
    	}

    	function calculatePath() {
    		let	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
    		let mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
    		let myMap = [CONST.SIZE * CONST.SIZE];
    		let open = [mypathStart];
    		let closed = [];
    		let result = [];
    		let myNeighbours;
    		let myNode;
    		let myPath;
    		let length, max, min, i, j;

    		while(length = open.length)
    		{
    			max = CONST.SIZE * CONST.SIZE;
    			min = -1;
    			for(i = 0; i < length; i++)
    			{
    				if(open[i].f < max)
    				{
    					max = open[i].f;
    					min = i;
    				}
    			}

    			myNode = open.splice(min, 1)[0];

    			if(myNode.value === mypathEnd.value)
    			{
    				myPath = closed[closed.push(myNode) - 1];
    				do
    				{
    					result.push([myPath.x, myPath.y]);
    				}
    				while (myPath = myPath.Parent);

    				myMap = closed = open = [];

    				result.reverse();
    			}
    			else
    			{
    				myNeighbours = Neighbours(myNode.x, myNode.y);
    				for(i = 0, j = myNeighbours.length; i < j; i++)
    				{
    					myPath = Node(myNode, myNeighbours[i]);
    					if (!myMap[myPath.value])
    					{
    						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
    						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
    						open.push(myPath);
    						myMap[myPath.value] = true;
    					}
    				}
    				closed.push(myNode);
    			}
    		}
    		return result;
    	}
    	return calculatePath();
    }
}

export default Maze;
