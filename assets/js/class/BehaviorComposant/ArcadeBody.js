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
			
			if(this.verifCollisionTiles(this.arraySolideTile))
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
		
		
		// Collision entre actor 
		if(this.actor.arcadeBody.systemCollisionActor)
		{
			// On vérifié tous les actor 
			for(let i = 0 ; i < listeActor.length ; i++ ) 
			{
				if(this.actor === listeActor[i])
					continue ; 
				
				if(listeActor[i].collider != undefined)
				{
					// Actor a bien une boite de collision  on fait le test 
					if(this.verifCollisionActor(listeActor[i].collider)) 
					{
						console.log("collisionActor") ; 
						// on informe other Actor de la collision 
						listeActor[i].collision(this.actor) ;
					}
				}
			}
			
			
		}
	}
	verifCollisionActor(otherCollider)
	{
		// Test de collision entre les 2 actor
		let collision = true ; 
		let ActorA_PointA = this.actor.collider.pointA ; 
		let ActorA_PointB = this.actor.collider.pointB ; 
		
		let ActorB_PointA = otherCollider.pointA ; 
		let ActorB_PointB = otherCollider.pointB ; 
		
		// si tous les test échoue, il à collision
		if(ActorA_PointB.x < ActorB_PointA.x) // right
			collision = false ; 
		if(ActorA_PointB.y < ActorB_PointA.y) // dowm 
			collision = false ; 
		if(ActorA_PointA.x > ActorB_PointB.x) // left 
			collision = false ; 
		if(ActorA_PointA.y > ActorB_PointB.y) // top
			collision = false ; 
			
		return collision ; 
			
	}
	
	verifCollisionTiles(tableauTile)
	{
		for(let i = 0 ; i < tableauTile.length ; i++)
		{
			if(this.actor.tileFeet == tableauTile[i])
				return true ; 
		}
		return false ;
	}
	
}

	