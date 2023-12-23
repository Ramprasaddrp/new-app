import styled from 'styled-components'

export const VideoItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${props =>
    props.theme === 'dark' ? '#0f0f0f' : '#f9f9f9'};
  overflow:hidden;
`

export const VideoItemAndSideBar = styled.div`
  display: flex;
`

export const VideoContainer = styled.div`
  padding: 30px;
  width: 84vw;
  height:88vh;
  overflow:scroll;
  background-color: ${props =>
    props.theme === 'dark' ? '#1e1e1f' : '#f9f9f9'};

    display: flex;
  flex-direction: column;
  @media (max-width: 769px) {
    width: 100%;
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


  }
`

export const Video = styled.div`
  display: flex;
  width: 100%;
  height: 60vh;
  border-radius: 25px;
  @media (max-width: 769px) {
    height: 40vw;
  }
`

export const HorizontalLine = styled.hr`
  width: 100%;
  border-top: 1px solid
    ${props => (props.theme === 'dark' ? '#94a3b8' : '#64748b')};
  margin: 0px;
`
export const SmallContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  align-items: ${props => (props.column ? 'flex-start' : 'center')};
  margin: 0px;
  justify-content: ${props =>
    props.spaceBetween ? 'space-between' : 'flex-start'};
`
export const LikeButton = styled.button`
  color: ${props =>
    props.like || props.save || props.isDislike ? '#2563eb' : '#64748b'};
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  padding: 10px 10px 0px 0px;
  align-items: center;
  @media (max-width: 769px) {
    font-size: 12px;
  }
`
export const ChannelLogo = styled.img`
  margin: 20px 20px 0px 0px;
  width: 60px;
  height: 60px;
  align-self: flex-start;
  @media (max-width: 769px) {
    width: 40px;
    height: 40px;
  }
`

export const Description = styled.p`
  color: ${props => (props.theme === 'dark' ? '#f1f5f9' : '#7e858e')};
  font-size: 20px;
  margin: 20px 0px 0px 0px;
  align-self: flex-start;
  @media (max-width: 769px) {
    font-size: 14px;
  }
`