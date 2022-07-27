import Axios from 'axios';
import React, {useEffect, useState} from 'react'
import './FavoritePage.css';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {

  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    // 내가 favorite한 영화 정보를 가져와야 하기 때문에 내가 누군지 데이터를 보내줘야함.
    fetchFavoritedMovies();
  }, [])

  const fetchFavoritedMovies = () => {
    Axios.post('/api/favorite/getFavoriteMovie', { userFrom: localStorage.getItem('userId') })
      .then(response => {
        if (response.data.success) {
          setFavorites(response.data.favorites);
        } else {
          alert('영호 정보 갖고오기 실')
        }
      })
  }

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom
    }
    Axios.post('/api/favorite/removeFromFavorite', variables)
      .then(response => {
        if (response.data.success) {
          fetchFavoritedMovies();
        } else {
          alert("지우는데 실패")
        }
      })
  }

  const renderCards = Favorites.map((favorite, index) => {
    
    const content = (
      <div>
        {favorite.moviePost ?

            <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "no image"
      }
      </div>
    )

    return <tr key={index}>
      <Popover content={content} title={`${favorite.movieTitle}`}>
        <td>{favorite.movieTitle}</td>
      </Popover>
      <td>{favorite.movieRunTime} mins</td>
      <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
    </tr>
  })

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove From Favorites</th>
          </tr>
        </thead>
        <tbody>
          {renderCards}
        </tbody>
      </table>
          
    </div>
  )
}

export default FavoritePage