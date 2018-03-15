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
        
        this.initAsync();
    }
    
    private async initAsync() {
        if (this._isInitialized) throw new Error(`This game has already been initialized!`);
        
        let result: boolean | void;
        result = await this.platformAdapter.init(this);
        if (!result) {
            console.error(`Platform adapter failed to initialize`);
            window.close();
        }
        
        this.platformAdapter.registerAbstractButtons(this.eventQueue);
        
        this._isInitialized = true;
        if (this._afterInit) {
            let ainit = this._afterInit;
            this._afterInit = null;
            ainit();
        }
    }
    
    private _isInitialized = false;
    private _afterInit: (() => void) | null;
    doAfterInit(act: () => void) {
        if (this._isInitialized) act();
        else {
            if (this._afterInit) {
                let ainit = this._afterInit;
                this._afterInit = () => {
                    ainit();
                    act();
                };
            }
            else this._afterInit = act;
        }
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
