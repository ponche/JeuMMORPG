class Actor
{
	constructor(name, scene)
	{
		this.name = name ; 
		this.position = { x: 200, y: 200 } ; 
		
		// a tranferer dans la class Sprite
		this.nbAnimation = 8 ; 
		this.nbFrame = 9 ; 
		this.currentFrame = 0 ; 
		this.currentAnimation = 0 ;
		this.sprite = new Image() ; 
		this.sprite.src  = "assets/img/game/sprites/characters/robot.png"
		this.delayFrame = 3 // plus le nombre est important plus le personnage va lentement ( "ne prend pas les décimal" ) 
		this.currentDelayFrame = 0
		this.loopAnimationSprite = true ; 
		this.runAnimationSprite = true ; 
		// fin attribut pour la class Sprite  
		
		listeActor.push(this) ; // Attention, ne pas crée directement dans le tableau, c'est automatique 
		
		// instruction : listeActor.push(this) sera remplacer pour prendre en compte la scene par la suite 
		
		// Séparer les composant [Sprite, bodyCollider, etc ] pour une meilleur compréhension du code. a Faire
	}
	
	update()
	{
		// Mise a jour du sprite 
		if(runAnimationSprite)
		{
			this.currentDelayFrame++ 
			if(this.currentDelayFrame >= this.delayFrame) 
			{
				this.currentFrame++ ; 
				this.currentDelayFrame = - 1 ; 
				if(this.currentFrame >= this.nbFrame)
					this.currentFrame = 0 ; 
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
		this.currentAnimation = newAnimation ; 
		if(this.currentAnimation >= this.nbAnimation)
		{
			console.log("Erreur par d'animation trouver");
			this.currentAnimation = 0 ; 
		}
	}
	
	
	
}



