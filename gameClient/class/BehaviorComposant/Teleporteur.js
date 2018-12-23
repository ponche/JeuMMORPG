import BehaviorComposant from "../BehaviorComposant.js" ; 

export class Teleporteur extends BehaviorComposant
{
  collision(otherActor)
  {
    if(otherActor.name == "Player")
      world.loadScene() ;

      
  }
}
