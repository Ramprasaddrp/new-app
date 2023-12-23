import { useLocation } from 'react-router-dom'
import NxtThemeContext from '../../Context'
import {SideNavItem, NavItemText} from './StyledComponents'
import { useContext } from 'react'

const NavItem = props => {
  const {details} = props
  const location = useLocation()
  const active = location.pathname === details.path
  const {isDarkTheme} = useContext(NxtThemeContext)
        return (
          <SideNavItem theme={isDarkTheme} $active ={active.toString()} >
            <details.logo/>
            <NavItemText theme={isDarkTheme}>{details.text}</NavItemText>
          </SideNavItem>
        )
      }

export default NavItem