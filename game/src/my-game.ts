import { Game, GameOptions } from 'engine';
import { StartScene } from './scenes/start.scene';

export class MyGame extends Game {
    constructor(opts?: GameOptions) {
        super(opts);
    }

    start() {
        super.start();
        this.changeScene(new StartScene());
    }
}
