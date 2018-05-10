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
		  //ctx.fillText(`Player posID: ${this.actor.positionMap.x}, ${this.actor.positionMap.y}`, 20, 160);
		  //ctx.fillText(`Player World: ${this.actor.positionWorld.x}, ${this.actor.positionWorld.y}`, 20, 180);
		  //ctx.fillText(`Player IdDecimal: ${this.actor.positionMapDecimal.x}, ${this.actor.positionMapDecimal.y}`, 20, 200);
		  //ctx.fillText(`Player IdTille: ${this.actor.tileFeet}`, 20, 240);
		  //ctx.fillText(`Player positionZ: ${this.actor.positionZ}`, 20, 260);
	}  
	
}

			
