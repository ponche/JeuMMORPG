class Actor
{
	constructor(name)
	{
		this.name = name ;

		this.childrenActor = [] ;
		this.parentActor = undefined ;

		this.position = { x: 0, y: 0 } ; // positionAbs pour les calcul dans les canvas, et system.
		this.positionRel =  {x: 0, y: 0 } ; // Position Abs, sera position . remplacer par positionRel .
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
		// mise a jour position absolut
		this.updatePositionAbs() ;

		this.positionIso = this.mapPosToTilePos(this.position.x, this.position.y) ;

		// Mise a jour des composant
		if(this.animationSprite != undefined)
			this.animationSprite.update() ;
		if(this.collider != undefined)
			this.collider.update() ;
		for(let i = 0 ; i < this.behavior.length ; i++)
			this.behavior[i].update() ;

		// Mise a jour de positionZ
		this.positionZ = this.positionIso.x + this.positionIso.y * this.diagonalMax ;

		// on met à jour la position Abs après les calcul
		this.updatePositionAbs() ;

		// mise à jour des enfants
		for(let i = 0 ; i < this.childrenActor.length ; i++)
			this.childrenActor[i].update() ;
	}
	updatePositionAbs()
	{
		if(this.parentActor != undefined)
		{
			// on met la position absolut en fontion du parent
			this.position.x = this.parentActor.position.x + this.positionRel.x ;
			this.position.y = this.parentActor.position.y + this.positionRel.y ;
		}
		else
		{
			// il est à la racine, la positon absolut est égale à la position Relative
			this.position.x = this.positionRel.x ;
			this.position.y = this.positionRel.y ;
		}
	}
	updateAfterCalcul()
	{
		// Mise a jour des boite de collision
		if(this.collider != undefined)
			this.collider.updateAfterCalcul() ;

		// Mise a jour des composant
		for(let i = 0 ; i < this.behavior.length ; i++)
			this.behavior[i].updateAfterCalcul() ;

		// updateAfterCalcul des enfants
		for(let i = 0 ; i < this.childrenActor.length ; i++)
			this.childrenActor[i].updateAfterCalcul() ;
	}
	render()
	{
		if(this.animationSprite != undefined)
			this.animationSprite.render() ;
		for(let i = 0 ; i < this.behavior.length ; i++)
			this.behavior[i].render() ;

			// affichage des rendu enfants
			for(let i = 0 ; i < this.childrenActor.length ; i++)
				this.childrenActor[i].render() ;
	}
	collision(otherActor)
	{
		// Une collision a eu lieu
		for(let i = 0 ; i < this.behavior.length ; i++)
			this.behavior[i].collision(otherActor) ;
	}
	move(x, y)
	{
		// changement de la position de Actor
		this.positionRel.x += x ;
		this.positionRel.y += y ;
	}
	setPosition(x, y)
	{
		this.position.x = x ;
		this.position.y = y ;
	}
	setPositionRel(x, y)
	{
		this.positionRel.x = x ;
		this.positionRel.y = y ;
	}
	setPositionAbs(x, y)
	{
		let positionReturn = {x: 0 , y: 0 } ;
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
	addChildActor(name, x = 0 , y = 0)
	{
		let childActor = new Actor(name) ;
		childActor.setPositionRel(x, y) ;
		this.childrenActor.push(childActor) ;
		childActor.parentActor = this ;
		return childActor ;
	}
	addAnimationSprite(src, nbFrame = 1, nbAnimation = 1, buildCollider = true)
	{
		this.animationSprite = new SpriteAnimation(this, src, nbFrame, nbAnimation, buildCollider) ;
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
