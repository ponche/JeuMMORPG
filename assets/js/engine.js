
let mousePosition = {x:0,y:0}; 

let isMouseDown = false; // variable global peut accéder partous 


let tableauKey = [false, false, false, false] ; // touche de controle mouvement 
let tableauFleche = [false, false, false , false ] ; 



let listeActor = [] ;

// recupération du canvas et du context 
let canvas = document.querySelector("canvas");
let ctx    = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// addEventListener 
canvas.addEventListener('mousemove', evt => mousePosition = getMousePos(canvas, evt), false);
window.addEventListener('touchmove', evt => {
  mousePosition = sd(canvas, evt);
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


}, false);


// fonction de trie de tableau 
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
	// 1- Init du jeu 
	// 2- connextion au serveur Node.js ( pas pour tous de suite ) 
	// 3- chargement de la map 
	world.loadScene() ; 
};

const update = function(elapsed) {
    
  // Mise à jour des Actor
  for (let i = 0 ; i < listeActor.length ; i++)
  {

	  listeActor[i].update() ; // avant la mise a jour des cordonnée

	  
	  // ça sera a MapRenderer de géré ça . 
	  /*listeActor[i].positionMap.x = Math.floor((actor_y / tile_height) + (actor_x / tile_width)) -1;
	  listeActor[i].positionMap.y = Math.floor((-actor_x / tile_width) + (actor_y / tile_height));

	  listeActor[i].positionMapDecimal.x = (actor_y / tile_height) + (actor_x / tile_width) -1;
	  listeActor[i].positionMapDecimal.y = (-actor_x / tile_width) + (actor_y / tile_height);

	  listeActor[i].tile_heigthWorld = tile_height ;
	  listeActor[i].tile_widthWorld = tile_width ;*/

	  // Mise a jour des position absolute
	  /*listeActor[i].position.x = listeActor[i].positionWorld.x + tileStartX  ;
	  listeActor[i].position.y = listeActor[i].positionWorld.y + tileStartY ;*/

	  //listeActor[i].tileFeet = world.tileMap[listeActor[i].positionMap.y * world.gridSize + listeActor[i].positionMap.x]


	 // après les calcul effectuer
	  listeActor[i].updateAfterCalcul() ;


	  // trie du tableau pour le rendu
	  listeActor.sort(comparateurListeObjet) ;
  }


};

const render = function() {
  ctx.fillStyle = '#151d26';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
   
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

function renderMouseAndGridPosition() 
{
  ctx.font = '12pt Calibri';
  ctx.fillStyle = 'white';
  ctx.fillText(`Mouse: ${mousePosition.x}, ${mousePosition.y}`, 20, 100);
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

// Renvoyé l'action du clic à actor est au référence . 
function onMouseClick() {

}

let world = new Scene(listeActor, ctx) ; // création de l'univers ( Big bang ) 

setup();
run();

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
	case 37: // Left
	  tableauFleche[2] = true ; 
	break;

	case 38: // Up
	  tableauFleche[0] = true; 
	break;

	case 39: // Right
	  tableauFleche[3] = true ; 
	break;

	case 40: // Down
	  tableauFleche[1] = true ; 
	break;

	case 81 :
		isKeyQ = true ;
		tableauKey[2] = true ; 
		break ;
	case 68 :
		isKeyD = true ;
		tableauKey[3] = true ; 
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
			tableauKey[2] = false ; 
			break ;
		case 68 :
			isKeyD = false ;
			tableauKey[3] = false ; 
			break ;
		case 90 :
			isKeyZ = false ;
			tableauKey[0] = false ; 
			break ;
		case 83 :
			isKeyS = false ;
			tableauKey[1] = false ; 
			break ;
		case 37: // Left
		  tableauFleche[2] = false ; 
		break;

		case 38: // Up
		  tableauFleche[0] = false; 
		break;

		case 39: // Right
		  tableauFleche[3] = false ; 
		break;

		case 40: // Down
		  tableauFleche[1] = false ; 
		break;
		}
}, false);

function tilePosToMapPos(tileX, tileY) {
  let posX = -48*tileY+48*tileX+48;
  let posY = (48*tileX+48*tileY+48)/2;
  return {x: posX, y:posY};
}


