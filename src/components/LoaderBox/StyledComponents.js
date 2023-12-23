import styled from 'styled-components'

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 87vh;
  width: 100%;
  background-color: ${props =>
    props.theme === 'dark' ? '#1e1e1f' : '#f9f9f9'};
`

export default LoaderContainer