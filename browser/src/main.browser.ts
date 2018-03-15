import { GenericGame } from 'core';
import { BrowserPlatformAdapter } from './browser-platform-adapter';

let adapter = new BrowserPlatformAdapter();
let game = new GenericGame({
    framesPerSecond: 30,
    platformAdapter: adapter
});
game.doAfterInit(() => game.start());
