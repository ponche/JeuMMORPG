class Scene 
{
	constructor()
	{
		this.tileMap = [14, 23, 23, 23, 23, 23, 23, 23, 23, 13, 21, 32, 33, 33, 28, 33, 33, 33, 31, 20, 21, 34, 1, 1, 34, 18, 22, 17, 34, 20, 21, 34, 1, 1, 34, 16, 23, 19, 34, 20, 21, 25, 33, 33, 24, 33, 33, 33, 27, 20, 21, 25, 33, 33, 24, 33, 33, 33, 27, 20, 21, 34, 1, 1, 34, 1, 1, 1, 34, 20, 21, 34, 1, 1, 34, 1, 1, 1, 34, 20, 21, 29, 33, 33, 26, 33, 33, 33, 30, 20, 11, 22, 22, 22, 22, 22, 22, 22, 22, 12]
		this.gridSize = Math.sqrt(this.tileMap.length); 
		this.listeActor = [] ; 
		this.tileStartX = 0 ; 
		this.tileStartY = 0 ; 
		
	}
	
	loadScene(fileJson)
	{
		// chargement de la map 
	}
	deleteScene()
	{
		// supprime la tileMap et la listeActor 
	}
	addActor(x, y)
	{
		// Ajout un actor en position Tuile 
	}
	addActorCanvas(x, y) 
	{
	}
	deleteAllActor()
	{
		// Supprime tous les actor 
		this.listeActor.splice(0, this.listeActor.length) ; 
	}
	
	
	
	
	
}
