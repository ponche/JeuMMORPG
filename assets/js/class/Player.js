class Player
{
	constructor()
	{
		// attributs joueur
		this.name = "Arthur" 
		this.vie = 200 ; 
		this.mana = 100 ; 
		this.force = 20 ; 
		this.defense = 10 ; 
		this.magie = 5 ; 
		this.esprit = 2 ; 
		
		this.xp = 0 ; 
		this.level = 1 ; 
		
		this.money = 10 000 ; 
		
		this.sword = undefined ; 
		this.shield = undefined ; 
		this.hat = undefined ; 
		this.shoes = undefined ; 
		
		
		
	}
	recevoirDegats(puissance)
	{
		let defenseTotal = this.defense ; 
		if(this.bouclier != undefined)
		{
			// prise en compte du bouclier 
		}
		let coeffDegats = puissance / defenseTotal ; 
		this.vie -= puissance * coeffDegats ; 
	}
	
	
	

		
}
