import { Button, FormHelperText, TextField } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import { Mutation, Query } from 'react-apollo';

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

const SignUpOverlay = () => {
  const [inputValues, changeValue] = useState({
    [InputField.EMAIL]: '',
    [InputField.PASSWORD]: '',
    [InputField.USERNAME]: '',
  });
  const [, dispatch] = useOverlayContext();

  const handleChange = (inputName: InputField) => (event: ChangeEvent<HTMLInputElement>) => {
    changeValue({ ...inputValues, [inputName]: event.currentTarget.value })
  }

  const [inputError, setInputError] = useState(false);

  const inputIsEmpty = (field: InputField) => inputValues[field] === '';

  const inputIsValid = () => inputValues[InputField.EMAIL] && inputValues[InputField.USERNAME] && inputValues[InputField.PASSWORD];
  
  return (
    <Overlay>
      <OverlayWidget
        title="Регистрация"
        actions={
          <UsersQuery query={GET_USER_BY_EMAIL} variables={{email: inputValues[InputField.EMAIL]}}>
            {
              ({data, error}) => (
                <InsertUserMutation mutation={INSERT_NEW_USER} variables={{
                  email: inputValues[InputField.EMAIL].toLocaleLowerCase(),
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
                            if (inputIsValid()) {
                              insertUser()
                                .then((response) => {
                                  if(response && response.data && response.data.insert_users.returning.length) {
                                    setUser(response.data.insert_users.returning[0]);
                                    dispatch(hideOverlay())
                                  }
                                });
                            }
                            setInputError(true);
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
          <UsersQuery query={GET_USER_BY_EMAIL} variables={{email: inputValues[InputField.EMAIL].toLocaleLowerCase()}}>
            {
              ({data, error}) => (
                <form noValidate autoComplete="off">
                  <TextField
                    required
                    fullWidth
                    autoFocus
                    error={!!error || inputIsEmpty(InputField.USERNAME)}
                    label={InputField.USERNAME}
                    value={inputValues[InputField.USERNAME]}
                    onChange={handleChange(InputField.USERNAME)}
                    margin="normal"
                  />
                  {
                    inputError && inputIsEmpty(InputField.USERNAME)
                      && <FormHelperText id="component-error-text">Поле обязательно для заполнения</FormHelperText>
                  }
                  <TextField
                    required
                    fullWidth
                    error={!!error || (data && data.users && data.users.length > 0) || inputIsEmpty(InputField.EMAIL)}
                    label={InputField.EMAIL}
                    value={inputValues[InputField.EMAIL]}
                    onChange={handleChange(InputField.EMAIL)}
                    margin="normal"
                  />
                  {
                    data && data.users && data.users.length > 0 
                      && <FormHelperText id="component-error-text">Пользователь с таким адресом уже существует</FormHelperText>
                  }
                  {
                    inputError && inputIsEmpty(InputField.EMAIL)
                      && <FormHelperText id="component-error-text">Поле обязательно для заполнения</FormHelperText>
                  }
                  <TextField
                    fullWidth
                    required
                    error={!!error || inputIsEmpty(InputField.PASSWORD)}
                    label={InputField.PASSWORD}
                    value={inputValues[InputField.PASSWORD]}
                    onChange={handleChange(InputField.PASSWORD)}
                    type="password"
                    margin="normal"
                  />
                  {
                    inputError && inputIsEmpty(InputField.PASSWORD)
                      && <FormHelperText id="component-error-text">Поле обязательно для заполнения</FormHelperText>
                  }
                </form>
              )
            }
          </UsersQuery>
        }
      />
    </Overlay>
  )
}

export default SignUpOverlay;
