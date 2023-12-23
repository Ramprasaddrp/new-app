import {Link} from 'react-router-dom'

import NxtThemeContext from '../../Context'
import {GameItem, GameThumbnailImage} from './StyledComponents'
import {Title, Name} from '../VideoThumbnail/StyledComponents'
import { useContext } from 'react'

const Game = props => {
  const {details} = props
        const {isDarkTheme} = useContext(NxtThemeContext)
        return (
          <Link style={{textDecoration: 'none'}} to={`/videos/${details.id}`}>
            <GameItem>
              <GameThumbnailImage
                src={details.thumbnailUrl}
                alt="video thumbnail"
              />
              <Title theme={isDarkTheme}>{details.title}</Title>
              <Name theme={isDarkTheme}>
                {details.viewCount} Watching Worldwide
              </Name>
            </GameItem>
          </Link>
        )
      }

export default Game