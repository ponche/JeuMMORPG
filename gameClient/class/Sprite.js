import './Collider.js';
import { ctx } from '../engine.js' ; 

export default class SpriteAnimation {
	constructor(actor, src, nbFrame = 1, nbAnimation = 1, buildCollider = true) {
		this.actor = actor

		this.nbAnimation = nbAnimation;
		this.nbFrame = nbFrame;
		this.currentFrame = 0;
		this.currentAnimation = 0;
		this.sprite = new Image();
		this.sprite.src = src

		this.delayFrame = 3 // plus le nombre est important plus le personnage va lentement ( "ne prend pas les décimal" )
		this.currentDelayFrame = 0
		this.loopAnimationSprite = true;
		this.reverseAnimation = false;
		this.runAnimationSprite = false;

		// Add Event Listerner 
		this.sprite.addEventListener('load', () => {
			this.hauteurActor = this.sprite.height / this.nbAnimation;
			this.largeurActor = this.sprite.width / this.nbFrame;
			this.offsetSprite = { x: 0, y: 0 };
			this.offsetSprite.x = (this.sprite.width / this.nbFrame) / 2;
			this.offsetSprite.y = this.sprite.height / this.nbAnimation;
			if (buildCollider) {
				let offsetPointA = { x: 0, y: 0 };
				let dimensionSprite = { x: 0, y: 0 };
				offsetPointA.x = - this.offsetSprite.x;
				offsetPointA.y = - this.offsetSprite.y;
				dimensionSprite.x = this.largeurActor;
				dimensionSprite.y = this.hauteurActor;
				this.actor.addCollider(offsetPointA, dimensionSprite);
			}

		}, false);

	}

	update() {
		if (this.runAnimationSprite) {
			if (this.reverseAnimation == false) {
				this.currentDelayFrame++
				if (this.currentDelayFrame >= this.delayFrame) {

					this.currentDelayFrame = - 1;

					if (this.currentFrame < this.nbFrame - 1)
						this.currentFrame++;

					if (this.currentFrame >= this.nbFrame - 1)
						if (this.loopAnimationSprite)
							this.currentFrame = 0;
				}
			}
			else {
				this.currentDelayFrame++
				if (this.currentDelayFrame >= this.delayFrame) {

					this.currentDelayFrame = - 1;

					if (this.currentFrame > - 1)
						this.currentFrame--;

					if (this.currentFrame <= - 1)
						if (this.loopAnimationSprite)
							this.currentFrame = this.nbFrame - 1;

				}
			}
		}
	}
	setAnimation(newAnimation) {
		if (this.currentAnimation != newAnimation) {
			this.currentAnimation = newAnimation;
            this.currentFrame = 0;
            // Condition a refaire. 
			if (this.currentAnimation >= this.nbAnimation) {
				console.log("Erreur pas d'animation trouvé");
				this.currentAnimation = 0;
			}
		}
	}
	loadSprite(src) {
		sprite.src = src;
	}
	render() {

		let spriteActor = this.sprite; // inutile de passer par une variable 

		let hauteurActor = spriteActor.height / this.nbAnimation;
		let largeurActor = spriteActor.width / this.nbFrame;

		let positionX = this.actor.position.x - (largeurActor / 2);
		let positionY = this.actor.position.y - hauteurActor;

		ctx.drawImage(spriteActor, this.currentFrame * largeurActor, this.currentAnimation * hauteurActor, largeurActor, hauteurActor, positionX, positionY, largeurActor, hauteurActor);

	}
}
