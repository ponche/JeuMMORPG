# JeuMMORPG

petit tentative de création d'un jeu MMORPG, le but final de la création n'est pas le jeu en lui même. 
mais les problème rencontrer, et de tomber sur des Os afin d'apprendre en rencontrant des problème et en trouvant des solution. 

## structure des dossier 

voici les dossier principale : 
- **gameClient** : dossier contenant tous le code envoyé au client 
- **gameServeur** : dossier contenant tous le code du serveur Node.js 
- **vendor** : dossier des librairie externe 

## organisation du code  

dans la jeu les **Actor** sont tous les actor du jeu(maps, personnage, arbre animer, etc ) un **Actor** seul sans les **BehaviorComposant** ne fait rien du tout.  

chaque **Actor** peut avoir des **Actor** enfant qui auront la position relative par rapport à **Actor** parent. 

pour rajouter des fonctionnalité sur **Actor** il faut lui rattacher un **BehaviorComposant** ( class abstraite ) qui sert de base. 
tout les fonctionnalité seront dérivé de la *class* **BehaviorComposant** cette class possede plusieurs méthode qui seront executer dans cette ordre : 
1. update() -- fonction de mise a jour du composant lancer tous les 50 fois par seconde 
2. updateAfterCalcul() -- idem que la update, mais ce code sera exectuer après que tous les actor on fait leurs update() ; 
3. render()  -- fonction d'affichage , code qui permet affichage dans la vue ( canvas ) 

il existe une méthode qui sera executer au moment d'une collision avec un Actor si le compososant correspondant est rattacher à Actor et activé

- collision(actor) -- cette fonction devra etre définir dans le composant, au moment de la collision cette fonction sera appeler et on recupera actor qui est rentrer en collision 

## liste des BehaviorComposant 

- **ArcadeBody** : composant a ratacher si on veut que actor detecte les collsion avec les autres Actor ( attention de ne pas en abuser, ça consome )
- **Teleporteur** : composant qui permet de teleporter un Actor quand il rentre en collsion avec, (attention, il faut rajouter les composant qui gere les collision) 
- **PlayerLogDebuger** : class utiliser seulement pour le débug, (permet de voir les box de collision, les info position d'un acteur. 
- **PlayerControlerKeyBoard** : class qui permet de géré le déplacement d'un actor grace au touche du clavier 
- **MapRenderer** : class qui gere le rendu d'une map 

