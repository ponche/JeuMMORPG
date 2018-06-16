class Scene
{
	constructor(listeActor)
	{


		this.listeActor = listeActor ; // temporaire pour les test



		// Référence au player
		this.player = undefined ;

	}

	loadScene(fileJson)
	{
		// 1 - suppression de tous les actor
		this.deleteScene() ;
		// 2 - chargement des actor de la maps (idem fichier JSON)
		//this.listeActor = this.getPrefab(fileJson) ;
		// 3 - chagement de player en récupérant les information dans la class Player

		// Creation de la scene
		let map = world.addActor("Map" , 600, 150) ;
		map.addBehavior( new MapRenderer()) ;
		map.addBehavior( new PlayerControlerKeyBoard(tableauFleche)) ;

		// Player de test sera modifé par la suite
		let bodyPlayer = map.addChildActor("Player",  60, 240) ;
		bodyPlayer.animationSprite = new SpriteAnimation(bodyPlayer, "gameClient/assets/img/sprites/characters/robot.png", 9, 8 ) ;
		bodyPlayer.animationSprite.runAnimationSprite = true;
		bodyPlayer.animationSprite.reverseAnimation = true
		// Ajoute des composant a acteur
		bodyPlayer.addBehavior( new PlayerControlerKeyBoard(tableauKey)) ;
		bodyPlayer.addBehavior( new ArcadeBody([22, 23] , bodyPlayer)) ;
		bodyPlayer.addBehavior( new PlayerLogDebuger(bodyPlayer)) ;

		//Ajout Player comme enfant de Map
		//map.addChildActor(bodyPlayer) ;

		// Cactus de test
		let cactus = world.addActor("Cactus", 600, 200) ;
		cactus.addAnimationSprite("gameClient/assets/img/sprites/objects/encens.png") ;
		cactus.addBehavior( new PlayerLogDebuger(cactus)) ;
		// 4 - chargement des ghost Player (Node.js) c'est pas pour tout de suite
	}
	addPrefab(fileJson)
	{
	}
	getPrefab(fileJson)
	{
		// prepare la requete syncrone, temporaire je la transformerais en insynchrone .
		xhr.open("GET", "http://localhost/JeuMMORPG/gameClient/" + fileJson , false) ;
		// Envoi de la requette
		xhr.send() ;
		console.log(xhr.responseText) ;

		return undefined ; // plus tard
	}
	testJson(actor)
	{

	}

	deleteScene()
	{
		// supprime la tileMap et la listeActor
		this.deleteAllActor() ;
	}
	addActor(name, x = 0, y = 0)
	{
		let newActor = new Actor(name) ;
		newActor.setPositionRel(x , y) ;
		this.listeActor.push(newActor) ;
		return newActor ;
	}
	getActor(name)
	{
		for(let i = 0 ;  i < this.listeActor.length ; i++)
		{
			if(listeActor[i].name == name)
				return listeActor[i] ;
			else
			{
				let actorFound = listeActor[i].getChilActor(name) ;
				if(actorFound != undefined)
					return actorFound ;
			}

		}
		console.log("pas d'actor trouve pour " + name ) ;
	}

	addActorCanvas(x, y)
	{
		// cette fois ci en position canvas
	}
	deleteAllActor()
	{
		// Supprime tous les actor
		this.listeActor.splice(0, this.listeActor.length) ;
	}
	deleteActor(name)
	{
		// supprime actor en cherchant par le noms
		let actorFound = undefined ;
		for(let i = 0 ; i < listeActor.length ; i++)
		{
			if(listeActor[i].name == name)
			{
				actorFound = listeActor[i] ;
				this.listeActor.splice(i, 1) ;
				return actorFound ;
			}
			else
			{
				actorFound = listeActor[i].deleteChildActor(name);
				if(actorFound != undefined)
					return actorFound ; 
			}
		}
		console.log("pas d'actor trouve pour " + name ) ;
		return false ;
	}
}
