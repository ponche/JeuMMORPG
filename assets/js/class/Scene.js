class Scene 
{
	constructor(listeActor, ctx )
	{
		this.tileMap = [14, 23, 23, 23, 23, 23, 23, 23, 23, 13, 21, 32, 33, 33, 28, 33, 33, 33, 31, 20, 21, 34, 1, 1, 34, 18, 22, 17, 34, 20, 21, 34, 1, 1, 34, 16, 23, 19, 34, 20, 21, 25, 33, 33, 24, 33, 33, 33, 27, 20, 21, 25, 33, 33, 24, 33, 33, 33, 27, 20, 21, 34, 1, 1, 34, 1, 1, 1, 34, 20, 21, 34, 1, 1, 34, 1, 1, 1, 34, 20, 21, 29, 33, 33, 26, 33, 33, 33, 30, 20, 11, 22, 22, 22, 22, 22, 22, 22, 22, 12]
		this.gridSize = Math.sqrt(this.tileMap.length); 
		this.tileStartX = 0 ; 
		this.tileStartY = 0 ;  
		// Tous la partie du haut est à transféré dans le composant MapRenderer 
		
		
		// les element de la scene . 
		this.listeActor = listeActor ; // temporaire pour les tests 
		this.ctx = ctx ; 
		
		// Référence au player pour stocker les information du joueur. 
		this.player = undefined ; 
		
	}
	
	loadScene(fileJson)
	{
		// 1 - suppression de tous les actor 
		this.deleteScene() ; 
		// 1 - chargement de la (map fichier JSON)
		// 2 - chargement des actor de la maps (idem fichier JSON) 
		// 3 - chagement de player en récupérant les information dans la class Player
		
		// Player de test sera modifé par la suite 
		let bodyPlayer = world.addActor("Player", 5, 5) ; 
		bodyPlayer.animationSprite = new SpriteAnimation(bodyPlayer) ;
		bodyPlayer.animationSprite.runAnimationSprite = true;
		bodyPlayer.animationSprite.nbAnimation = 8 ;
		bodyPlayer.animationSprite.nbFrame = 9 ;
		bodyPlayer.animationSprite.reverseAnimation = true
		// Ajoute des composant a acteur 
		bodyPlayer.addBehavior( new PlayerControlerKeyBoard(tableauKey)) ; 
		bodyPlayer.addBehavior( new ArcadeBody([22, 23] , bodyPlayer)) ; 
		bodyPlayer.addBehavior( new PlayerLogDebuger(this.ctx)) ; 
		
		// 4 - chargement des ghost Player (Node.js) c'est pas pour tout de suite
	}
	deleteScene()
	{
		// supprime la tileMap et la listeActor
		this.deleteAllActor() ; 
	}
	addActor(name, x, y, actorMapRender)
	{
		// Ajout un actor en position Tuile 
		let newActor = new Actor(name, this) ;
		newActor.setPositionGrid(x , y) ; 
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
		this.listeActor = [] ; 
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
