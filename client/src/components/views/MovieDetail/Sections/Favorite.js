import React, {useEffect, useState} from 'react';
import Axios from 'axios';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRuntime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    let variables = {
        userFrom : userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRuntime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                }
                else {
                    alert("실패!")
                }
            })

            Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    setFavorited(response.data.favorited);
                }
                else {
                    alert("실패!")
                }
            })

    },[])

    const onClickFavorite = () => {
        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    }
                    else {
                        alert('fail');
                    }
                })
        }
        else if (!Favorited) {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    }
                    else {
                        alert('fail');
                    }
                })
        }
    }

    return (
        <div>
            <button onClick={onClickFavorite}>{Favorited ? "Not Favorited" : "Add To Favorite"} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite