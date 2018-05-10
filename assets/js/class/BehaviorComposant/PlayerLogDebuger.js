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
			
			ctx.strokeStyles =  'red' ; 
			
		  ctx.fillText(`Player pos: ${this.actor.position.x}, ${this.actor.position.y}`, 20, 140);
		  
		  
		  // Affiche position actor 
		  ctx.beginPath() ; 
		  ctx.moveTo(this.actor.positionAbs.x, this.actor.positionAbs.y + 10 ) ; 
		  ctx.lineTo(this.actor.positionAbs.x , this.actor.positionAbs.y) ; 
		  ctx.lineTo(this.actor.positionAbs.x + 10 , this.actor.positionAbs.y) ; 
		  ctx.closePath() ; 
		  
		  ctx.stroke() ; 
	}  
	
}

			
