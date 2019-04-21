import { Button, FormHelperText, TextField } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import { Mutation, Query, withApollo, WithApolloClient } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';

import Overlay from '.';
import { hideOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { User } from '../../models';
import {
  GET_USER_BY_EMAIL,
  GetUserByEmailQueryVariables,
  INSERT_NEW_USER,
  InsertNewUserMutationVariables,
} from '../../queries';
import { setUser } from '../../services';
import OverlayWidget from './OverlayWidget';

enum InputField {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
}

class UsersQuery extends Query<{users: User[]}, GetUserByEmailQueryVariables>{}

interface Data {
  insert_users: {
    returning: [User];
  }
}

class InsertUserMutation extends Mutation<Data, InsertNewUserMutationVariables>{}

const SignUpOverlay: FC<WithApolloClient<{}> & RouteComponentProps> = ({client, history}) => {
  const [inputValues, changeValue] = useState({
    [InputField.EMAIL]: '',
    [InputField.PASSWORD]: '',
    [InputField.USERNAME]: '',
  });
  const [, dispatch] = useOverlayContext();

  const handleChange = (inputName: InputField) => (event: ChangeEvent<HTMLInputElement>) => {
    changeValue({ ...inputValues, [inputName]: event.currentTarget.value })
  }
  
  return (
    <Overlay>
      <OverlayWidget
        title="Регистрация"
        onCancel={() => history.push('/')}
        actions={
          <UsersQuery query={GET_USER_BY_EMAIL} variables={{email: inputValues[InputField.EMAIL]}}>
            {
              ({data, error}) => (
                <InsertUserMutation mutation={INSERT_NEW_USER} variables={{
                  email: inputValues[InputField.EMAIL],
                  username: inputValues[InputField.USERNAME],
                  password: inputValues[InputField.PASSWORD],
                }}>
                  {
                    (insertUser) => {
                      return (
                        <Button
                          variant="outlined"
                          color="primary"
                          fullWidth
                          onClick={() => {
                            insertUser()
                              .then((response) => {
                                if(response && response.data && response.data.insert_users.returning.length) {
                                  setUser(response.data.insert_users.returning[0]);
                                  dispatch(hideOverlay())
                                }
                              });
                          }}
                          disabled={!!error || !!(data && data.users && data.users.length > 0)}
                        >
                          Зарегистрироваться
                        </Button>
                      )
                    }
                  }
                </InsertUserMutation>
              )
            }
          </UsersQuery>
        }
        content={
          <UsersQuery query={GET_USER_BY_EMAIL} variables={{email: inputValues[InputField.EMAIL]}}>
            {
              ({data, error}) => (
                <form noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    autoFocus
                    error={!!error}
                    label={InputField.USERNAME}
                    value={inputValues[InputField.USERNAME]}
                    onChange={handleChange(InputField.USERNAME)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    error={!!error || (data && data.users && data.users.length > 0)}
                    label={InputField.EMAIL}
                    value={inputValues[InputField.EMAIL]}
                    onChange={handleChange(InputField.EMAIL)}
                    margin="normal"
                  />
                  {
                    data && data.users && data.users.length > 0 
                      && <FormHelperText id="component-error-text">Пользователь с таким адресом уже существует</FormHelperText>
                  }
                  <TextField
                    fullWidth
                    error={!!error}
                    label={InputField.PASSWORD}
                    value={inputValues[InputField.PASSWORD]}
                    onChange={handleChange(InputField.PASSWORD)}
                    type="password"
                    margin="normal"
                  />
                </form>
              )
            }
          </UsersQuery>
        }
      />
    </Overlay>
  )
}

export default withRouter(withApollo(SignUpOverlay))
