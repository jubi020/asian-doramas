import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';


export default function Favourite(props) {

    const user = useSelector(state => state.user);

    const {dramaId, dramaImage, dramaTitle, userFrom, dramaOverview} = props;
    const variables = {
        userFrom: userFrom,
        dramaId: dramaId,
        dramaTitle: dramaTitle,
        dramaImage: dramaImage,
        dramaOverview: dramaOverview
    }

    const [favouriteNumber, setFavouriteNumber] = useState(0);
    const [isFavourited, setIsFavourited] = useState(false);
    useEffect(() => {

        axios.post('/api/fav/favNumber', variables)
        .then(res => {
            if(res.data.success){
                setFavouriteNumber(res.data.favouriteNumber);
            }else{
                alert('Fetching how many users favourited this drama == failed');
            }
        })

        axios.post('/api/fav/isFav', variables)
        .then(res => {
            if(res.data.success){
                setIsFavourited(res.data.isFavourited);
            }else{
                alert('post req failed to find whether the movie is favourited or not');
            }
        })
      
    }, [])
    

    const onClickFav = () => {
        if(user.userData && !user.userData.isAuth){
            alert('please login first');
        } 
        //user is already logged in
        //when the drama has already been favourited, we need to remove it from user's fav list
        if(isFavourited){
            console.log('the drama is already favourited');
            axios.post('/api/fav/removeFromFav', variables)
            .then(res => {
                if(res.data.success){
                    setFavouriteNumber(favouriteNumber - 1);
                    setIsFavourited(!isFavourited);
                }else{
                    alert('failed to remove the drama from favourites');
                }
            })
        }else{
            //when the drama needs to be favourited, add it to user's fav list
            console.log('you need to favorite it');
            axios.post('/api/fav/addToFav', variables)
            .then(res => {
                if(res.data.success){
                    setFavouriteNumber(favouriteNumber + 1);
                    setIsFavourited(!isFavourited);
                }else{
                    alert('failed to add the drama to the favourites list');
                }
            })


        }
    }

    return (
        <div>
            <button onClick={onClickFav}>
                {isFavourited?'Remove from favourite':'Add to Favourites'} {favouriteNumber}
            </button>
        </div>
    )
}
