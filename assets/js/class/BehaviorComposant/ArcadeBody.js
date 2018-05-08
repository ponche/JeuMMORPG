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
		
		this.lastPositionWorld = {x: -1, y: -1} ; 
		this.arraySolideTile = arraySolideTile ; 
		
	}
	
	
	updateAfterCalcul()
	{
		// fonction donc les valeur sont calculer après la fonction update
		//Vérif collision
		if(this.systemCollisionTile)
		{
			
			if(verifCollision(this.arraySolideTile))
			{
				console.log("Collision in composant") ;
				this.testCollision = true ;

				this.actor.positionWorld.x = this.lastPositionWorld.x ;
				this.actor.positionWorld.y = this.lastPositionWorld.y ;
				
			}
			else
			{
				this.testCollision = false ;
				// on enregistre la position dans lastPositionWorld
				
				this.lastPositionWorld.x = this.actor.positionWorld.x ;
				this.lastPositionWorld.y = this.actor.positionWorld.y ;
				
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

	