import { Grid } from './grid';

export type Symbol = 'x' | 'o' | ' ';
export function isSymbol(str: string): str is Symbol {
    return str === 'x' || str === 'o' || str === ' ';
}

export class TicTacLogicPuzzle {
    constructor(
        private _width: number,
        private _height: number
    ) {
        if (_width <= 0 || isNaN(_width) || _height <= 0 || isNaN(_height)) throw new Error(`Invalid puzzle dimensions`);
        
        this._symbols = new Grid<Symbol>(_width, _height, ' ', 'throw');
        this._fixed = new Grid<boolean>(_width, _height, false, 'throw');
    }
    
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    
    static create(solution: string): TicTacLogicPuzzle {
        let lines = solution.split(/\r?\n/).filter(Boolean);
        
        let height = lines.length;
        if (height == 0) throw new Error(`No rows in solution`);
        
        let width = lines[0].length / 2;
        if (lines.some(line => line.length != width * 2)) throw new Error(`Inconsistent or invalid row width`);
        
        let puzzle = new TicTacLogicPuzzle(width, height);
        
        for (let w = 0; w < height; w++) {
            let line = lines[w];
            for (let q = 0; q < width; q++) {
                let symbol = line[q * 2];
                if (!isSymbol(symbol)) throw new Error(`Invalid puzzle symbol: '${symbol}'`);
                let isFixed = line[(q * 2) + 1] === '*';
                puzzle.set(q, w, symbol);
                if (isFixed) {
                    puzzle.fix(q, w);
                }
            }
        }
        
        return puzzle;
    }
    
    private _symbols: Grid<Symbol>;
    private _fixed: Grid<boolean>;
    
    get(x: number, y: number): Symbol {
        return this._symbols.get(x, y);
    }
    set(x: number, y: number, val: Symbol) {
        if (this.isFixed(x, y)) throw new Error(`Can't set the value of a fixed position!`);
        this._symbols.set(x, y, val);
    }
    
    isFixed(x: number, y: number): boolean {
        return this._fixed.get(x, y);
    }
    fix(x: number, y: number) {
        this._fixed.set(x, y, true);
    }
    
    static easy6x6 = TicTacLogicPuzzle.create('\
  x*x*      \
          o*\
x*    o*    \
  o*        \
    x*  o*  \
        o*  ');
    
    static easy8x10 = TicTacLogicPuzzle.create('\
        o*      \
  x*    o*      \
      x*        \
x*              \
x*            o*\
        o*    o*\
            x*  \
                \
  x*    o*    x*\
o*x*            ');
    
    static easy10x14 = TicTacLogicPuzzle.create('\
      o*            \
  x*x*      x*  x*  \
        o*          \
          x*        \
  o*  o*          o*\
x*              x*  \
      o*  o*        \
      o*    x*      \
            x*    o*\
x*  o*    x*        \
  x*  x*            \
              o*o*  \
        o*          \
    o*    x*x*  x*  ');
}
