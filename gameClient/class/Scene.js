import Actor from './Actor.js';
import ArcadeBody from './BehaviorComposant/ArcadeBody.js';
import PlayerControlerKeyBoard from './BehaviorComposant/PlayerControlerKeyBoard.js';
import MapRenderer from './BehaviorComposant/MapRenderer.js';
import PlayerLogDebuger from './BehaviorComposant/PlayerLogDebuger.js';
import Teleporteur from './BehaviorComposant/Teleporteur.js';
import SpriteAnimation from './Sprite.js';
import '../engine.js';
import { keyboard } from '../engine.js';

export default class Scene {
	constructor(listeActor) {

		this.listeActor = listeActor;
		this.player = undefined;
	}

	loadScene() {
		// 1 - suppression de tous les actor
		this.deleteScene();
		// 2 - chargement des actor de la maps (idem fichier JSON)
		//this.listeActor = this.getPrefab(fileJson) ;
		// 3 - chagement de player en récupérant les information dans la class Player

		// Creation de la scene
		let map = this.addActor("Map", 600, 150);
		map.addBehavior(new MapRenderer());
		//map.addBehavior(new PlayerControlerKeyBoard(keyboard));

		// Player de test sera modifé par la suite
		let bodyPlayer = map.addChildActor("Player", 60, 240);
		bodyPlayer.animationSprite = new SpriteAnimation(bodyPlayer, "assets/img/sprites/characters/robot.png", 9, 8);
		bodyPlayer.animationSprite.runAnimationSprite = true;
		bodyPlayer.animationSprite.reverseAnimation = true
		// Ajoute des composant a acteur
		bodyPlayer.addBehavior(new PlayerControlerKeyBoard(keyboard));
		bodyPlayer.addBehavior(new ArcadeBody([22, 23], bodyPlayer, this));
		bodyPlayer.addBehavior(new PlayerLogDebuger(bodyPlayer));

		//Ajout Player comme enfant de Map
		//map.addChildActor(bodyPlayer) ;

		// Cactus de test
		let cactus = map.addChildActor("Cactus", 35, 80);
		cactus.addAnimationSprite("assets/img/sprites/objects/encens.png");
		cactus.addBehavior(new PlayerLogDebuger(cactus));
		cactus.addBehavior(new Teleporteur());
		// 4 - chargement des ghost Player (Node.js) c'est pas pour tout de suite
	}


	deleteScene() {
		// supprime la tileMap et la listeActor
		this.deleteAllActor();
	}
	addActor(name, x = 0, y = 0) {
		let newActor = new Actor(name);
		newActor.setPositionRel(x, y);
		this.listeActor.push(newActor);
		return newActor;
	}
	saveActor(actorOrigin) {

		let actor = {}

		// on fait un actor avec seulement la position et le contenu des behaviors
		actor.position = { ...actorOrigin.position };

		actor.childrenJson = [];
		actor.behaviorJson = [];

		// on parcour les actor enfants 
		actorOrigin.childrenActor.forEach(actorChild => {
			actor.childrenJson.push(this.saveActor(actorChild));

		});

		// on parcours les composant 
		actorOrigin.behavior.forEach(behavior => {
			// chaque Behavior overide la fonction stringify() pour faire du cas par cas
			let copyBehaviorJson = behavior.stringify();

			if (copyBehaviorJson.actor) {
				delete copyBehaviorJson.actor;
			}

			actor.behaviorJson.push(copyBehaviorJson);

		});

		actor.animationSpriteJson = { ...actorOrigin.animationSprite };
		actor.colliderJson = { ...actorOrigin.collider };

		return actor;
	}
	loadActor(parseObject) {
		let actor = parseObject;

		// manipulation sur Actor 

		// on crée la variable childrenActor 
		actor.childrenActor = [];
		actor.behavior = [];
		actor.collider = undefined;
		actor.animationSprite = undefined;



		//on parcour les enfants
		actor.childrenJson.forEach(child => {
			actor.childrenActor.push(this.loadActor(child));

			//on affecte le parent à actor 
			actor.parentActor = actor;
		});

		return actor;
	}

	getActor(name) {
		for (let i = 0; i < this.listeActor.length; i++) {
			if (this.listeActor[i].name == name)
				return this.listeActor[i];
			else {
				let actorFound = this.listeActor[i].getChilActor(name);
				if (actorFound != undefined)
					return actorFound;
			}

		}
		console.log("pas d'actor trouve pour " + name);
	}
	getListActor() {
		return this.listeActor;
	}


	deleteAllActor() {
		// Supprime tous les actor
		this.listeActor.splice(0, this.listeActor.length);
	}
	deleteActor(name) {
		// supprime actor en cherchant par le noms
		let actorFound = undefined;
		for (let i = 0; i < this.listeActor.length; i++) {
			if (this.listeActor[i].name == name) {
				actorFound = this.listeActor[i];
				this.listeActor.splice(i, 1);
				return actorFound;
			}
			else {
				actorFound = this.listeActor[i].deleteChildActor(name);
				if (actorFound != undefined)
					return actorFound;
			}
		}
		console.log("pas d'actor trouve pour " + name);
		return false;
	}
}
