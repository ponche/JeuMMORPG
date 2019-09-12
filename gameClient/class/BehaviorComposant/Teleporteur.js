import BehaviorComposant from '../BehaviorComposant.js';
import '../Actor.js';

export default class Teleporteur extends BehaviorComposant {
  collision(otherActor) {
    if (otherActor.name == "Player")
      world.loadScene();


  }
}
