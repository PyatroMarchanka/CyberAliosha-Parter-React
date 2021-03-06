import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/Header/Header';
import { AboutPage } from './AboutPage';
import { MainPage } from './MainPage';
import { routes } from './routes';
import { MelodiesPage } from './Melodies/MelodiesPage';
import { theme } from '../utils/theme';
import Footer from '../components/Footer/Footer';
import { SavedPage } from './SavedPage';
import { ChordEditorPage } from './Chords/ChordEditorPage';
import { TestPage } from './TestPage';

export default function MainRouter() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Body>
        <Switch>
          <Redirect exact from='/' to={routes.chordsEditor} />
          <Route path={routes.test}>
            <TestPage />
          </Route>
          <Route path={routes.chordsEditor}>
            <ChordEditorPage />
          </Route>
          <Route path={routes.melodyEditor}>
            <MelodiesPage />
          </Route>
          <Route path={routes.saved}>
            <SavedPage />
          </Route>
          <Route path={routes.about}>
            <AboutPage />
          </Route>
          <Route path={routes.root}>
            <MainPage />
          </Route>
        </Switch>
        <Footer />
      </Body>
    </Router>
  );
}

const Body = styled.div`
  /* background-color: #60656f; */
  background-color: ${theme.colors.white};
  border-radius: 2px;
  overflow: hidden;
  /* -webkit-box-shadow: 0px 5px 15px 0px #333333;
  box-shadow: 0px 5px 15px 0px #333333; */
  margin-top: 30px;
`;

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${theme.colors.white};
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 50px;

    @media ${theme.breakpoints.belowTabletM} {
      padding: 0 10px;
    }

  }
`;
