import BehaviorComposant from '../BehaviorComposant.js';

export default class PlayerLogDebuger extends BehaviorComposant {
    constructor(actor) {
        super();

        this.actor = actor;

        // Création d'un objet debug pour modifier les valeur
        this.actor.debug = {};
        this.actor.debug.infoPos = false;
    }

    render() {
        // Ajout position Actor
        if (this.actor.debug.infoPos) {
            ctx.font = '12pt Calibri';
            ctx.fillStyle = 'white';
            ctx.fillText(
                `Player posRel: ${this.actor.position.x}, ${
                    this.actor.position.y
                }`,
                20,
                140
            );
            ctx.fillText(
                `Player posIso: ${this.actor.positionIso.x}, ${
                    this.actor.positionIso.y
                }`,
                20,
                160
            );
        }
        // Affiche origine actor
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.actor.position.x, this.actor.position.y + 10);
        ctx.lineTo(this.actor.position.x, this.actor.position.y);
        ctx.lineTo(this.actor.position.x + 10, this.actor.position.y);
        ctx.closePath();

        ctx.stroke();

        // Affiche la boite de collision
        if (this.actor.collider != undefined) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(
                this.actor.collider.pointA.x,
                this.actor.collider.pointA.y,
                this.actor.collider.dimensionBox.x,
                this.actor.collider.dimensionBox.y
            );
        }
    }
}
