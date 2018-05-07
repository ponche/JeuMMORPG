class PlayerControlerKeyboard extends BehaviorComposant 
{
	constructor(actor, keyUp, keyDown, keyRight, keyLeft)
	{
		super(actor) ; 
		this.isKeyUp = keyUp ;
		this.isKeyDown = keyDown ; 
		this.isKeyRight = keyRight ; 
		this.isKeyLeft = keyLeft ; 
		
	}
	
	update()
	{
		let direction = {x: 0, y:0 } ; 
		if(isKeyUp)
			direction.y -= 0.5 * actor.speed ; 
		if(isKeyDown)
			direction.y += 0.5 * actor.speed ; 
		if(isKeyRight)
			direction.x += 1 * actor.speed ; 
		if(isKeyLeft)
			direction.x -= 1 * actor.speed ; 
		
	}
}
