import BehaviorComposant from '../BehaviorComposant.js';
import '../Actor.js';

export default class PlayerControlerKeyBoard extends BehaviorComposant {
	constructor(keyboard) {
		super();
		// this.actor est mis dans la fonction addBehavior!!!
		this.keyboard = keyboard;
	}
	update() {
		let direction = { x: 0, y: 0 };
		if (this.keyboard.z)
			direction.y -= 0.5 * this.actor.speed;
		if (this.keyboard.s)
			direction.y += 0.5 * this.actor.speed;
		if (this.keyboard.q)
			direction.x -= 1 * this.actor.speed;
		if (this.keyboard.d)
			direction.x += 1 * this.actor.speed;

		this.actor.move(direction.x, direction.y);

		// if actor is a robot
		if (this.actor.animationSprite != undefined) {
			// Changement de animation
			if (direction.x > 0 && direction.y == 0)
				this.actor.animationSprite.setAnimation(3); // animation droite
			if (direction.x < 0 && direction.y == 0)
				this.actor.animationSprite.setAnimation(4);   //animation gauche
			if (direction.x == 0 && direction.y > 0)
				this.actor.animationSprite.setAnimation(6) // animation bas
			if (direction.x == 0 && direction.y < 0)
				this.actor.animationSprite.setAnimation(1); // animation haut

			if (direction.x < 0 && direction.y < 0)
				this.actor.animationSprite.setAnimation(0); // en haut a gauche
			if (direction.x > 0 && direction.y < 0)
				this.actor.animationSprite.setAnimation(2); // en haut a droite
			if (direction.x < 0 && direction.y > 0)
				this.actor.animationSprite.setAnimation(5); // en bas a gauche
			if (direction.x > 0 && direction.y > 0)
				this.actor.animationSprite.setAnimation(7);
		}
	}
}
