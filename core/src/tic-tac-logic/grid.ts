

export class Grid<CellT> {
    constructor(
        private _width: number,
        private _height: number,
        private _default: CellT,
        private _outOfBoundsBehavior: 'throw' | 'default' | ['get', CellT]
    ) {
        this._rows = [];
    }
    
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    
    private _rows: CellT[][];
    
    isOutOfBounds(x: number, y: number): boolean {
        return x < 0 || y < 0 || x >= this._width || y >= this._height;
    }
    get(x: number, y: number) {
        if (this.isOutOfBounds(x, y)) {
            if (this._outOfBoundsBehavior === 'throw') throw new Error(`Coordinates out of bounds! (${x}, ${y})`);
            else if (this._outOfBoundsBehavior === 'default') return this._default;
            else if (this._outOfBoundsBehavior[0] === 'get') return this._outOfBoundsBehavior[1];
            else throw new Error(`Not supported`);
        }
        
        var row = this._rows[y];
        if (!row || typeof(row[x]) === 'undefined') return this._default;
        return row[x];
    }
    set(x: number, y: number, val: CellT) {
        if (this.isOutOfBounds(x, y)) {
            throw new Error(`Coordinates out of bounds! (${x}, ${y})`);
        }
        
        var row = this._rows[y];
        if (!row) {
            if (val === this._default) return;
            row = this._rows[y] = [];
        }
        if (val !== this._default) {
            row[x] = val;
        }
        else {
            delete row[x];
        }
    }
}
