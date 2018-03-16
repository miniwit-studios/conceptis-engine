import { Game, GameOptions } from 'engine';
import { StartScene } from './scenes/start/start.scene';
import { PlatformAdapter } from './platforms/platform-adapter';

export type GenericGameOptions = GameOptions & {
    platformAdapter: PlatformAdapter
};

export class GenericGame extends Game {
    constructor(opts: GenericGameOptions) {
        super(opts);
        
        this._platformAdapter = opts.platformAdapter;
    }
    
    private _isInitialized = false;
    async init(): Promise<void> {
        if (this._isInitialized) throw new Error(`This game has already been initialized!`);
        
        let result: boolean | void;
        result = await this.platformAdapter.init(this);
        if (!result) {
            console.error(`Platform adapter failed to initialize`);
            window.close();
        }
        
        this.platformAdapter.registerAbstractButtons(this.eventQueue);
        
        this._isInitialized = true;
    }
    
    private _platformAdapter: PlatformAdapter;
    get platformAdapter() {
        return this._platformAdapter;
    }
    
    start() {
        super.start();
        this.changeScene(new StartScene());
    }
}
