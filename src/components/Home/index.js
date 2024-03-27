import { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import {IoMdClose} from 'react-icons/io'
import {AiOutlineSearch} from 'react-icons/ai'
import NxtThemeContext from '../../Context'
import LoaderBox from '../LoaderBox'
import Header from '../Header'
import SideBar from '../SideBar'
import FailureView from '../FailureView'
import NoSearchResults from '../NoSearchResults'
import VideoThumbnail from '../VideoThumbnail'
import {
  HomeContainer,
  SideBarAndContentContainer,
  HomeContentContainer,
  BannerContainer,
  WebSiteLogo,
  BannerText,
  BannerTextContainer,
  GetButton,
  CloseIcon,
  MainContentContainer,
  SearchContainer,
  SearchInputElement,
  SearchButton,
  HomeVideosContainer,
} from './StyledComponents'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default function Home() {

  const [display, setDisplay] = useState(true)
  const [status, setStatus] = useState(apiStatus.loading)
  const [searchInput, setSearchInput] = useState('')
  const [homeVideosList, setHomeVideosList] = useState([])
  const context = useContext(NxtThemeContext)
  


  const updateData = data => ({
    name: data.channel_name,
    profileImageUrl: data.channel_profile_image_url,
    id: data.id,
    publishedAt: data.published_at,
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    viewCount: data.view_count,
  })

  

  useEffect(()=>{return()=>getHomeVideos()},[])


  const getHomeVideos = async () => {
    setStatus(apiStatus.loading)
    const url = "http://localhost:3001/"
    const response = await fetch(url)
    const fetchData = await response.json()
    console.log("ram")
    // const videoArray = []
    // const fetchedDetailsData = async(url, options)=>{
    //   const response = await fetch(url, options)
    //   const fetched = await response.json() 
    //   return fetched
    // }
    // for (let i=0; i< fetchData.length; i+= 1){
    //   const jwtToken = Cookies.get('jwt_token') 
    //   const {id} = fetchData[i]
    // const url = `https://apis.ccbp.in/videos/${id}`
    // const options = {
    //   method: 'GET',
    //   headers: {

    //     Authorization: `Bearer ${jwtToken}`,
    //   },
    // }
    // const data = await fetchedDetailsData(url, options)
    //    videoArray.push(data.video_details)

    // };
    // console.log(JSON.stringify(videoArray)) ......
    if (response.ok) {
      const updatedData = fetchData.map(eachItem =>
        updateData(eachItem),
      )
      setHomeVideosList(updatedData)
      setStatus(apiStatus.success)
    } else {
      setStatus(apiStatus.failure)
    }

    
  }

  const searchVideos = async()=>{
    const filteredVideos = homeVideosList.filter((eachItem)=>eachItem.title.includes(searchInput))
    setHomeVideosList(filteredVideos)
    console.log(filteredVideos)

  }

  const RetryRendering = () => {
    getHomeVideos()
  }

  const renderVideos = () => {
    const noOfVideos = homeVideosList.length
    return (
      <div>
        {noOfVideos === 0 ? (
          <NoSearchResults onClickFunction={RetryRendering} />
        ) : (
          <HomeVideosContainer theme={context.isDarkTheme}>
            {homeVideosList.map(eachItem => (
              <VideoThumbnail key={eachItem.id} details={eachItem} />
            ))}
          </HomeVideosContainer>
        )}
      </div>


    )
  }
 

  const renderSwitch = () => {
    switch (status) {
      case 'LOADING':
        return <LoaderBox />
      case 'SUCCESS':
        return renderVideos()
      case 'FAILURE':
        return (
          <FailureView
            text="We are having some trouble"
            onClickFunction={RetryRendering}
          />
        )
      default:
        return null
    }
  }
          return (
            <HomeContainer theme={context.isDarkTheme} data-testid="home">
              <Header/>
              <SideBarAndContentContainer>
                <SideBar />
                <HomeContentContainer>
                  <BannerContainer
                    data-testid="banner"
                    display={display ? 'display' : ''}
                  >
                    <BannerTextContainer>
                      <WebSiteLogo
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                      />
                      <BannerText>
                        Buy Nxt Watch Premium prepaid plans with UPI
                      </BannerText>
                      <GetButton type="button">GET IT NOW</GetButton>
                    </BannerTextContainer>
                    <CloseIcon
                      data-testid="close"
                      type="button"
                      onClick={()=>setDisplay(false)}
                    >
                      <IoMdClose />
                    </CloseIcon>
                  </BannerContainer>
                  <MainContentContainer>
                    <SearchContainer>
                      <SearchInputElement
                        theme={context.isDarkTheme}
                        type="search"
                        placeholder="Search"
                        value={searchInput}
                        onChange={(event)=>setSearchInput(event.target.value)}
                      />
                      <SearchButton
                        data-testid="searchButton"
                        theme={context.isDarkTheme}
                        type="button"
                        onClick={()=> searchVideos()}
                      >
                        <AiOutlineSearch />
                      </SearchButton>
                    </SearchContainer>
                    {renderSwitch()}
                  </MainContentContainer>
                </HomeContentContainer>
              </SideBarAndContentContainer>
            </HomeContainer>
          )
        }
