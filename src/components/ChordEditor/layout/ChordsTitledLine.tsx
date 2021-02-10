import { Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import { theme } from '../../../utils/theme';
import { Button } from '../../global/Button';

interface Props {
  chords: ChordModel[];
  title?: string;
  onChordClick: (chord: ChordModel) => void;
}

export const ChordsTitledLine = ({ chords, title, onChordClick }: Props) => {
  return (
    <Container>
      {!!title && (
        <TitleWrapper>
          <Typography className="title" variant="h6">
            {title}
          </Typography>
          {/* <Line /> */}
        </TitleWrapper>
      )}
      <Chords>
        {chords.map((chord, idx) => (
          <Button
            key={`${chord[0]}-${idx}`}
            onClick={() => onChordClick(chord)}
          >{`${chord[0]}${chord[1]}`}</Button>
        ))}
      </Chords>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 10px 0 0;
  margin: 0 10px 0 0;
  &:not(:last-child) {
    border-right: 1px solid ${theme.colors.white};
  }

  .title {
    color: ${theme.colors.white};
  }
`;

const Chords = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TitleWrapper = styled.div`
  height: 75px;
  display: flex;
  min-width: 200px;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div`
  height: 2px;
  flex: 1;
  /* width: 40px; */
  background-color: ${theme.colors.white};
`;
