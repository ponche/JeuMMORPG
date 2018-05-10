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
		// 3 - chagement de player en récupérant les information dans la class Player
		
		// Creation de la scene 
		let map = world.addActor("Map" , 600, 150) ; 
		map.addBehavior( new MapRenderer()) ; 
		map.addBehavior( new PlayerControlerKeyBoard(tableauFleche)) ; 
		
		// Player de test sera modifé par la suite 
		let bodyPlayer = world.addActor("Player", 600, 300) ; 
		bodyPlayer.animationSprite = new SpriteAnimation(bodyPlayer, "assets/img/game/sprites/characters/robot.png", 9, 8 ) ;
		bodyPlayer.animationSprite.runAnimationSprite = true;
		bodyPlayer.animationSprite.reverseAnimation = true
		// Ajoute des composant a acteur 
		bodyPlayer.addBehavior( new PlayerControlerKeyBoard(tableauKey)) ; 
		bodyPlayer.addBehavior( new ArcadeBody([22, 23] , bodyPlayer)) ; 
		bodyPlayer.addBehavior( new PlayerLogDebuger()) ; 
		
		// Cactus de test 
		let cactus = world.addActor("Cactus", 800, 200) ; 
		cactus.addAnimationSprite("assets/img/game/sprites/objects/encens.png") ;
		cactus.addBehavior( new PlayerLogDebuger()) ; 
		// 4 - chargement des ghost Player (Node.js) c'est pas pour tout de suite
	}
	deleteScene()
	{
		// supprime la tileMap et la listeActor
		this.deleteAllActor() ; 
	}
	addActor(name, x, y)
	{
		// Ajout un actor en position Tuile 
		let newActor = new Actor(name, this) ;
		newActor.setPosition(x , y) ; 
		this.listeActor.push(newActor) ;
		return newActor ; 
	}
	getActor(name)
	{
		for(let i = 0 ;  i < this.listeActor.length ; i++)
		{
			if(listeActor[i].name == name)
				return listeActor[i] ; 
			
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
		for(let i = 0 ; i < listeActor.length ; i++)
		{
			if(listeActor[i].name == name)
			{
				this.listeActor.splice(i, 1) ;
				return true ;
			}
		}
		console.log("pas d'actor trouve pour " + name ) ;
		return false ; 
	}
	
	
	
	
	
	
}
