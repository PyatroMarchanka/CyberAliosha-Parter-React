import React, { useContext, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { theme } from '../../utils/theme';

import { ChordModel, NotesLengthType, PartNote } from '../../dataset/all_chords_for_impro';
import { Player } from '../../utils/Player';

import CreateMidiFile from '../../musicBrain/CreateMidiFile';
import MidiChordsCreator from '../../musicBrain/MidiChordsCreator';
import { SheetStave } from './SheetStave';
import { useLocation } from 'react-router-dom';
import { ChordsProgression } from '../../components/global/ChordsProgression';
import { Typography } from '@material-ui/core';
import { chordsAdderStore } from '../../context/ChordsAdderContext';
// @ts-ignore
import MIDISounds from 'midi-sounds-react';
import { MidiPlayer } from '../../utils/MidiPlayer';
import { Button } from '../../components/global/Button';

interface Props {}

export const MelodiesPage = () => {
  const location = useLocation();
  const chordsCreator = new MidiChordsCreator();
  const [chords, setChords] = useState<ChordModel[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    state: { bpm, notesLength, notesPattern },
  } = useContext(chordsAdderStore);

  const locationChords = (location.state as { chords: ChordModel[] } | undefined)?.chords;

  const fileEditor = new CreateMidiFile(chords);
  const [part, setPart] = useState<PartNote[][]>([]);
  const [PlayerInst] = useState<Player>(new Player());
  const [midiPlayer, setMidiPlayer] = useState<MidiPlayer | null>(null);

  const playerRef = useRef(null);

  const playPart = (loops: number = 2) => {
    midiPlayer?.playPartChords(chords);
    midiPlayer?.playPart(part.flat());
  };

  const generateChords = () => {
    const chords: ChordModel[] | undefined = chordsCreator.getNewCyclicChords(8);

    if (chords) {
      setChords(chords);
    }
  };

  const generateMelody = () => {
    const newPart = fileEditor.addPart({
      type: 'soprano',
      notesLength: notesLength,
      function: 'accompaniment',
      pattern: notesPattern,
      restProbability: 0,
    });

    setPart(newPart);
  };

  useEffect(() => {
    if (locationChords) {
      setChords(locationChords);
    } else {
      generateChords();
    }
  }, [location]);

  useEffect(() => {
    setMidiPlayer(new MidiPlayer(playerRef));
  }, [playerRef.current]);

  return (
    <Container>
      {chords.length > 0 && (
        <Chords>
          <ChordsProgression
            chords={chords}
            title={<Typography variant="h5">Chords for melody:</Typography>}
            onChordClick={Player.playChord}
          />
        </Chords>
      )}
      <SheetStave
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        stopMelody={() => midiPlayer?.stopAll()}
        playMelody={() => playPart(2)}
        generateMelody={generateMelody}
        generateChords={generateChords}
        chords={chords}
        bars={part}
      />
      <MIDISounds ref={playerRef} appElementName="root" instruments={[4]} />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: ${theme.colors.white};
`;

const Chords = styled.div`
  margin-bottom: 30px;
`;
