import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'

import {VscCircleFilled} from 'react-icons/vsc'
import {BiDislike, BiLike} from 'react-icons/bi'
import {CgPlayListAdd} from 'react-icons/cg'

import {formatDistanceToNow} from 'date-fns'

import SideBar from '../SideBar'
import Header from '../Header'
import LoaderBox from '../LoaderBox'
import FailureView from '../FailureView'

import NxtThemeContext from '../../Context'
import {
  VideoItemDetailsContainer,
  VideoItemAndSideBar,
  VideoContainer,
  Video,
  SmallContainer,
  HorizontalLine,
  LikeButton,
  ChannelLogo,
  Description,
} from './StyledComponents'
import {Name, Title} from '../VideoThumbnail/StyledComponents'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default function VideoItemDetails() {

  const [videoDetails, setVideoDetails] = useState({})
  const [status, setStatus] = useState(apiStatus.loading)
  const [time, setTime] = useState('')
  const [isLiked, setLike] = useState(false)
  const [isDisliked, setDislike] = useState(false)
  const [save, setSave] = useState(false)
  const {id} = useParams()
  const context = useContext(NxtThemeContext)
  const theme = context.isDarkTheme

  const getVideoDetails = async () => {
    setStatus(apiStatus.loading)
    const jwtToken = Cookies.get('jwt_token')
    const url = `http://localhost:3001/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    
    const data = await response.json()
    const fetchedData = data
    if (response.ok) {
      const updatedData = {
        name: fetchedData.channel_name,
        profileImageUrl: fetchedData.channel_profile_image_url,
        subscriberCount: fetchedData.subscriber_count,
        description: fetchedData.description,
        id: fetchedData.id,
        publishedAt: fetchedData.published_at,
        thumbnailUrl: fetchedData.thumbnail_url,
        title: fetchedData.title,
        videoUrl: fetchedData.video_url,
        viewCount: fetchedData.view_count,
      }
      const a = formatDistanceToNow(new Date(updatedData.publishedAt)).split(
        ' ',
      )
      setVideoDetails(updatedData)
      setStatus(apiStatus.success)
      setTime(`${a[1]} ${a[2]} ago`)
      const saved = context.savedVideos.find(eachItem=> eachItem.id === updatedData.id)
      if (saved){
        setSave(!save)
      }

    } else {
      setStatus(apiStatus.failure)
    }
  }
  useEffect(()=>{return ()=>getVideoDetails()},[])

  const renderVideo = () => {
    const onClickSave = () => {
      context.addToSavedVideos(videoDetails)
      setSave(!save)
    }
    return (
      <VideoContainer theme={theme}>
        <Video>
          <ReactPlayer
            width="100%"
            height="100%"
            url={videoDetails.videoUrl}
            controls
          />
        </Video>
        <Title theme={theme}>{videoDetails.title}</Title>
        <SmallContainer spaceBetween = {true}>
          <SmallContainer>
            <Name>{videoDetails.viewCount} views</Name>
            <Name dot = {true}>
              <VscCircleFilled />
            </Name>
            <Name>{time}</Name>
          </SmallContainer>
          <SmallContainer>
            <LikeButton onClick={()=>setLike(!isLiked)} like={isLiked? "like":""} type="button">
              <BiLike />
              <p>Like</p>
            </LikeButton>
            <LikeButton
              onClick={()=>setDislike(!isLiked)}
              isDislike={isLiked? "dislike": ""}
              type="button"
            >
              <BiDislike />
              <p>Dislike</p>
            </LikeButton>
            <LikeButton onClick={onClickSave} save={save} type="button">
              <CgPlayListAdd />
              <p>{save?"saved": "save"}</p>
            </LikeButton>
          </SmallContainer>
        </SmallContainer>
        <HorizontalLine />
        <SmallContainer>
          <ChannelLogo
            src={videoDetails.profileImageUrl}
            alt="channel logo"
          />
          <SmallContainer column = {true}>
            <Title theme={theme}>{videoDetails.name}</Title>
            <Name theme={theme}>
              {videoDetails.subscriberCount} Subscribers
            </Name>
            <Description theme={theme}>{videoDetails.description}</Description>
          </SmallContainer>
        </SmallContainer>
      </VideoContainer>
    )
  }

  const switchRender = () => {
    switch (status) {
      case 'LOADING':
        return <LoaderBox />
      case 'SUCCESS':
        return renderVideo()
      case 'FAILURE':
        return <FailureView />
      default:
        return null
    }
  }
          
          return (
            <VideoItemDetailsContainer
              data-testid="videoItemDetails"
            >
              <Header/>
              <VideoItemAndSideBar>
                <SideBar />
                {switchRender()}
                
              </VideoItemAndSideBar>
            </VideoItemDetailsContainer>
          )
        }
