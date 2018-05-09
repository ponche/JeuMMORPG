class Scene 
{
	constructor(listeActor, ctx )
	{
		this.ctx = ctx ; 
				
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
		let map = world.addActor("Map" , 200, 200) ; 
		map.addBehavior( new MapRenderer(this.ctx)) ; 
		map.addBehavior( new PlayerControlerKeyBoard(tableauFleche)) ; 
		
		// Player de test sera modifé par la suite 
		let bodyPlayer = world.addActor("Player", 200, 200) ; 
		bodyPlayer.animationSprite = new SpriteAnimation(bodyPlayer) ;
		bodyPlayer.animationSprite.runAnimationSprite = true;
		//arthur.animationSprite.reverseAnimation = true;
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
	addActor(name, x, y)
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
