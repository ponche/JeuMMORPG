class PlayerLogDebuger extends BehaviorComposant
{
	constructor(ctx)
	{
		super() ; 
		
		
	}
	update()
	{
			// Ajout position Actor
		  this.ctx.fillText(`Player pos: ${this.actor.position.x}, ${this.actor.position.y}`, 20, 140);
		  this.ctx.fillText(`Player posID: ${this.actor.positionMap.x}, ${this.actor.positionMap.y}`, 20, 160);
		  this.ctx.fillText(`Player World: ${this.actor.positionWorld.x}, ${this.actor.positionWorld.y}`, 20, 180);
		  this.ctx.fillText(`Player IdDecimal: ${this.actor.positionMapDecimal.x}, ${this.actor.positionMapDecimal.y}`, 20, 200);
		  this.ctx.fillText(`Player IdTille: ${this.actor.tileFeet}`, 20, 240);
		  this.ctx.fillText(`Player positionZ: ${this.actor.positionZ}`, 20, 260);
	}
}

			
