class Actor
{
	constructor(name, scene)
	{
		this.name = name ;
		this.position = { x: 0, y: 0 } ; // ne pas utilises pour les calcul de actor
		this.positionMap = { x: -1, y: -1 } ; // Valeur en retard. valeur indicatif aucun effet sur changement
		this.positionMapDecimal = { x: -1, y: -1 } ; // idem
		this.positionWorld = { x: 20, y: 130 } ; // position du personnage, à modifier pour déplacer le perso.
		this.lastPositionWorld = {x: 20, y: 130} ;
		this.positionZ = 0 ;
		this.tileFeet = undefined ;
		this.speed = 2 ;
		this.tile_heigthWorld = 0 ; // a supprimer quand scene sera OK
		this.tile_widthWorld = 0 ; // a supprimer quand scene sera OK


		//Test Collision
		this.lastdirection = {x: 0, y:0} ;
		this.testCollision = false ;

		listeActor.push(this) ; // Attention, ne pas crée directement dans le tableau, c'est automatique

		// instruction : listeActor.push(this) sera remplacer pour prendre en compte la scene par la suite

		// Séparer les composant [Sprite, bodyCollider, etc ] pour une meilleur compréhension du code. a Faire

		//Attributs Collision
		this.simulCollision = false ;
		this.systemCollision = true

		// Gestion des composant
		//this.listeComposant = { behavior: undefined , sound : undefined, sprite: undefined, collider: undefined} ;
		this.behavior = undefined ;
		this.sound = undefined ;
		this.collider = undefined ;
		this.animationSprite = undefined ;


	}

	update()
	{
		// Mise a jour des composant
		if(this.behavior != undefined)
			this.behavior.update() ;
		if(this.animationSprite != undefined)
			this.animationSprite.update() ;
		if(this.collider != undefined)
			this.collider.update() ;


		// Mise a jour de positionZ
		this.positionZ = this.positionMapDecimal.x + this.positionMapDecimal.y * 10 ;
	}
	updateAfterCalcul()
	{
		// fonction donc les valeur sont calculer après la fonction update
		//Vérif collision
		if(this.systemCollision)
		{
			if(this.tileFeet == 21 || this.tileFeet == 23)
			{
				console.log("Collision") ;
				this.testCollision = true ;

				if(this.simulCollision)
				{
					this.positionWorld.x = this.lastPositionWorld.x ;
					this.positionWorld.y = this.lastPositionWorld.y ;
				}
			}
			else
			{
				this.testCollision = false ;
				// on enregistre la position dans lastPositionWorld
				if(this.simulCollision)
				{
					this.lastPositionWorld.x = this.positionWorld.x ;
					this.lastPositionWorld.y = this.positionWorld.y ;
				}
			}
		}

	}
	deleteActor()
	{
		// fonction pour retirer actor de la scenne
	}


	move(x, y)
	{
		// changement de la position de Actor

		this.positionWorld.x += x ;
		this.positionWorld.y += y ;

		// Si collision c'est UpdateAfterCalcul() qui va teleporter Actor
		// à la dernière position sans collision


	}

	setPositionGrid(x , y)
	{
		if(this.animationSprite != undefined)
		{
			let positionRelative = this.tilePosToMapPos(x  , y ) ;
			positionRelative.x -= (this.animationSprite.sprite.width / this.animationSprite.nbFrame) / 2
			positionRelative.y -= (this.animationSprite.sprite.height / this.animationSprite.nbAnimation)
			this.positionWorld = positionRelative ;
		}
		else
			this.positionWorld = this.tilePosToMapPos(x, y) ;

	}


	ejectionCollision()
	{


		this.positionWorld.x = this.lastPositionWorld.x ;
		this.positionWorld.y = this.lastPositionWorld.y ;


	}
    tilePosToMapPos(tileX, tileY)
	{
		  let posX = -48*tileY+48*tileX+48;
		  let posY = (48*tileX+48*tileY+48)/2;
		  return {x: posX, y:posY};
	}
	addBehavior(behavior)
	{
		this.listeComposant.behavior = behavior ;
	}
	addAnimationSprite(src,nbAnimation = 1, nbFrame = 1)
	{
		this.animationSprite = new Sprite(this) ;
		animationSprite.sprite.src = src ;
		animationSprite.nbAnimation = nbAnimation ;
		animationSprite.nbFrame = nbFrame ;
	}

