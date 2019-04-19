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

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const StyledAppBar = styled(AppBar)`
  position: relative !important;
`;

const Navbar: FC<RouteComponentProps> = ({history}) => {
  const [open, toggleOpen] = React.useState(false);
  const elementRef = React.useRef(null);

  function handleClose(event: any) {
    if ((elementRef as any).current.contains(event.target)) {
      return;
    }

    toggleOpen(false);
  }
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6" color="inherit">
          Kekopolia
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
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList>
                        <MenuItem onClick={handleClose}>Аккаунт</MenuItem>
                        <MenuItem onClick={() => history.push('/')}>Выход</MenuItem>
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
