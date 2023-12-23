import {Link} from 'react-router-dom'
import {FaMoon, FaBars} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import NxtThemeContext from '../../Context'
import Logout from '../Logout'
import {
  HeaderContainer,
  NxtLogo,
  NavContainer,
  ListItem,
  Button,
  Profile,
  ProfileIcon,
} from './StyledComponents'
import { useContext } from 'react'

const Header = () => {
      const context = useContext(NxtThemeContext)
      return (
        <>
          <HeaderContainer $modal={context.isDarkTheme} theme={context.isDarkTheme}>
            <ListItem>
              <Link to="/">
                <NxtLogo
                  alt="website logo"
                  src={
                    context.isDarkTheme === 'dark'
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                />
              </Link>
            </ListItem>
            <ListItem>
              <NavContainer>
                <ListItem>
                  <Button
                    data-testid="theme"
                    theme={context.isDarkTheme}
                    onClick={context.toggleTheme}
                    type="button"
                  >
                    {context.isDarkTheme === 'dark' ? <FiSun /> : <FaMoon />}
                  </Button>
                </ListItem>
                <ListItem>
                  <Profile
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                </ListItem>
                <ProfileIcon theme={context.isDarkTheme}>
                  <FaBars />
                </ProfileIcon>
                <ListItem>
                  <Logout />
                </ListItem>
              </NavContainer>
            </ListItem>
          </HeaderContainer>
        </>
      )
    }

export default Header