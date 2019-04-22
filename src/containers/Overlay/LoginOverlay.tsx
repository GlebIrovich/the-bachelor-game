import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import Overlay from '.';
import { LOADING_ICON_SIZE } from '../../constants/styles';
import { hideOverlay, showOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { OverlayKey, User } from '../../models';
import { LOGIN, LoginQueryVariables } from '../../queries';
import { setUser } from '../../services';
import OverlayWidget from './OverlayWidget';

enum InputField {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
}

const StyledProgress = styled(CircularProgress)`
  margin-right: 0.5em !important;
`;

const LoginOverlay: FC<WithApolloClient<{}> & RouteComponentProps> = ({client, history}) => {
  const [inputValues, changeValue] = useState({
    [InputField.EMAIL]: '',
    [InputField.PASSWORD]: '',
  });
  const [, dispatch] = useOverlayContext();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  function login() {
    setLoading(true)
    client.query<{users: User[]}, LoginQueryVariables>({
      query: LOGIN,
      variables: {
        email: inputValues[InputField.EMAIL].toLocaleLowerCase(),
        password: inputValues[InputField.PASSWORD],
      } 
    }).then(({data: {users}}) => {
      setLoading(false);
      if(users.length) {
        setUser(users[0]);
        dispatch(hideOverlay())
      } else {
        setError(true);
      }
    })
  }

  const handleChange = (inputName: InputField) => (event: ChangeEvent<HTMLInputElement>) => {
    changeValue({ ...inputValues, [inputName]: event.currentTarget.value })
  }

  function signUp() {
    dispatch(showOverlay(OverlayKey.SIGN_UP));
  }
  
  return (
    <Overlay>
      <OverlayWidget
        title="Аккаунт"
        message="Войди в систему"
        onCancel={() => history.push('/')}
        actions={
          <Button variant="contained" color="primary" fullWidth onClick={login}>
            {loading && <StyledProgress size={LOADING_ICON_SIZE}/>}
            Войти
          </Button>
        }
        secondaryActions={
          <Button variant="outlined" color="primary" fullWidth onClick={signUp}>
            Зарегистрироваться
          </Button>
        }
        content={
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              autoFocus
              error={error}
              label={InputField.EMAIL}
              value={inputValues[InputField.EMAIL]}
              onChange={handleChange(InputField.EMAIL)}
              margin="normal"
            />
            <TextField
              fullWidth
              error={error}
              label={InputField.PASSWORD}
              value={inputValues[InputField.PASSWORD]}
              onChange={handleChange(InputField.PASSWORD)}
              type="password"
              margin="normal"
            />
          </form>
        }
      />
    </Overlay>
  )
}

export default withRouter(withApollo(LoginOverlay))
