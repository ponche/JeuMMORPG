class SpriteAnimation 
{
	constructor()
	{
		this.nbAnimation = 8 ; // attention variable utilsé dans la boucle de rendu jusqu'a sprite.src 
		this.nbFrame = 9 ; 
		this.currentFrame = 0 ; 
		this.currentAnimation = 0 ;
		this.sprite = new Image() ; 
		this.sprite.src  = "assets/img/game/sprites/characters/robot.png"
		this.delayFrame = 3 // plus le nombre est important plus le personnage va lentement ( "ne prend pas les décimal" ) 
		this.currentDelayFrame = 0
		this.loopAnimationSprite = true ; 
		this.reverseAnimation = false ; 
		this.runAnimationSprite = true ; 
	}
		
		update()
	{
		// Mise a jour du sprite 
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