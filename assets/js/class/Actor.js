class Actor
{
	constructor(name, scene)
	{
		this.name = name ;
		this.scene = scene ; 
		
		this.position = { x: 0, y: 0 } ; 
		this.positionAbs =  {x: 0, y: 0 } ;
		this.positionIso = {x: 0, y: 0 } ; 
		this.positionZ = 0 ; 
		this.diagonalMax = 1600 ; // Magic Number grace au test terrain . varie selon les écrans . 
				
		this.speed = 2 ;  


		// Gestion des composant
		this.behavior = [] ;
		this.sound = undefined ;
		this.collider = undefined ; // Définir la boite de collision 
		this.animationSprite = undefined ;
		this.player = undefined ; 


	}

	update()
	{
		//Mise à jour de la position absolut. temporaire mon système n'est pas encore pret. 
		this.positionAbs = this.position ; 
		this.positionIso = this.mapPosToTilePos(this.positionAbs.x, this.positionAbs.y) ; 
		
		// Mise a jour des composant
		if(this.animationSprite != undefined)
			this.animationSprite.update() ;
		if(this.collider != undefined)
			this.collider.update() ;
		for(let i = 0 ; i < this.behavior.length ; i++)
			this.behavior[i].update() ; 
		
		// Mise a jour de positionZ
		this.positionZ = this.positionIso.x + this.positionIso.y * this.diagonalMax ; 
	}
	updateAfterCalcul()
	{
		for(let i = 0 ; i < this.behavior.length ; i++)
			this.behavior[i].updateAfterCalcul() ; 

	}
	render() 
	{
		if(this.animationSprite != undefined)
			this.animationSprite.render() ; 
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
		behavior.actor = this ; // les autres langage ne permet pas ce genre de bidouiles 
	}
	addAnimationSprite(src, nbFrame = 1, nbAnimation = 1)
	{
		this.animationSprite = new SpriteAnimation(this, src, nbFrame, nbAnimation) ;
		//this.animationSprite.sprite.src = src ;
		//this.animationSprite.nbAnimation = nbAnimation ;
		//this.animationSprite.nbFrame = nbFrame ;
	}
	addCollider(offsetBox, dimensionBox)
	{
		this.collider = new Collider(this, offsetBox, dimensionBox) ; 	
	}
	
	
	// Fonction utilitaire  
    tilePosToMapPos(tileX, tileY)
	{
		  let posX = -48*tileY+48*tileX+48;
		  let posY = (48*tileX+48*tileY+48)/2;
		  return {x: posX, y:posY};
	}
	mapPosToTilePos(actor_x, actor_y)
	{
		let tile_width = 2 ; 
		let tile_height = 1 ;
		let positionIso = {x: -1, y: -1 } ; 
		positionIso.x = (actor_y / tile_height) + (actor_x / tile_width) ;
		positionIso.y = (-actor_x / tile_width) + (actor_y / tile_height);
		return positionIso ; 
	}

	
}
