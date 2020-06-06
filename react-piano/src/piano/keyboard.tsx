import React, { useReducer, useState, useEffect, useCallback } from 'react';
import SingleKey from './single-key';
import './keyboard.css'
import { Key, Octave, Note } from './models';
import * as Tone from 'tone'
import MidiKeyboard from './midi-key';


const Keyboard = () => {

    const emptyPlaingnotes: Note[] = [];
    const [keysLayout, setKeysLayout] = useState(layout);
    const [playingNotes, setPlayingNotes] = useState(emptyPlaingnotes);

    const DeActivate = (note: Note) => {
        setPlayingNotes(playingNotes.filter(x => x.name !== note.name && x.octave! == note.octave));
    }

    useEffect(() => {

        console.log(playingNotes);
        setKeysLayout(keysLayout
            .map(x => {
                if (playingNotes.find(note => x.note.name === note.name && x.note.octave === note.octave)) {
                    return { ...x, isActive: true }
                }
                return { ...x, isActive: false }
            }))

    }, [playingNotes])

    const play = (note: Note) => {
        var synth = new Tone.Synth().toMaster()
        synth.triggerAttackRelease(note.name + note.octave, '8n');
        setPlayingNotes([...playingNotes, note]);
    }
    return <div>
        <MidiKeyboard onPlayedNote={(note) => play(note)} />
        <ul className="board">
            {
                keysLayout.map((x, index) => <span key={index}>
                    <li key={index} className={x.key.kind} >
                        <SingleKey
                            name={x.key.name}
                            note={{ name: x.key.name, octave: x.octave }}
                            play={x.isActive}
                            onClick={() => play(x.note)}
                            onDeActivate={(note) => DeActivate(note)}

                        />
                    </li>
                </span>)
            }
        </ul>
        <div>
            {JSON.stringify(playingNotes)}
        </div>
    </div>
}

const buildNote = (key: Key, octave: number): Note => ({ name: key.name, octave: octave })

type layoutConfig = ({ key: Key, octave: number, note: Note, isActive: boolean })[];

const keysConfig: Key[] = [
    { kind: 'white', name: 'C' },
    { kind: 'black', name: 'C#' },
    { kind: 'white', name: 'D' },
    { kind: 'black', name: 'D#' },
    { kind: 'white', name: 'E' },
    { kind: 'white', name: 'F' },
    { kind: 'black', name: 'F#' },
    { kind: 'white', name: 'G' },
    { kind: 'black', name: 'G#' },
    { kind: 'white', name: 'A' },
    { kind: 'black', name: 'A#' },
    { kind: 'white', name: 'B' }];

const octavesConfig: Octave[] = [
    { notes: keysConfig, position: 3 },
    { notes: keysConfig, position: 4 },
    { notes: keysConfig, position: 5 },
]

const layout: layoutConfig =
    octavesConfig
        .flatMap(acc =>
            acc.notes.map(a => (
                {
                    key: a,
                    octave: acc.position,
                    note: buildNote(a, acc.position),
                    isActive: false
                })))

export default Keyboard