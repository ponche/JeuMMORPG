class PlayerLogDebuger extends BehaviorComposant
{
	constructor()
	{
		super() ; 
		
		// Je peux appeler que this.actor après la création, utilisation interdit dans le constructeur 
		
	}
	update()
	{
			// Ajout position Arthur
		  this.ctx.fillText(`Arthur pos: ${this.actor.position.x}, ${arthur.position.y}`, 20, 140);
		  this.ctx.fillText(`Arthur posID: ${this.actor.positionMap.x}, ${arthur.positionMap.y}`, 20, 160);
		  this.ctx.fillText(`Arthur World: ${this.actor.positionWorld.x}, ${arthur.positionWorld.y}`, 20, 180);
		  this.ctx.fillText(`Arthur IdDecimal: ${this.actor.positionMapDecimal.x}, ${arthur.positionMapDecimal.y}`, 20, 200);
		  this.ctx.fillText(`Arthur IdTille: ${this.actor.tileFeet}`, 20, 240);
		  this.ctx.fillText(`Arthur positionZ: ${thisActor.positionZ}`, 20, 260);
	}
			
