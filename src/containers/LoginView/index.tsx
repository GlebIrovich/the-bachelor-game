import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';

import PageLayout from '../../components/PageLayout';
import { User } from '../../models';
import { LOGIN, LoginQueryVariables } from '../../queries';
import { setUser } from '../../services';

enum InputField {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
}

const LoginView = ({client, history}: WithApolloClient<{}> & RouteComponentProps) => {
  const [inputValues, changeValue] = useState({
    [InputField.EMAIL]: '',
    [InputField.PASSWORD]: '',
  });

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
        history.push('/');
      } else {
        setError(true);
      }
    })
  }

  const handleChange = (inputName: InputField) => (event: ChangeEvent<HTMLInputElement>) => {
    changeValue({ ...inputValues, [inputName]: event.currentTarget.value })
  }
  return (
    <PageLayout>
      <form noValidate autoComplete="off">
        {loading && <Typography>Loading</Typography>}
        <Grid container justify="center">
          <Grid item xs={7}>
            <TextField
              fullWidth
              autoFocus
              error={error}
              label={InputField.EMAIL}
              value={inputValues[InputField.EMAIL]}
              onChange={handleChange(InputField.EMAIL)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              error={error}
              label={InputField.PASSWORD}
              value={inputValues[InputField.PASSWORD]}
              onChange={handleChange(InputField.PASSWORD)}
              type="password"
              margin="normal"
            />
          </Grid>
          <Grid item xs={7}>
            <Button variant="outlined" color="primary" fullWidth onClick={login}>
              Войти
            </Button>
          </Grid>
        </Grid>
      </ form>
    </PageLayout>
  )
}

export default withRouter(withApollo(LoginView))
