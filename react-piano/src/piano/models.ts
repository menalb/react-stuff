export type BaseKey = {
    name: string;
}

export type WhiteKey = BaseKey & {
    kind: 'white';
}


export type BlackKey = BaseKey & {
    kind: 'black';
}

export type Octave = { notes: Key[], position: number; }

export type Key = WhiteKey | BlackKey;

export interface Note {
    name: string;
    octave: number;
}