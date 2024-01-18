import { useContext, useEffect, useState} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import NxtThemeContext from '../../Context'
import {
  GamesContainer,
  SideBarAndContentContainer,
  GamesContentContainer,
  GamesList,
} from './StyledComponents'

import Header from '../Header'
import SideBar from '../SideBar'
import LoaderBox from '../LoaderBox'
import Game from '../Game'
import {
    TrendingVideosBanner,
    TrendingLogoContainer,
    TrendingTitle,
} from '../Trending/StyledComponents'
import FailureView from '../FailureView'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default function Gaming () {
  const [gamesList, setGamesList] = useState([])
  const [status, setStatus] = useState(apiStatus.loading)
  const {isDarkTheme} = useContext(NxtThemeContext)

  useEffect( ()=>{getGamingVideos()}, [])

  const updateData = data => ({
    id: data.id,
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    viewCount: data.view_count,
  })

  const getGamingVideos = async () => {
    setStatus(apiStatus.loading)
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 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',
      },
    }
    const url = 'http://localhost:3001/games'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedData = data.map(eachItem => updateData(eachItem))
      setStatus(apiStatus.success)
      setGamesList(fetchedData)
    } else {
      setStatus(apiStatus.failure)
    }
  }

  const switchRender = () => {
    switch (status) {
      case 'LOADING':
        return <LoaderBox />
      case 'SUCCESS':
        return (
          <GamesContentContainer theme={isDarkTheme}>
            <TrendingVideosBanner data-testid="banner" theme={isDarkTheme}>
              <TrendingLogoContainer theme={isDarkTheme}>
                <SiYoutubegaming />
              </TrendingLogoContainer>
              <TrendingTitle theme={isDarkTheme}>Gaming</TrendingTitle>
            </TrendingVideosBanner>
            <GamesList>
              {gamesList.map(eachItem => (
                <Game key={eachItem.id} details={eachItem} />
              ))}
            </GamesList>
          </GamesContentContainer>
        )
      case 'FAILURE':
        return (
          <FailureView
            text="We are having some trouble"
            onClickFunction={() => getGamingVideos()}
          />
        )
      default:
        return null
    }
  }
          return (
            <GamesContainer theme={isDarkTheme} data-testid="gaming">
              <Header />
              <SideBarAndContentContainer>
                <SideBar />
                {switchRender()}
              </SideBarAndContentContainer>
            </GamesContainer>
          )
        }
