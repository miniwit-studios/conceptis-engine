import { EventQueue, AudioSourceObject } from 'engine';
import { GenericGame } from '../generic.game';

export abstract class PlatformAdapter {
    constructor() { }
    
    init(game: GenericGame): boolean | Promise<void | boolean> {
        this._game = game;
        return true;
    }
    initAfterGraphics(): boolean | Promise<void | boolean> {
        return true;
    }
    registerAbstractButtons(events: EventQueue) { }
    
    private _game: GenericGame;
    protected get game(): GenericGame {
        return this._game;
    }
}
