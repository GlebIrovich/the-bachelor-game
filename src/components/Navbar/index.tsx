import {
  AppBar,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { FC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import { EGG_SHELL } from '../../constants';
import { removeUser } from '../../services';

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const StyledAppBar = styled(AppBar)`
  box-shadow: none !important;
  background-color: ${EGG_SHELL} !important;
`;

interface Props {
  gameName: string;
}

const Navbar: FC<RouteComponentProps & Props> = ({ history, gameName }) => {
  const [open, toggleOpen] = React.useState(false);
  const elementRef = React.useRef(null);

  function handleClose(event: any) {
    if ((elementRef as any).current.contains(event.target)) {
      return;
    }
    toggleOpen(false);
  }

  function logOut() {
    history.push('/');
    removeUser();
  }
  return (
    <StyledAppBar position="static" color="default">
      <StyledToolbar>
        <Typography variant="h6" color="default">
          {gameName}
        </Typography>
        <div>
          <IconButton
            buttonRef={elementRef}
            color="inherit"
            aria-label="Menu"
            onClick={() => toggleOpen(!open)}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
          >
            <MenuIcon />
          </IconButton>
          <Popper open={open} anchorEl={elementRef.current} transition>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper color="default">
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      <MenuItem onClick={() => history.push('/')}>Выход из игры</MenuItem>
                      <MenuItem onClick={logOut}>Выход из аккаунта</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default withRouter(Navbar)
