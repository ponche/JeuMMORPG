/*class PlayerControlerKeyboard extends BehaviorComposant 
{
	constructor()
	{
		
		//this.actor = super.actor ; 
		this.actor = super.actor; 
		this.isKeyUp = arrayKey[0] ;
		this.isKeyDown = arrayKey[1] ; 
		this.isKeyRight = arrayKey[2] ; 
		this.isKeyLeft = arrayKey[3] ; 
		
	}
	
	update()
	{
		let direction = {x: 0, y:0 } ; 
		if(this.isKeyUp)
			direction.y -= 0.5 * actor.speed ; 
		if(this.isKeyDown)
			direction.y += 0.5 * actor.speed ; 
		if(this.isKeyRight)
			direction.x += 1 * actor.speed ; 
		if(this.isKeyLeft)
			direction.x -= 1 * actor.speed ; 
		
		super.actor.move(direction.x, direction.y) ; 
		
		// if actor is a robot 
		/*if(.actor.animationSprite != undefined) 
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
*/