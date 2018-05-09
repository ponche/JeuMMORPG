let size = 10;
//let tileMap = [14, 23, 23, 23, 23, 23, 23, 23, 23, 13, 21, 32, 33, 33, 28, 33, 33, 33, 31, 20, 21, 34, 1, 1, 34, 18, 22, 17, 34, 20, 21, 34, 1, 1, 34, 16, 23, 19, 34, 20, 21, 25, 33, 33, 24, 33, 33, 33, 27, 20, 21, 25, 33, 33, 24, 33, 33, 33, 27, 20, 21, 34, 1, 1, 34, 1, 1, 1, 34, 20, 21, 34, 1, 1, 34, 1, 1, 1, 34, 20, 21, 29, 33, 33, 26, 33, 33, 33, 30, 20, 11, 22, 22, 22, 22, 22, 22, 22, 22, 12]
//let gridSize = Math.sqrt(tileMap.length);
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

let tableauKey = [isKeyZ, isKeyS, isKeyD, isKeyQ] ; 

let offsetXMod = 0;
let listeActor = [] ;



// Création de la scene 





// Creation des Actor , par la suite ça sera dans scenes. (sauf pour les joueurs qui seront spawnmer ) .

/*let arthur = world.addActor("Arthur", 5, 5) ; 
arthur.animationSprite = new SpriteAnimation(arthur) ;
arthur.animationSprite.runAnimationSprite = true;
//arthur.animationSprite.reverseAnimation = true;
arthur.animationSprite.nbAnimation = 8 ;
arthur.animationSprite.nbFrame = 9 ;
arthur.animationSprite.reverseAnimation = true*/
 

//arthur.addBehavior( new PlayerControlerKeyBoard(tableauKey)) ; 
// obliger de mettre les touche dans un tableau, car c'est la seul manière de les passé par référence








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

function comparateurListeObjet(a,b)
{
	if(a.positionZ < b.positionZ)
		return -1 ;
	if(a.positionZ > b.positionZ)
		return 1 ;
	// en cas egalite
	return 0
}


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


const setup = function() 
{
	world.loadScene() ; 
};

const update = function(elapsed) {
  let tile_height = 48; // Magic Number
  let tile_width = 96;
  let mouse_y = mousePosition.y-tileStartY;
  let mouse_x = mousePosition.x-tileStartX;

  hoverTileX = Math.floor((mouse_y / tile_height) + (mouse_x / tile_width)) -1;
  hoverTileY = Math.floor((-mouse_x / tile_width) + (mouse_y / tile_height));

  

  
  // Mise à jour des Actor
  for (let i = 0 ; i < listeActor.length ; i++)
  {




	  listeActor[i].update() ; // avant la mise a jour des cordonnée

	  // Mise a jour des position absolute
	  listeActor[i].position.x = listeActor[i].positionWorld.x + tileStartX  ;
	  listeActor[i].position.y = listeActor[i].positionWorld.y + tileStartY ;

	  //Mise a jour des position  Retirer les animationSprite, c'est pas fessable
	  let actor_y = listeActor[i].position.y - tileStartY ;
	  let actor_x = listeActor[i].position.x - tileStartX  ;
	  listeActor[i].positionMap.x = Math.floor((actor_y / tile_height) + (actor_x / tile_width)) -1;
	  listeActor[i].positionMap.y = Math.floor((-actor_x / tile_width) + (actor_y / tile_height));

	  listeActor[i].positionMapDecimal.x = (actor_y / tile_height) + (actor_x / tile_width) -1;
	  listeActor[i].positionMapDecimal.y = (-actor_x / tile_width) + (actor_y / tile_height);

	  listeActor[i].tile_heigthWorld = tile_height ;
	  listeActor[i].tile_widthWorld = tile_width ;

	  // Mise a jour des position absolute
	  listeActor[i].position.x = listeActor[i].positionWorld.x + tileStartX  ;
	  listeActor[i].position.y = listeActor[i].positionWorld.y + tileStartY ;

	  listeActor[i].tileFeet = world.tileMap[listeActor[i].positionMap.y * world.gridSize + listeActor[i].positionMap.x]


	 // après les calcul effectuer
	  listeActor[i].updateAfterCalcul() ;

	  // Mise a jour des position absolute pour updateAfterCalcul
	  listeActor[i].position.x = listeActor[i].positionWorld.x + tileStartX  ;
	  listeActor[i].position.y = listeActor[i].positionWorld.y + tileStartY ;


	  // trie du tableau pour le rendu
	  listeActor.sort(comparateurListeObjet) ;
  }


};

