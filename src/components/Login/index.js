import { useState} from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import { useContext } from 'react'

import Cookies from 'js-cookie'

import NxtThemeContext from "../../Context"

import {
  LoginContainer,
  LoginForm,
  NxtWedLogo,
  InputLabel,
  UserInput,
  CheckboxContainer,
  CheckboxLabel,
  InputCheckBox,
  LoginButton,
  ErrorMsg,
} from "./StyledComponents"

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [displayPassword, setDisplayPassword] = useState(false)
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const context = useContext(NxtThemeContext)
  const navigate = useNavigate();

  const updateUsername = event => {
    setUsername(event.target.value)
  }

  const updatePassword = event => {
    setPassword(event.target.value)
  }

  const submitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    });
    navigate('/', { replace: true });
  };
  

  const submitFailure = errorMsg => {
    setDisplayErrorMsg(true)
    setErrorMsg(errorMsg)
  }

  const postLoginDetails = async event => {
    event.preventDefault()
    const userDetails = {
      username,
      password,
    }
    console.log(password)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      submitSuccess(data.jwt_token)
    } else {
      submitFailure(data.error_msg)
    }
  }

  const togglePasswordDisplay = () => {
    setDisplayPassword(!displayPassword)
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }
    
  return (
            <LoginContainer
              theme={context.isDarkTheme}
              onSubmit={postLoginDetails}
            >
              <LoginForm theme={context.isDarkTheme}>
                <NxtWedLogo
                  src={
                    context.isDarkTheme === 'dark'
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
                <InputLabel theme={context.isDarkTheme} htmlFor="user_name">
                  USERNAME
                </InputLabel>
                              <UserInput
                                theme={context.isDarkTheme}
                                type="text"
                                id="user_name"
                                onChange={updateUsername}
                                value={username}
                                placeholder="Username"
                              />
                <InputLabel theme={context.isDarkTheme} htmlFor="password">
                  PASSWORD
                </InputLabel>
                <UserInput
                  theme={context.isDarkTheme}
                  type={displayPassword ? 'text' : 'password'}
                  id="password"
                  onChange={updatePassword}
                  value={password}
                  placeholder="Password"
                />
                <CheckboxContainer>
                  <InputCheckBox
                    id="show-password"
                    type="checkbox"
                    onClick={togglePasswordDisplay}
                  />
                  <CheckboxLabel theme={context.isDarkTheme} htmlFor="show-password">
                    Show Password
                  </CheckboxLabel>
                </CheckboxContainer>
                <LoginButton type="submit">Login</LoginButton>
                {displayErrorMsg && <ErrorMsg>*{errorMsg}</ErrorMsg>}
              </LoginForm>
            </LoginContainer>
          )
  }
