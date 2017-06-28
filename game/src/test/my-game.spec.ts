/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

describe('MyGame', () => {
    it('should have one placeholder unit test', () => {
        expect(true).to.be.true;
    });
});
