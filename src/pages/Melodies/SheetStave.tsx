import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ChordModel, PartNote } from '../../dataset/all_chords_for_impro';
import { VexFlowController } from '../../musicViews/VexFlowController';

interface Props {
  bars: PartNote[][];
  chords?: ChordModel[];
  backgroundColor?: string;
}

export const SheetStave = ({ bars, chords, backgroundColor }: Props) => {
  const ref = useRef(null);
  const [staves, setStaves] = useState<VexFlowController | null>(null);

  useEffect(() => {
    if (staves && bars.length > 0) {
      staves.drawAll(bars, chords);
    } else {
      staves?.clear();
    }
  }, [bars, chords, staves]);

  useEffect(() => {
    if (ref.current && !staves) {
      setStaves(new VexFlowController(ref));
    }
  }, [staves]);

  return (
    <Container>
      <StaveContainer backgroundColor={backgroundColor}>
        <div className={bars.length > 0 ? 'stave' : ''} ref={ref} id='vf'></div>
      </StaveContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0;
`;

const StaveContainer = styled.div<{ backgroundColor?: string }>`
  display: flex;
  justify-content: center;

  .stave {
    background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'unset')};
    padding: 20px;

    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;
