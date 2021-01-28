import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { MenuProps, SimpleMenu } from '../global/SimpleMenu';
import { routes } from '../../pages/routes';
import { AlioshaLink } from '../global/AlioshaLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function Header() {
  const classes = useStyles();

  const chordsMenu: MenuProps['items'] = [
    {
      title: 'Chords',
      link: routes.chordsEditor,
    },
    {
      title: 'Suggest',
      link: routes.chordsCreator,
    },
    {
      title: 'Saved progresions',
      link: routes.chordsSaved,
    },
  ];

  const melodyMenu: MenuProps['items'] = [
    {
      title: 'Melody',
      onClick: () => console.log('Melody'),
    },
    {
      title: 'MIDI',
      onClick: () => console.log('MIDI'),
    },
  ];

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Left>
            <AlioshaLink to={routes.root}>
              <Typography variant="h3">CyberAliosha</Typography>
            </AlioshaLink>
          </Left>
          <Right>
            <SimpleMenu title="Chords" items={chordsMenu} />
            <SimpleMenu title="Melody" items={melodyMenu} />
            <AlioshaLink to={routes.about}>
              <Button>About</Button>
            </AlioshaLink>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Right>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

const Container = styled.div`
  .MuiToolbar-root {
    justify-content: space-between;
  }
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  align-items: center;
`;
