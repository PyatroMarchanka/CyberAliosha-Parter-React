import { useContext } from 'react';
import styled from 'styled-components';

import { IconButton } from '@material-ui/core';
import BackspaceIcon from '@material-ui/icons/Backspace';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { chordsAdderStore } from '../../context/ChordsAdderContext';
import { Icon } from '../global/Icon';
import { SaveChordsModal } from './SaveChordsModal';
import { PlayStopButton } from '../global/PlayStopButton';
import { ChordModel } from '../../dataset/all_chords_for_impro';
import { usePlayMelodyAndChords } from '../../hooks/usePlayMelodyAndChords';
import { GuitarModeSwitcher } from './GuitarModeSwitcher';

interface Props {
  play?: boolean;
  deleteLast?: boolean;
  deleteAll?: boolean;
  chords: ChordModel[];
  onPlay?: (chords: ChordModel[]) => void;
  onStop?: (chords: ChordModel[]) => void;
}

export const Actions = ({ chords, onPlay, onStop }: Props) => {
  const { dispatch } = useContext(chordsAdderStore);

  const { handlePlaying, MPlayer, isPlaying } = usePlayMelodyAndChords({
    chords,
    onPlay,
    onStop,
  });

  const deleteAll = () => {
    dispatch({
      type: 'DELETE_ALL_CHORDS',
    });
  };

  const deleteLast = () => {
    dispatch({
      type: 'DELETE_LAST_CHORD',
    });
  };

  const buttonsDisabled = !chords.length || isPlaying;

  return (
    <ActionsContainer>
      <GuitarModeSwitcher />
      {!!chords && !!chords.length && (
        <PlayStopButton handlePlaying={handlePlaying} isPlaying={isPlaying} />
      )}
      <IconButton
        className='icon'
        disabled={buttonsDisabled}
        onClick={deleteLast}
      >
        <Icon
          type='material'
          Icon={BackspaceIcon}
          disabled={buttonsDisabled}
          className='play-icon'
        />
      </IconButton>
      <IconButton
        className='icon'
        disabled={buttonsDisabled}
        onClick={deleteAll}
      >
        <Icon
          type='material'
          Icon={DeleteForeverIcon}
          disabled={buttonsDisabled}
          className='play-icon  remove-all-icon'
        />
      </IconButton>
      <SaveChordsModal chords={chords} />
      {MPlayer}
    </ActionsContainer>
  );
};

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .icon {
    &.disabled {
      color: rgba(210, 210, 210, 0.3);
      fill: rgba(210, 210, 210, 0.3);
    }
  }

  .play-icon {
    width: 30px;
    height: 30px;
  }

  .remove-all-icon {
    width: 35px;
    height: 35px;
  }
`;