const render = function() {
  tileStartX = canvas.width/2-50+offsetXMod;
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
  renderMouseAndGridPosition();
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
	let mouse_over_grid = hoverTileX >= 0 && hoverTileY >= 0 && hoverTileY <= world.gridSize && hoverTileX <= world.gridSize ? `Grid: ${hoverTileX}, ${hoverTileY}` : "";
  ctx.font = '12pt Calibri';
  ctx.fillStyle = 'white';
  
  ctx.fillText(`Mouse: ${mousePosition.x}, ${mousePosition.y}`, 20, 100);
  ctx.fillText(`${mouse_over_grid}`, 20, 120);

  // Ajout position Arthur
  /*ctx.fillText(`Arthur pos: ${arthur.position.x}, ${arthur.position.y}`, 20, 140);
  ctx.fillText(`Arthur posID: ${arthur.positionMap.x}, ${arthur.positionMap.y}`, 20, 160);
  ctx.fillText(`Arthur World: ${arthur.positionWorld.x}, ${arthur.positionWorld.y}`, 20, 180);
  ctx.fillText(`Arthur IdDecimal: ${arthur.positionMapDecimal.x}, ${arthur.positionMapDecimal.y}`, 20, 200);
  ctx.fillText(`Arthur IdTille: ${arthur.tileFeet}`, 20, 240);
  ctx.fillText(`Arthur positionZ: ${arthur.positionZ}`, 20, 260);*/


  // Position de la map
  ctx.fillText(`Worlds: ${tileStartX}, ${tileStartY}`, 20, 220);
}

function renderObjects()
{
	for (let i = 0 ; i < listeActor.length ; i++)
	{
		if(listeActor[i].animationSprite != undefined)
		{
			spriteActor = listeActor[i].animationSprite.sprite ;
			//spriteActor.src = "assets/img/game/sprites/characters/robot.png"
			hauteurActor = spriteActor.height / listeActor[i].animationSprite.nbAnimation ;
			largeurActor = spriteActor.width / listeActor[i].animationSprite.nbFrame ;
			ctx.drawImage(spriteActor, listeActor[i].animationSprite.currentFrame * largeurActor, listeActor[i].animationSprite.currentAnimation * hauteurActor , largeurActor, hauteurActor, listeActor[i].position.x, listeActor[i].position.y , largeurActor, hauteurActor) ;
		}
		// Appel de la fonction render() des objet 
		listeActor[i].render() ; 
		
	}
}

// A tranférer dans MapRenderer 
function renderTiles(x, y) {
  let tileWidth = 96;
  let tileHeight = 48;
  let tile_half_width = tileWidth / 2;
  let tile_half_height = tileHeight / 2;
  for (let tileX = 0; tileX < world.gridSize; ++tileX) {
	for (let tileY = 0; tileY < world.gridSize; ++tileY) {
	  let renderX = x + (tileX - tileY) * tile_half_width;
	  let renderY = y + (tileX + tileY) * tile_half_height;
	  let tile = world.tileMap[tileY * world.gridSize + tileX];
	  if(tile !== tiletype_empty) renderTexturedTile(tile_images[tile], renderX, renderY, 80);
	  else renderTileBackground(renderX, renderY+48, tileWidth, tileHeight);
	}
  }

  if (hoverTileX >= 0 && hoverTileY >= 0 && hoverTileX < world.gridSize && hoverTileY < world.gridSize) {
	  let renderX = x + (hoverTileX - hoverTileY) * tile_half_width;
	  let renderY = y + (hoverTileX + hoverTileY) * tile_half_height;
	  renderTileHover(renderX, renderY+48, tileWidth, tileHeight);
  }
}

function onMouseClick() {

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

// à Tranférer dans Map Renderer
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

// A tranférer dans map renderer 
function renderTexturedTile(imgSrc, x, y, tileHeight) {
  let offsetY = tileHeight - imgSrc.height;

  ctx.drawImage(imgSrc, x, y+offsetY);
}

let world = new Scene(listeActor, ctx) ; 

setup();
run();

// Faire un tableau de touche configurable, pas de touche direct. dans les calcul !!!! 
// regrouper en catégorie 
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
		tableauKey[3] = true ; 
		break ;
	case 68 :
		isKeyD = true ;
		tableauKey[2] = true ; 
		break ;
	case 90 :
		isKeyZ = true ;
		tableauKey[0] = true ; 
		break ;
	case 83 :
		isKeyS = true ;
		tableauKey[1] = true ; 
		break ;
  }


}, false);

window.addEventListener('keyup' , function(event) {
	switch (event.keyCode)
	{
		case 81 :
			isKeyQ = false ;
			tableauKey[3] = false ; 
			break ;
		case 68 :
			isKeyD = false ;
			tableauKey[2] = false ; 
			break ;
		case 90 :
			isKeyZ = false ;
			tableauKey[0] = false ; 
			break ;
		case 83 :
			isKeyS = false ;
			tableauKey[1] = false ; 
			break ;
	}
}, false);

// à tranférer dans MapRenderer 
function tilePosToMapPos(tileX, tileY) {
  let posX = -48*tileY+48*tileX+48;
  let posY = (48*tileX+48*tileY+48)/2;
  return {x: posX, y:posY};
}

// à tranférer dans un BehaviorComposant 
function coordsToDir(x1, y1, x2, y2) {
  let calc1 = x2 - x1;
  let calc2 = y2 - y1;

  switch(calc1) {
    case -1:
      switch(calc2) {
        case -1:
          return "top";
          break;
        case 1:
          return "left";
          break;
        case 0:
          return "topleft";
          break;
      }
      break;
    case 1:
      switch(calc2) {
        case -1:
          return "right";
          break;
        case 1:
          return "bottom";
          break;
        case 0:
          return "bottomright";
          break;
      }
      break;
    case 0:
      switch(calc2) {
        case -1:
          return "topright";
          break;
        case 1:
          return "bottomleft";
          break;
        case 0:
          return "Mmh... just don't move !";
          break;
      }
      break;
  }
}
