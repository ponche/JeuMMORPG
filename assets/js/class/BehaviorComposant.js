// Class Abtraire, permet de faire les composant personnalité (script)  des Actor en dérivant de cette class. 

class BehaviorComposant 
{
	constructor()
	{
		console.log("constructeur BehaviorComposant") ; 	
	}
	update() {} ; 
	collision(actorCollision) {} ; 
	clickMouse(x, y) {} ; 
	updateAfterCalcul() {} ; 
	
}

	