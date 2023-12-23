import styled from 'styled-components'

export const TrendingVideosContainer = styled.div`
height: 100vh;
margin: 0px;
display: flex;
flex-direction: column;
background-color: ${props =>
  props.theme === 'dark' ? '#181818' : '#f9f9f9'};
font-family: 'Roboto';
overflow:hidden;
`
export const SideBarAndContentContainer = styled.div`
  display: flex;
`
export const TrendingVideosContentContainer = styled.div`
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
export const TrendingVideosBanner = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 20px 50px;
  background-color: ${props =>
    props.theme === 'dark' ? '#222222' : '#ebebeb'};
  @media (max-width: 769px) {
    padding: 20px;
  }
`
export const TrendingLogoContainer = styled.div`
  background-color: ${props =>
    props.theme === 'dark' ? '#0f0f0f' : '#d7dfe9'};
  width: 100px;
  height: 100px;
  border-radius: 50%;
  color: #ff0000;
  font-size: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 769px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
`
export const TrendingTitle = styled.h1`
  font-size: 40px;
  color: ${props => (props.theme === 'dark' ? '#ffffff' : '#000000')};
  margin-left: 30px;
  @media (max-width: 769px) {
    font-size: 20px;
    margin-left: 10px;
  }
`
export const TrendingVideosList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 50px;
  @media (max-width: 769px) {
    padding: 20px;
  }
`