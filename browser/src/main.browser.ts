import { GenericGame } from 'core';
import { BrowserPlatformAdapter } from './browser-platform-adapter';

(async function() {
    let adapter = new BrowserPlatformAdapter();
    let game = new GenericGame({
        framesPerSecond: 30,
        platformAdapter: adapter
    });
    await game.init();
    game.start();
})();
