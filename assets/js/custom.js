


let tileMap = [14, 23, 23, 23, 23, 23, 23, 23, 23, 13, 21, 32, 33, 33, 28, 33, 33, 33, 31, 20, 21, 34, 1, 1, 34, 18, 22, 17, 34, 20, 21, 34, 1, 1, 34, 16, 23, 19, 34, 20, 21, 25, 33, 33, 24, 33, 33, 33, 27, 20, 21, 25, 33, 33, 24, 33, 33, 33, 27, 20, 21, 34, 1, 1, 34, 1, 1, 1, 34, 20, 21, 34, 1, 1, 34, 1, 1, 1, 34, 20, 21, 29, 33, 33, 26, 33, 33, 33, 30, 20, 11, 22, 22, 22, 22, 22, 22, 22, 22, 12]

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
let listeActor = [] ;




let arthur = new Actor ;

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

  // Mise à jour des Actor
  for (let i = 0 ; i < listeActor.length ; i++)
  {
	  let actor_y = listeActor[i].position.y - tileStartY + ( listeActor[i].sprite.height / listeActor[i].nbAnimation) ;
	  let actor_x = listeActor[i].position.x - tileStartX  + ((listeActor[i].sprite.width / listeActor[i].nbFrame) / 2 ) ;
	  listeActor[i].positionMap.x = Math.floor((actor_y / tile_height) + (actor_x / tile_width)) -1;
	  listeActor[i].positionMap.y = Math.floor((-actor_x / tile_width) + (actor_y / tile_height));

	  listeActor[i].update() ;
  }


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

  // controleur du personnage Test ( Arthur )
  let direction = {x: 0, y:0}

	if(isKeyS && isKeyD) {
		/*arthur.move(1, 0.5);
		direction.y = 1;
		direction.x = 1;*/

		arthur.move(0 , 1) ;
	  direction.y = 1 ;
	}
	else if(isKeyS && isKeyQ) {
		/*arthur.move(-1, 0.5);
		direction.x = -1;
		direction.y = 1;*/

		arthur.move(-1  , 0) ;
	  direction.x = -1 ;
	}
	else if(isKeyZ && isKeyD) {
		/*arthur.move(1, -0.5);
		direction.x = 1;
		direction.y = -1;*/

		arthur.move(1 , 0) ;
	  direction.x = 1
	}
	else if(isKeyZ && isKeyQ) {
		/*arthur.move(-1, -0.5);
		direction.x = -1;
		direction.y = -1;*/

		arthur.move(0 , -1) ;
	  direction.y = -1 ;
	}
  else if(isKeyD) // mouvement vers la droite
  {
	  /*arthur.move(1 , 0) ;
	  direction.x = 1*/

		arthur.move(1, 0.5);
		direction.y = 1;
		direction.x = 1;
  }
  else if(isKeyQ) // Mouvement vers la gauche
  {
	  /*arthur.move(-1  , 0) ;
	  direction.x = -1 ;*/

		arthur.move(-1, -0.5);
		direction.x = -1;
		direction.y = -1;
  }
  else if(isKeyZ) // mouvement vers le haut
  {
	  /*arthur.move(0 , -1) ;
	  direction.y = -1 ;*/

		arthur.move(1, -0.5);
		direction.x = 1;
		direction.y = -1;
  }
  else if(isKeyS) // mouvement vers le bas
  {
	  /*arthur.move(0 , 1) ;
	  direction.y = 1 ;*/

		arthur.move(-1, 0.5);
		direction.x = -1;
		direction.y = 1;
  }

  // Changement de animation
  if(direction.x > 0 && direction.y == 0)
	  arthur.setAnimation(3) ; // animation droite
  if(direction.x < 0 && direction.y == 0)
	  arthur.setAnimation(4) ;   //animation gauche
  if(direction.x  == 0 && direction.y > 0 )
	  arthur.setAnimation(6) // animation bas
  if(direction.x ==  0 && direction.y < 0)
	  arthur.setAnimation(1) ; // animation haut

  if(direction.x < 0 && direction.y < 0 )
	  arthur.setAnimation(0) ; // en haut a gauche
  if(direction.x > 0 && direction.y < 0 )
	  arthur.setAnimation(2) ; // en haut a droite
  if(direction.x < 0 && direction.y > 0 )
	  arthur.setAnimation(5) ; // en bas a gauche
  if(direction.x > 0 && direction.y > 0 )
	  arthur.setAnimation(7) ;


};

const render = function() {
  tileStartX = canvas.width/2-50+offsetXMod;
  tileStartY = canvas.height/2-200+offsetYMod;
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
	for (let i = 0 ; i < listeActor.length ; i++)
	{
		spriteActor = listeActor[i].sprite ;
		//spriteActor.src = "assets/img/game/sprites/characters/robot.png"
		hauteurActor = spriteActor.height / arthur.nbAnimation ;
		largeurActor = spriteActor.width / arthur.nbFrame ;
		ctx.drawImage(spriteActor, listeActor[i].currentFrame * largeurActor, listeActor[i].currentAnimation * hauteurActor , largeurActor, hauteurActor, listeActor[i].position.x, listeActor[i].position.y , largeurActor, hauteurActor) ;
	}
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
	  offsetXMod = offsetXMod - 10;
	break;

	case 38: // Up
	  offsetYMod = offsetYMod - 10;
	break;

	case 39: // Right
	  offsetXMod = offsetXMod + 10;
	break;

	case 40: // Down
	  offsetYMod = offsetYMod + 10;
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
