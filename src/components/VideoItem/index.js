import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'
import {VscCircleFilled} from 'react-icons/vsc'
import NxtThemeContext from '../../Context'
import {
  Video,
  VideoThumbnailImage,
  VideoDescriptionContainer,
  ViewsAndTimeContainer,
} from './StyledComponents'
import {Title, Name} from '../VideoThumbnail/StyledComponents'
import { useContext } from 'react'

const VideoItem = props => {
  const {details} = props
  const distance = formatDistanceToNow(new Date(details.publishedAt)).split(' ')
        const {isDarkTheme} = useContext(NxtThemeContext)
        return (
          <Link style={{textDecoration: 'none'}} to={`/videos/${details.id}`}>
            <Video>
              <VideoThumbnailImage
                src={details.thumbnailUrl}
                alt="video thumbnail"
              />
              <VideoDescriptionContainer>
                <Title theme={isDarkTheme}>{details.title}</Title>
                <Name theme={isDarkTheme}>{details.channel.name}</Name>
                <ViewsAndTimeContainer>
                  <Name>{details.viewCount} views</Name>
                  <Name theme={isDarkTheme} dot as="div">
                    <VscCircleFilled />
                  </Name>
                  <Name theme={isDarkTheme}>
                    {distance[1]} {distance[2]} ago
                  </Name>
                </ViewsAndTimeContainer>
              </VideoDescriptionContainer>
            </Video>
          </Link>
        )
      }

export default VideoItem