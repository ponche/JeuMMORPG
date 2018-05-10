class ArcadeBody extends BehaviorComposant
{
	constructor(arraySolideTile, actor)
	{
		super() ; 
		
		this.actor = actor 
		
		// Creation du variable dans Actor pour pourvoir la commande de l'extérieur 
		this.actor.arcadeBody = {} ; 
		this.actor.arcadeBody.systemCollisionTile = true ; 
		this.actor.arcadeBody.systemCollisionActor = true ; 
		
		this.lastPosition = {x: -1, y: -1} ; 
		this.arraySolideTile = arraySolideTile ; 
		
	}
	
	
	updateAfterCalcul()
	{
		// fonction donc les valeur sont calculer après la fonction update
		//Vérif collision
		if(this.actor.arcadeBody.systemCollisionTile)
		{
			
			if(this.verifCollision(this.arraySolideTile))
			{
				console.log("Collision in composant") ;
				this.testCollision = true ;

				this.actor.position.x = this.lastPositionWorld.x ;
				this.actor.position.y = this.lastPositionWorld.y ;
				
			}
			else
			{
				this.testCollision = false ;
				// on enregistre la position dans lastPositionWorld
				
				this.lastPosition.x = this.actor.position.x ;
				this.lastPosition.y = this.actor.position.y ;
				
			}
		}
	}
	
	verifCollision(tableauTile)
	{
		for(let i = 0 ; i < tableauTile.length ; i++)
		{
			if(this.actor.tileFeet == tableauTile[i])
				return true ; 
		}
		return false ;
	}
	
}

	