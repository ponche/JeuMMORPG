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

		this.money = 10000 ;

		this.sword = undefined ;
		this.shield = undefined ;
		this.hat = undefined ;
		this.shoes = undefined ;

		// Position du spawm du joueur lors du chargement de la Maps
		this.positionSpawm = {x: 5, y: 5} ;
	}
	recevoirDegats(puissance)
	{
		let defenseTotal = this.defense ;
		if(this.shield != undefined)
		{
			// prise en compte du bouclier
		}
		let coeffDegats = puissance / defenseTotal ;
		this.vie -= puissance * coeffDegats ;
	}

}
