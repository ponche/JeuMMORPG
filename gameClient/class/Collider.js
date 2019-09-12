import './Actor.js';

// c'est la class arcadeBody, qui calculera les collision pour les actors


export default class Collider {
	constructor(actor, offsetBox, dimensionBox) {
		this.actor = actor;

		this.offsetBox = offsetBox;
		this.dimensionBox = dimensionBox;

		this.pointA = { x: -1, y: -1 };
		this.pointB = { x: -1, y: -1 };

		this.isSolid = true; // mettre vrai pour faire des mur , false pour des trigger
	}

	updateAfterCalcul() {
		// mise à jour de la box de collision
		this.pointA.x = this.actor.position.x + this.offsetBox.x;
		this.pointA.y = this.actor.position.y + this.offsetBox.y;

		this.pointB.x = this.pointA.x + this.dimensionBox.x;
		this.pointB.y = this.pointA.y + this.dimensionBox.y;
	}
	update() {
	}
}
