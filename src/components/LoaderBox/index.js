import { Bars as Loader } from 'react-loader-spinner';
import LoaderContainer from './StyledComponents'
import { useContext } from 'react';
import NxtThemeContext from '../../Context';

const LoaderBox = () => {
  const context = useContext(NxtThemeContext)
  return(
  <LoaderContainer theme={context.isDarkTheme} data-testid="loader">
    <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
  </LoaderContainer>
)}

export default LoaderBox