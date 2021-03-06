import React from 'react';
import styled from 'styled-components';
import { routes } from '../../pages/routes';
import { theme } from '../../utils/theme';
import { AlioshaLink } from '../global/AlioshaLink';

export const Logo = () => {
  return (
    <AlioshaLink to={routes.root}>
      <Container>
        <h1>Cyber</h1>
        <Line />
        <h1>Aliosha</h1>
      </Container>
    </AlioshaLink>
  );
};

const Container = styled.div`
  h1 {
    font-family: 'ArvoBold', sans-serif;
    font-size: 30px;
    color: ${theme.colors.bluePurple[500]};
    margin: 0 5px;
    text-align: center;

    @media ${theme.breakpoints.belowTabletM} {
      font-size: 20px;
    }
  }
`;

const Line = styled.div`
  height: 3px;
  background-color: ${theme.colors.bluePurple[500]};
`;
