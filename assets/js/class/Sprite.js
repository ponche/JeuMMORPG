class SpriteAnimation
{
	constructor(actor, buildColider = true)
	{
		this.actor = actor

		this.nbAnimation = 1 ; // attention variable utilsé dans la boucle de rendu jusqu'a sprite.src
		this.nbFrame = 1 ;
		this.currentFrame = 0 ;
		this.currentAnimation = 0 ;
		this.sprite = new Image() ;
		this.sprite.src  = "assets/img/game/sprites/characters/robot.png"
		this.delayFrame = 3 // plus le nombre est important plus le personnage va lentement ( "ne prend pas les décimal" )
		this.currentDelayFrame = 0
		this.loopAnimationSprite = true ; 
		this.reverseAnimation = false ;
		this.runAnimationSprite = false ;
		this.largeurActor = this.sprite.height / this.nbAnimation ; 
		this.hauteurActor = this.sprite.width / this.nbFrame ; 
		this.offsetSprite = {x: 0, y:0} ; 
		this.offsetSprite.x += (this.sprite.width / this.nbFrame) /2 ; 
		this.offsetSprite.y += this.sprite.height / this.nbAnimation ; 
		if(buildColider)
		{
			// A faire 
		}
		
		
	}

	update()
	{
		if(this.runAnimationSprite)
		{
			if(this.reverseAnimation == false)
			{
				this.currentDelayFrame++
				if(this.currentDelayFrame >= this.delayFrame)
				{

					this.currentDelayFrame = - 1 ;

					if(this.currentFrame < this.nbFrame - 1  )
						this.currentFrame++ ;

					if(this.currentFrame >= this.nbFrame - 1)
						if(this.loopAnimationSprite)
							this.currentFrame = 0 ;


				}
			}
			else
			{
				this.currentDelayFrame++
				if(this.currentDelayFrame >= this.delayFrame)
				{

					this.currentDelayFrame = - 1 ;

					if(this.currentFrame >  - 1  )
						this.currentFrame-- ;

					if(this.currentFrame <=  - 1)
						if(this.loopAnimationSprite)
							this.currentFrame = this.nbFrame -1 ;

				}
			}
		}
	}
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
	loadSprite(src)
	{
		sprite.src = src ; 
	}
	render()
	{

		let spriteActor = this.sprite ;
		
		let hauteurActor = spriteActor.height / this.nbAnimation ;
		let largeurActor = spriteActor.width / this.nbFrame ;
		
		let positionX = this.actor.positionAbs.x  - (largeurActor / 2)  ;
		let positionY = this.actor.positionAbs.y  - hauteurActor ;
		
		
		ctx.drawImage(spriteActor, this.currentFrame * largeurActor, this.currentAnimation * hauteurActor , largeurActor, hauteurActor, positionX, positionY , largeurActor, hauteurActor) ;
		
	}
}
