import { useContext } from 'react'
import NxtThemeContext from '../../Context'
import {
  FailureViewContainer,
  FailureImage,
  ErrorMessage,
  FailureCause,
  RetryButton,
} from './StyledComponents'

const FailureView = props => {
  const {onClickFunction, text} = props
  const onClickRetry = () => {
    onClickFunction()
  }
  const {isDarkTheme} = useContext(NxtThemeContext)
  return (
          <FailureViewContainer>
            <FailureImage
              src={
                isDarkTheme === 'dark'
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt="failure view"
            />
            <ErrorMessage theme={isDarkTheme}>
              Oops! Something Went Wrong
            </ErrorMessage>
            <FailureCause theme={isDarkTheme}>{text}</FailureCause>
            <RetryButton type="button" onClick={onClickRetry}>
              Retry
            </RetryButton>
          </FailureViewContainer>
        )
      }

export default FailureView