	moveInDir(dir) {
		let tileX = arthur.positionMap.x;
		let tileY = arthur.positionMap.y;
		let actorPosX = this.positionWorld.x;
		let actorPosY = this.positionWorld.y;
		let trueMapPos = tilePosToMapPos(tileX+0.5, tileY+0.5);
		let trueActorPosX = trueMapPos.x-this.animationSprite.sprite.width/this.animationSprite.nbFrame/2;
		let trueActorPosY = trueMapPos.y-this.animationSprite.sprite.height/this.animationSprite.nbAnimation;
		this.move(trueActorPosX-actorPosX, trueActorPosY-actorPosY);

		// L'actor est désormais à sa position exacte au centre de la tuile

		let newTileX;
		let newTileY;
		let newTrueMapPos;
		let newTrueActorPosX;
		let newTrueActorPosY;

		switch(dir) {
			case "left":
				// x: -1 et y: +1
				newTileX = tileX-1;
				newTileY = tileY+1;
				this.animationSprite.setAnimation(4);
				break;
			case "right":
				newTileX = tileX+1;
				newTileY = tileY-1;
				this.animationSprite.setAnimation(3);
				break;
			case "top":
				newTileX = tileX-1;
				newTileY = tileY-1;
				this.animationSprite.setAnimation(1);
				break;
			case "bottom":
				newTileX = tileX+1;
				newTileY = tileY+1;
				this.animationSprite.setAnimation(6);
				break;
			case "topleft":
				newTileX = tileX-1;
				newTileY = tileY;
				this.animationSprite.setAnimation(0);
				break;
			case "topright":
				newTileX = tileX;
				newTileY = tileY-1;
				this.animationSprite.setAnimation(2);
				break;
			case "bottomleft":
				newTileX = tileX;
				newTileY = tileY+1;
				this.animationSprite.setAnimation(5);
				break;
			case "bottomright":
				newTileX = tileX+1;
				newTileY = tileY;
				this.animationSprite.setAnimation(7);
				break;
		}

		newTrueMapPos = tilePosToMapPos(newTileX, newTileY);
		newTrueActorPosX = newTrueMapPos.x-this.animationSprite.sprite.width/this.animationSprite.nbFrame/2;
		newTrueActorPosY = newTrueMapPos.y-this.animationSprite.sprite.height/this.animationSprite.nbAnimation+48/2;
		var biggest;
		if(Math.abs((newTrueActorPosX-trueActorPosX))>Math.abs((newTrueActorPosY-trueActorPosY))) {
			biggest = Math.abs((newTrueActorPosX-trueActorPosX));
		} else {
			biggest = Math.abs((newTrueActorPosY-trueActorPosY));
		}

		let stepY;
		let stepX;
		var moving=setInterval(myFunction,20/this.speed);
		var avancement = 0;
		function myFunction() {
			if((newTrueActorPosX-trueActorPosX) == 0) {
				stepY = (newTrueActorPosY-trueActorPosY)/Math.abs(newTrueActorPosY-trueActorPosY);
				stepX = 0;
				arthur.move(0, stepY);
				avancement = avancement + Math.abs(stepY) + Math.abs(stepX);
			} else if((newTrueActorPosY-trueActorPosY) == 0) {
				stepY = 0;
				stepX = (newTrueActorPosX-trueActorPosX)/Math.abs(newTrueActorPosX-trueActorPosX)
				arthur.move(stepX, 0);
				avancement = avancement + Math.abs(stepY) + Math.abs(stepX);
			} else {
				stepX = (newTrueActorPosX-trueActorPosX)/biggest;
				stepY = (newTrueActorPosY-trueActorPosY)/biggest;
				arthur.move(stepX*1.5, stepY*1.5);
				avancement = avancement + Math.abs(stepY*1.5) + Math.abs(stepX*1.5);
			}

			if(avancement >= Math.abs((newTrueActorPosX-trueActorPosX))+Math.abs((newTrueActorPosY-trueActorPosY))) {
				console.log(avancement);
				clearInterval(moving);
			}
		}
	}
}
