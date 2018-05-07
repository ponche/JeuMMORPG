class PlayerControlerKeyBoard extends BehaviorComposant
{
	constructor(arrayKey)
	{
		super() ; 
		// this.actor est mis dans la fonction addBehavior!!! 
		
		this.arrayKey = arrayKey
		this.isKeyLeft = arrayKey[3] ; 
		
		
		
	}
	update()
	{
		let direction = {x: 0, y:0 } ; 
		if(this.arrayKey[0])
			direction.y -= 0.5 * this.actor.speed ; 
		if(this.arrayKey[1])
			direction.y += 0.5 * this.actor.speed ; 
		if(this.arrayKey[2])
			direction.x += 1 * this.actor.speed ; 
		if(this.arrayKey[3])
			direction.x -= 1 * this.actor.speed ; 
		
		this.actor.move(direction.x, direction.y) ; 
		
		// if actor is a robot 
		if(this.actor.animationSprite != undefined) 
		{
			// Changement de animation
		  if(direction.x > 0 && direction.y == 0)
			  this.actor.animationSprite.setAnimation(3) ; // animation droite
		  if(direction.x < 0 && direction.y == 0)
			  this.actor.animationSprite.setAnimation(4) ;   //animation gauche
		  if(direction.x  == 0 && direction.y > 0 )
			  this.actor.animationSprite.setAnimation(6) // animation bas
		  if(direction.x ==  0 && direction.y < 0)
			  this.actor.animationSprite.setAnimation(1) ; // animation haut

		  if(direction.x < 0 && direction.y < 0 )
			  this.actor.animationSprite.setAnimation(0) ; // en haut a gauche
		  if(direction.x > 0 && direction.y < 0 )
			  this.actor.animationSprite.setAnimation(2) ; // en haut a droite
		  if(direction.x < 0 && direction.y > 0 )
			  this.actor.animationSprite.setAnimation(5) ; // en bas a gauche
		  if(direction.x > 0 && direction.y > 0 )
			  this.actor.animationSprite.setAnimation(7) ;
		}
	}
	collision(actorCollision)
	{
	}
	clickMouse(x, y)
	{
	}
	
}

	