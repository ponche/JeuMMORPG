class SpriteAnimation
{
	constructor(actor)
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
}
