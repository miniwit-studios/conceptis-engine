import { Component, ComponentOptions, GraphicsAdapter, Context2dGraphicsAdapter } from 'engine';
import { TicTacLogicPuzzle, Symbol as TicTacLogicSymbol } from './tic-tac-logic.puzzle';
import merge = require('lodash.merge');

export type TicTacLogicComponentOptions = ComponentOptions & {
    puzzle: TicTacLogicPuzzle
};

const puzzleBorderStyle = 'rgb(220, 220, 220)';
const puzzleBorderThickness = .3;
const puzzleBackgroundStyle = 'white';
const puzzleForegroundStyle = 'black';
const puzzleGridStyle = 'rgb(180, 180, 180)';

const symbolFontSize = .8;
const symbolFontFamily = 'Cambria';
const symbolOffsetX = 0;
const symbolOffsetY = .06;

export class TicTacLogicComponent extends Component {
    constructor(opts: TicTacLogicComponentOptions) {
        super(merge({}, opts, {
            shouldRender: true
        }));
        
        this._puzzle = opts.puzzle;
        (<any>window).puzzle = opts.puzzle;
    }
    
    private _puzzle: TicTacLogicPuzzle;
    
    render(adapter: GraphicsAdapter) {
        super.render(adapter);
        
        if (adapter instanceof Context2dGraphicsAdapter) this.renderContext2d(adapter);
        else throw new Error(`Unknown graphics adapter`);
    }
    
    private getForegroundCharacter(sym: TicTacLogicSymbol): string | null {
        switch (sym) {
        case 'x':
            return '\u2715';
        case 'o':
            return '\u25ef';
        default:
            return null;
        }
    }
    
    private renderContext2d(adapter: Context2dGraphicsAdapter) {
        let context = adapter.context;
        
        context.fillStyle = puzzleBorderStyle;
        context.strokeStyle = 'none';
        context.fillRect(-puzzleBorderThickness, -puzzleBorderThickness, this._puzzle.width + (puzzleBorderThickness * 2), this._puzzle.height + (puzzleBorderThickness * 2));
        
        context.fillStyle = puzzleBackgroundStyle;
        context.strokeStyle = 'none';
        context.fillRect(0, 0, this._puzzle.width, this._puzzle.height);
        
        context.fillStyle = 'orange';
        context.strokeStyle = puzzleGridStyle;
        context.lineWidth = 1 / this.scene.camera.zoomScale;
        context.beginPath();
        for (let q = 0; q <= this._puzzle.width; q++) {
            context.moveTo(q, 0);
            context.lineTo(q, this._puzzle.height);
        }
        for (let w = 0; w <= this._puzzle.height; w++) {
            context.moveTo(0, w);
            context.lineTo(this._puzzle.width, w);
        }
        context.stroke();
        
        context.fillStyle = puzzleForegroundStyle;
        context.strokeStyle = 'none';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = `${symbolFontSize}px ${symbolFontFamily}`;
        for (let q = 0; q < this._puzzle.width; q++) {
            for (let w = 0; w < this._puzzle.height; w++) {
                var sym = this._puzzle.get(q, w);
                var fgChr = this.getForegroundCharacter(sym);
                if (!fgChr || fgChr === ' ') continue;
                
                context.fillText(fgChr, q + .5 + symbolOffsetX, w + .5 + symbolOffsetY);
            }
        }
    }
}
