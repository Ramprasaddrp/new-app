import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Popup} from 'reactjs-popup'
import NxtThemeContext from '../../Context'
import {
  LogoutButton,
  ModalContainer,
  ModalButton,
  ModalText,
} from './StyledComponents'
import { useContext } from 'react'

const Logout = props => {
    const context = useContext(NxtThemeContext)
    const navigate = useNavigate();
      const redirectToLoginPage = () => {
        Cookies.remove('jwt_token')
        navigate('/login', { replace: true });
      }

      return (
        <Popup
          modal
          trigger={
            <LogoutButton type="button" theme={context.isDarkTheme}>
              Logout
            </LogoutButton>
          }
        >
          {close => (
            <ModalContainer theme={context.isDarkTheme}>
              <ModalText theme={context.isDarkTheme}>
                Are you sure, you want to logout
              </ModalText>
              <ModalButton onClick={() => close()} type="button">
                Cancel
              </ModalButton>
              <ModalButton
                $fill="fill"
                onClick={redirectToLoginPage}
                type="button"
              >
                Confirm
              </ModalButton>
            </ModalContainer>
          )}
        </Popup>
      )
}

export default Logout