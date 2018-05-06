class Actor
{
	constructor(name, scene)
	{
		this.name = name ;
		this.position = { x: 0, y: 0 } ; // ne pas utilises pour les calcul de actor
		this.positionMap = { x: -1, y: -1 } ; // Valeur en retard. valeur indicatif aucun effet sur changement
		this.positionMapDecimal = { x: -1, y: -1 } ; // idem
		this.positionWorld = { x: 20, y: 130 } ; // position du personnage, à modifier pour déplacer le perso. 
		this.lastPositionWorld = {x: 20, y: 130} ; 
		this.positionZ = 0 ; 
		this.tileFeet = undefined ; 
		this.speed = 2 ; 
		
		
		//Test Collision
		this.lastdirection = {x: 0, y:0} ; 
		this.testCollision = false ; 

		// a tranferer dans la class Sprite
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
		this.runAnimationSprite = true ;
		// fin attribut pour la class Sprite

		listeActor.push(this) ; // Attention, ne pas crée directement dans le tableau, c'est automatique

		// instruction : listeActor.push(this) sera remplacer pour prendre en compte la scene par la suite

		// Séparer les composant [Sprite, bodyCollider, etc ] pour une meilleur compréhension du code. a Faire
		
		//Attributs Collision
		
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
		// Mise a jour de positionZ 
		this.positionZ = this.positionMap.x + this.positionMap.y * 9 ;
	}
	updateAfterCalcul()
	{
		// fonction donc les valeur sont calculer après la fonction update
		//Vérif collision 
		if(this.tileFeet == 21 || this.tileFeet == 23)
		{
			console.log("Collision") ;
			this.testCollision = true ; 
			
			// on teleporte sur la dernier position sans collision
			this.positionWorld.x = this.lastPositionWorld.x ; 
			this.positionWorld.y = this.lastPositionWorld.y ; 
		}
		else
		{
			this.testCollision = false ; 
			// on enregistre la position dans lastPositionWorld
			this.lastPositionWorld.x = this.positionWorld.x ; 
			this.lastPositionWorld.y = this.positionWorld.y ; 
		}
		
	}
	deleteActor()
	{
		// fonction pour retirer actor de la scenne
	}

	// Fonction Sprite
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
	move(x, y)
	{
		// changement de la position de Actor
		
		this.positionWorld.x += x ;
		this.positionWorld.y += y ;
		
		// Si collision c'est UpdateAfterCalcul() qui va teleporter Actor 
		// à la dernière position sans collision
		
 
	}
	ejectionCollision()
	{
		
		
		this.positionWorld.x = this.lastPositionWorld.x ; 
		this.positionWorld.y = this.lastPositionWorld.y ; 
		
		
	}
	



}
