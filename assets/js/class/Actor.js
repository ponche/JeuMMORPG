class Actor
{
	constructor(name, scene)
	{
		this.name = name ;
		this.scene = scene ; 
		
		this.positionWorld = { x: 20, y: 130 } ; // position du personnage, à modifier pour déplacer le perso.
		
		this.position = { x: 0, y: 0 } ; // ne pas utilises pour les calcul de actor
		this.positionMap = { x: -1, y: -1 } ; 
		this.positionMapDecimal = { x: -1, y: -1 } ; 
		
		this.lastPositionWorld = {x: 20, y: 130} ;  // à deplacer dans ArcadeBody
		this.positionZ = 0 ;
		this.tileFeet = undefined ; // indicateur de type de cellule
				
		this.speed = 2 ; // class Player Controler 
		this.tile_heigthWorld = 0 ; // a supprimer quand scene sera OK
		this.tile_widthWorld = 0 ; // a supprimer quand scene sera OK

		



		//Attributs Collision
		this.simulCollision = false ; // à deplacer dans ArcadeBody
		this.systemCollision = true ; // idem 

		// Gestion des composant
		this.behavior = [] ;
		this.sound = undefined ;
		this.collider = undefined ; // Définir la boite de collision 
		this.animationSprite = undefined ;


	}

	update()
	{
		// Mise a jour des composant
		if(this.animationSprite != undefined)
			this.animationSprite.update() ;
		if(this.collider != undefined)
			this.collider.update() ;
		for(let i = 0 ; i < this.behavior.length ; i++)
			this.behavior[i].update() ; 
		for(let i = 0 ; i < this.behavior.length ; i++)
			this.behavior[i].updateAfterCalcul() ; 


		// Mise a jour de positionZ
		this.positionZ = this.positionMapDecimal.x + this.positionMapDecimal.y * 10 ;
		// animationSprite ??
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
	
	move(x, y)
	{
		// changement de la position de Actor
		this.positionWorld.x += x ;
		this.positionWorld.y += y ;

	}

	setPositionGrid(x , y)
	{
		this.positionWorld = this.tilePosToMapPos(x, y) ;

	}
	
	
	addBehavior(behavior)
	{
		this.behavior.push(behavior) ; 
		behavior.actor = this ; 
	}
	addAnimationSprite(src,nbAnimation = 1, nbFrame = 1)
	{
		this.animationSprite = new Sprite(this) ;
		animationSprite.sprite.src = src ;
		animationSprite.nbAnimation = nbAnimation ;
		animationSprite.nbFrame = nbFrame ;
	}
	addColider(xa, ya, xb, yb)
	{
		// Rectangle de collision 
		// a point en haut a gauche. 
		// b point en bas a droite 
	}
	
	
	
	
	// class Utilitaire 
    tilePosToMapPos(tileX, tileY)
	{
		  let posX = -48*tileY+48*tileX+48;
		  let posY = (48*tileX+48*tileY+48)/2;
		  return {x: posX, y:posY};
	}

	
}
