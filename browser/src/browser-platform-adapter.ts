import { EventQueue, KeyboardAbstractButtonProvider, GamepadAbstractButtonProvider } from 'engine';
import { JourneyTdGame, PlatformAdapter } from 'core';

export class BrowserPlatformAdapter extends PlatformAdapter {
    constructor() {
        super();
    }
    
    async init(game: JourneyTdGame) {
        let result = await super.init(game);
        if (!result) return false;
        
        return true;
    }
    
    registerAbstractButtons(events: EventQueue) {
        super.registerAbstractButtons(events);
        
        let kbProvider = new KeyboardAbstractButtonProvider(events);
        events.addAbstractButtonProvider(kbProvider);
        
        kbProvider.bindAbstractButton('up', 'ArrowUp', 'KeyW');
        kbProvider.bindAbstractButton('left', 'ArrowLeft', 'KeyA');
        kbProvider.bindAbstractButton('down', 'ArrowDown', 'KeyS');
        kbProvider.bindAbstractButton('right', 'ArrowRight', 'KeyD');
        
        kbProvider.bindAbstractButton('restart', 'KeyR', 'KeyK');
        
        kbProvider.bindAbstractButton('zoom-in', 'Equal'); //Actually Plus, but the code is Equal
        kbProvider.bindAbstractButton('zoom-out', 'Minus');
        
        kbProvider.bindAbstractButton('select', 'Enter', 'Space');
        kbProvider.bindAbstractButton('return', 'Escape');
        
        let gpProvider = new GamepadAbstractButtonProvider(events);
        events.addAbstractButtonProvider(gpProvider);
        
        gpProvider.bindAbstractButton('up', 'DPadUp', 'LeftStickUp');
        gpProvider.bindAbstractButton('left', 'DPadLeft', 'LeftStickLeft');
        gpProvider.bindAbstractButton('down', 'DPadDown', 'LeftStickDown');
        gpProvider.bindAbstractButton('right', 'DPadRight', 'LeftStickRight');
        
        gpProvider.bindAbstractButton('restart', 'Y');
        
        gpProvider.bindAbstractButton('zoom-in', 'TriggerRight', 'TriggerRightAlt');
        gpProvider.bindAbstractButton('zoom-out', 'TriggerLeft', 'TriggerLeftAlt');
        
        gpProvider.bindAbstractButton('select', 'A');
        gpProvider.bindAbstractButton('return', 'B');
    }
}
