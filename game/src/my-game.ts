import { Game } from 'engine';
import { StartScene } from './scenes/start.scene';

export class MyGame extends Game {
    constructor(framesPerSecond = 30) {
        super(framesPerSecond);
    }

    start() {
        super.start();
        this.changeScene(new StartScene());
    }
}
