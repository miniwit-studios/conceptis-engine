import { GameScene, Camera, GameObject } from 'engine';
import { TicTacLogicComponent, TicTacLogicPuzzle } from '../../tic-tac-logic';

export class TicTacLogicScene extends GameScene {
    constructor() {
        super();
    }
    
    private initialized = false;
    
    start() {
        super.start();
        
        if (this.initialized) return;
        this.initialized = true;
        
        let camera = this.camera = new Camera();
        camera.clearColor = 'rgb(240, 240, 240)';
        camera.maxZoomScale = 80;
        camera.zoomScale = 40;
        
        var puzzle = TicTacLogicPuzzle.easy6x6;
        var ticTacLogicObject = new GameObject({
            name: 'tic-tac-logic',
            spriteRenderer: null,
            components: [new TicTacLogicComponent({ puzzle })],
            x: -puzzle.width / 2,
            y: -puzzle.height / 2
        });
        this.addObject(ticTacLogicObject);
    }
}
