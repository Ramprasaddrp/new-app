import styled from 'styled-components'

export const GamesContainer = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: column;
  height:100vh;
  background-color: ${props =>
    props.theme === 'dark' ? '#0f0f0f' : '#f9f9f9'};
  font-family: 'Roboto';
  overflow: hidden;
`
export const SideBarAndContentContainer = styled.div`
  display: flex;
`
export const GamesContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  @media (max-width: 769px) {
    width: 70vw;
    top: 15vh;
  }
  overflow: scroll;
  overflow-x: hiddenx;
  max-height: 100vh;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    display:none;
  }
  &::-webkit-scrollbar-thumb {
    background: gray; 
    border-radius: 10px;
    background-color: ${props =>
      props.theme === 'dark' ? '#f9f9f9' : '#1e1e1f'};
`
export const GamesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 50px;
  @media (max-width: 769px) {
    padding: 20px;
  }
`