import BehaviorComposant from '../BehaviorComposant.js';

export default class ArcadeBody extends BehaviorComposant {
    constructor(arraySolideTile, actor) {
        super();

        this.actor = actor;

        // Creation d'une variable dans Actor pour pourvoir la commander de l'extérieur
        this.actor.arcadeBody = {};
        //this.actor.arcadeBody.systemCollisionTile = false ; // système desactiver. des adaptation a faire pour le remettre en route.
        this.actor.arcadeBody.systemCollisionActor = true;

        this.lastPosition = { x: -1, y: -1 };
        //this.arraySolideTile = arraySolideTile ;
    }

    updateAfterCalcul() {
        // Collision entre actor
        if (this.actor.arcadeBody.systemCollisionActor) {
            // On vérifié tous les actor
            for (let i = 0; i < listeActor.length; i++) {
                this.searchCollisionActor(this.actor, listeActor[i]);
            }
            // On met à jour la dernier position
            this.lastPosition.x = this.actor.positionRel.x;
            this.lastPosition.y = this.actor.positionRel.y;
        }
    }

    verifCollisionActor(actorA, actorB) {
        // Test de collision entre les 2 actor
        let collision = true;
        let ActorA_PointA = actorA.collider.pointA;
        let ActorA_PointB = actorA.collider.pointB;

        let ActorB_PointA = actorB.collider.pointA;
        let ActorB_PointB = actorB.collider.pointB;

        // si tous les test échoue, il a collision
        if (ActorA_PointB.x < ActorB_PointA.x)
            // right
            collision = false;
        if (ActorA_PointB.y < ActorB_PointA.y)
            // dowm
            collision = false;
        if (ActorA_PointA.x > ActorB_PointB.x)
            // left
            collision = false;
        if (ActorA_PointA.y > ActorB_PointB.y)
            // top
            collision = false;

        return collision;
    }

    searchCollisionActor(actorA, actorB) {
        // On vérifié tous les actor
        if (actorA !== actorB) {
            if (actorB.collider != undefined) {
                // Actor a bien une boite de collision  on fait le test
                if (this.verifCollisionActor(actorA, actorB)) {
                    if (actorB.collider.isSolid) {
                        // on le teleporte
                        actorA.positionRel.x = this.lastPosition.x;
                        actorA.positionRel.y = this.lastPosition.y;
                    } else actorB.collision(actorA);
                }
            }
        }

        // recursive pour les autre actor
        for (let i = 0; i < actorB.childrenActor.length; i++) {
            this.searchCollisionActor(actorA, actorB.childrenActor[i]);
        }
    }
}
