function generateMaze(arr, size){
  for(let i = 0; i < size; i++){
    arr[i] = [];
    for(let j = 0; j < size; j++){
      arr[i][j] = 0;
    }
  }
  return arr;
}

function getRandom(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export {
  generateMaze,
  getRandom
}
