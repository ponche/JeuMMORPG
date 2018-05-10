class Actor
{
	constructor(name, scene)
	{
		this.name = name ;
		this.scene = scene ; 
		
		this.position = { x: 0, y: 0 } ; 
				
		this.speed = 2 ; 
		
		// Attributs Colider 
		this.isSolid = false ; // Mettre false pour un trigger et un fantome ; 


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
		/*if(this.collider != undefined)
			this.collider.update() ;*/
		for(let i = 0 ; i < this.behavior.length ; i++)
			this.behavior[i].update() ; 
		


		// Mise a jour de positionZ
		//this.positionZ = this.positionMapDecimal.x + this.positionMapDecimal.y * 10 ;
		// animationSprite ??
	}
	updateAfterCalcul()
	{
		for(let i = 0 ; i < this.behavior.length ; i++)
			this.behavior[i].updateAfterCalcul() ; 

	}
	render() 
	{
		for(let i = 0 ; i < this.behavior.length ; i++)
			this.behavior[i].render() ; 
	}
	
	move(x, y)
	{
		// changement de la position de Actor
		this.position.x += x ;
		this.position.y += y ;

	}
	setPosition(x, y)
	{
		this.position.x = x ; 
		this.position.y = y ; 
	}

	setPositionGrid(x , y)
	{
		// A refaire 

	}
	
	// Fonction ajoute de composante 
	addBehavior(behavior)
	{
		this.behavior.push(behavior) ; 
		behavior.actor = this ; 
	}
	addAnimationSprite(src, nbFrame = 1, nbAnimation = 1,)
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
		this.collider = {} ; // espace de noms ; 
		this.collider.xa = xa ; 
		this.collider.ya = ya ; 
		this.collider.xb = xb ; 
		this.collider.yb = yb ; 
		// Position relative à l'origine de actor 
	}
	
	
	// Fonction utilitaire  
    tilePosToMapPos(tileX, tileY)
	{
		  let posX = -48*tileY+48*tileX+48;
		  let posY = (48*tileX+48*tileY+48)/2;
		  return {x: posX, y:posY};
	}

	
}
