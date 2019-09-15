import './Actor.js';

// Class Abtraire, permet de faire les composant personnalité (script)  des Actor en dérivant de cette class. 

export default class BehaviorComposant {
	update() { };
	collision(actorCollision) { };
	updateAfterCalcul() { };
	render() { };

}
