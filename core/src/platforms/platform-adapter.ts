import { EventQueue, AudioSourceObject } from 'engine';
import { JourneyTdGame } from '../journey-td.game';

export abstract class PlatformAdapter {
    constructor() { }
    
    init(game: JourneyTdGame): boolean | Promise<void | boolean> {
        this._game = game;
        return true;
    }
    initAfterGraphics(): boolean | Promise<void | boolean> {
        return true;
    }
    registerAbstractButtons(events: EventQueue) { }
    
    private _game: JourneyTdGame;
    protected get game(): JourneyTdGame {
        return this._game;
    }
}
