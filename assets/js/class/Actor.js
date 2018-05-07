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

	// Fonction Sprite
	setAnimation(newAnimation)
	{
		if(this.currentAnimation != newAnimation)
		{
			this.currentAnimation = newAnimation ;
			this.currentFrame = 0 ;
			if(this.currentAnimation >= this.nbAnimation)
			{
				console.log("Erreur par d'animation trouver");
				this.currentAnimation = 0 ;
			}
		}
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
		let positionRelative = this.tilePosToMapPos(x  , y ) ;
		positionRelative.x -= (this.sprite.width / this.nbFrame) / 2
		positionRelative.y -= (this.sprite.height / this.nbAnimation)
		this.positionWorld = positionRelative ; 
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
	
}
