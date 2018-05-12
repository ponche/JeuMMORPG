let size = 20;
let tileMap = Array(size*size).fill(0);

let gridSize = Math.sqrt(tileMap.length);
let maxSelectorsPerRow = 6;
let selectedTileType = 0;
let tileStartX = 0;
let tileStartY = 0;
let mousePosition = {x:0,y:0};
let hoverTileX = -1;
let hoverTileY = -1;
let tiletype_empty = 0;
let isMouseDown = false;
let isKeyZ = false ;
let isKeyS = false ;
let isKeyQ = false ;
let isKeyD = false ;
let tile_images = [];
let tile_quantity = 36;
let offsetYMod = 0;

let offsetXMod = 0;


for(let i = 0; i < tile_quantity; ++i) {
  let img = new Image();
  if(i == 0) { img.src = ""; } else { img.src = "assets/img/game/tiles/"+i+".png"; }
  tile_images.push(img);
}


let canvas = document.querySelector("canvas");
let ctx    = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
maxSelectorsPerRow = canvas.width / 72;

canvas.addEventListener('mousemove', evt => mousePosition = getMousePos(canvas, evt), false);
window.addEventListener('touchmove', evt => {
  mousePosition = getMousePos(canvas, evt);
  evt.preventDefault();
}, false);

// mousedown
canvas.addEventListener('mousedown', evt => isMouseDown = true, false);
window.addEventListener('touchstart', evt => isMouseDown = true, false);
window.addEventListener('touchend', mouseUp, false);
canvas.addEventListener('mouseup', mouseUp, false);
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  maxSelectorsPerRow = canvas.width / 72;

}, false);

function mouseUp(evt) {
	if (isMouseDown === true) onMouseClick();
  isMouseDown = false;
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
	x: evt.clientX - rect.left,
	y: evt.clientY - rect.top
  };
}


const setup = function() {

};

const update = function(elapsed) {
  let tile_height = 48;
  let tile_width = 96;
  let mouse_y = mousePosition.y-tileStartY;
  let mouse_x = mousePosition.x-tileStartX;

  hoverTileX = Math.floor((mouse_y / tile_height) + (mouse_x / tile_width)) -1;
  hoverTileY = Math.floor((-mouse_x / tile_width) + (mouse_y / tile_height));

  // Partie qui controle la supression d'une tuile
  if (isMouseDown === true)  {
	 if (hoverTileX >= 0 && hoverTileY >= 0 && hoverTileX < gridSize && hoverTileY < gridSize) {
	  var tileIndex = hoverTileY * gridSize + hoverTileX;
	  if (tileIndex < tileMap.length) {
		let tileType = selectedTileType;// (tileMap[tileIndex] + 1) % tile_textures.length;
		tileMap[tileIndex] = tileType;
	  }
	}
  }

};

const render = function() {
  tileStartX = canvas.width/2+offsetXMod-50;
  tileStartY = -((size*48)/2)+(canvas.height/2)+offsetYMod;

  ctx.fillStyle = '#151d26';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  renderTiles(tileStartX, tileStartY);
  renderObjects();
  renderUI();
};

const run = function(e) {
  update(e);
  render();
  window.requestAnimationFrame(run);
};

function renderUI () {
  // renderMouseAndGridPosition();
  renderTileSelectors();
}

function renderTileSelectors() {
  let selectorTileWidth  = 48;
  let selectorTileHeight = 48;
  let renderRow = 0;
  let renderColumn = 0;
  // renderEmptyTileSelector(selectorTileWidth, selectorTileHeight, selectedTileType == tiletype_empty);
  for(let x = 0; x < tile_images.length; ++x) {
	if (renderColumn >= maxSelectorsPerRow) {
	  renderColumn = 0;
	  renderRow++;
	}
	renderTileSelector(
		selectorTileWidth,
		selectorTileHeight,
		renderColumn,
		renderRow, tile_images[x],
		x==selectedTileType);
	renderColumn++;
  }
}

function renderEmptyTileSelector(width, height, isSelected) {
  renderSelectorBackground(20, 20, width, height, isSelected);
}

function renderTileSelector(width, height, index, row, image, isSelected) {
  let renderX = 20 + (width*index) + (index*20);
  let renderY = 20 + (height*row) + (row*20);
  renderSelectorBackground(renderX, renderY, width, height, isSelected);
  ctx.drawImage(image, renderX, renderY, width, height);
}

function renderSelectorBackground(x, y, width, height, isSelected) {
  let isMouseOver = mousePosition.x >= x && mousePosition.x <= x + width &&
					mousePosition.y >= y && mousePosition.y <= y + height;
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.strokeStyle = isSelected ? 'rgba(192, 57, 43,1.0)' : isMouseOver ? 'rgba(192, 57, 43, 0.8)' : 'rgba(0, 0, 0, 0.4)';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.lineWidth = isSelected ? 4 : 2;
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.fill();
}

