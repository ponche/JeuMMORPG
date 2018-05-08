class ArcadeBody extends BehaviorComposant
{
	constructor()
	{
		super() ; 
		
		
		this.simulCollision = false ; // à deplacer dans ArcadeBody
		this.systemCollision = true ; // idem 
		this.testCollision = false ;
		
		this.lastPositionWorld = {x: 20, y: 130} ; 
		
	}
	
	
	updateAfterCalcul()
	{
		// fonction donc les valeur sont calculer après la fonction update
		//Vérif collision
		if(this.systemCollision)
		{
			if(this.actor.tileFeet == 21 || this.actor.tileFeet == 23)
			{
				console.log("Collision in composant") ;
				this.testCollision = true ;

				if(this.simulCollision)
				{
					this.actor.positionWorld.x = this.lastPositionWorld.x ;
					this.actor.positionWorld.y = this.lastPositionWorld.y ;
				}
			}
			else
			{
				this.testCollision = false ;
				// on enregistre la position dans lastPositionWorld
				if(this.simulCollision)
				{
					this.lastPositionWorld.x = this.actor.positionWorld.x ;
					this.lastPositionWorld.y = this.actor.positionWorld.y ;
				}
			}
		}
	}
}

	