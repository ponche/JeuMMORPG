class PlayerLogDebuger extends BehaviorComposant
{
	constructor()
	{
		super() ; 
		
		
		
	}
	render()
	{
			// Ajout position Actor
		ctx.font = '12pt Calibri';
		ctx.fillStyle = 'white';	
		ctx.fillText(`Player pos: ${this.actor.position.x}, ${this.actor.position.y}`, 20, 140);
		  
		  
		  // Affiche origine actor 
		  ctx.strokeStyle =  'blue' ; 
		  ctx.beginPath() ; 
		  ctx.moveTo(this.actor.positionAbs.x, this.actor.positionAbs.y + 10 ) ; 
		  ctx.lineTo(this.actor.positionAbs.x , this.actor.positionAbs.y) ; 
		  ctx.lineTo(this.actor.positionAbs.x + 10 , this.actor.positionAbs.y) ; 
		  ctx.closePath() ; 
		  
		  ctx.stroke() ; 
		  
		  // Affiche la boite de collision 
		  if(this.actor.collider != undefined ) 
		  {
			  ctx.strokeStyle = 'red' ; 
			  ctx.strokeRect(this.actor.collider.pointA.x , this.actor.collider.pointA.y , this.actor.collider.dimensionBox.x, this.actor.collider.dimensionBox.y) ; 
			  
		  }
		  
		  
	}  
	
}

			