function renderMouseAndGridPosition() {
	let mouse_over_grid = hoverTileX >= 0 && hoverTileY >= 0 && hoverTileY <= gridSize && hoverTileX <= gridSize ? `Grid: ${hoverTileX}, ${hoverTileY}` : "";
  ctx.font = '12pt Calibri';
  ctx.fillStyle = 'white';
  ctx.fillText(`Mouse: ${mousePosition.x}, ${mousePosition.y}`, 20, 100);
  ctx.fillText(`${mouse_over_grid}`, 20, 120);
}

function renderObjects()
{

}

function renderTiles(x, y) {
  let tileWidth = 96;
  let tileHeight = 48;
  let tile_half_width = tileWidth / 2;
  let tile_half_height = tileHeight / 2;
  for (let tileX = 0; tileX < gridSize; ++tileX) {
	for (let tileY = 0; tileY < gridSize; ++tileY) {
	  let renderX = x + (tileX - tileY) * tile_half_width;
	  let renderY = y + (tileX + tileY) * tile_half_height;
	  let tile = tileMap[tileY * gridSize + tileX];
	  if(tile !== tiletype_empty) renderTexturedTile(tile_images[tile], renderX, renderY, 80);
	  else renderTileBackground(renderX, renderY+48, tileWidth, tileHeight);
	}
  }

  if (hoverTileX >= 0 && hoverTileY >= 0 && hoverTileX < gridSize && hoverTileY < gridSize) {
	  let renderX = x + (hoverTileX - hoverTileY) * tile_half_width;
	  let renderY = y + (hoverTileX + hoverTileY) * tile_half_height;
	  renderTileHover(renderX, renderY+48, tileWidth, tileHeight);
  }
}

function onMouseClick() {
  // check if we clicked on the grid
  if (!(hoverTileX >= 0 && hoverTileY >= 0 && hoverTileX < gridSize && hoverTileY < gridSize)) {
	// check if we click on our selectors
	let selectorIndex = -1;
	let renderRow = 0;
	let renderColumn = 0;
	let renderX = 20;
	let renderY = 20;
	for(let index = 0; index < tile_quantity; ++index){
	  let rowSize = maxSelectorsPerRow;
	  if (renderColumn >= rowSize) {
		renderColumn = 0;
		renderRow++;
	  }
	  renderX = 20 + (48 * renderColumn) + (renderColumn * 20);
	  renderY = 20 + (48 * renderRow) + (renderRow * 20);
	  if (mousePosition.x >=renderX && mousePosition.x <= renderX + 48 &&
		  mousePosition.y >= renderY && mousePosition.y <= renderY + 48) {
		selectorIndex = index;
		break;
	  }
	  renderColumn++;
	}
	if (selectorIndex != -1) {
	  selectedTileType = selectorIndex;
	}
  }
}

// Pour modifier les couleurs du selecteur, c'est ici
function renderTileHover(x, y, width, height) {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.moveTo(x, y);
  ctx.lineTo(x + width/2, y-height/2);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width/2, y + height/2);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.fill();
}

function renderTileBackground(x, y, width, height) {
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.fillStyle = 'rgba(25,34, 44,0.2)';
  ctx.lineWidth = 1;
  ctx.moveTo(x, y);
  ctx.lineTo(x + width/2, y-height/2);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width/2, y + height/2);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.fill();
}

function renderTexturedTile(imgSrc, x, y, tileHeight) {
  let offsetY = tileHeight - imgSrc.height;

  ctx.drawImage(imgSrc, x, y+offsetY);
}

setup();
run();

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
	case 37: // Left
	  offsetXMod = offsetXMod + 10;
	break;

	case 38: // Up
	  offsetYMod = offsetYMod + 10;
	break;

	case 39: // Right
	  offsetXMod = offsetXMod - 10;
	break;

	case 40: // Down
	  offsetYMod = offsetYMod - 10;
	break;

	case 81 :
		isKeyQ = true ;
		break ;
	case 68 :
		isKeyD = true ;
		break ;
	case 90 :
		isKeyZ = true ;
		break ;
	case 83 :
		isKeyS = true ;
		break ;
  }


}, false);

window.addEventListener('keyup' , function(event) {
	switch (event.keyCode)
	{
		case 81 :
			isKeyQ = false ;
			break ;
		case 68 :
			isKeyD = false ;
			break ;
		case 90 :
			isKeyZ = false ;
			break ;
		case 83 :
			isKeyS = false ;
			break ;
	}
}, false);
