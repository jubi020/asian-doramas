import axios from 'axios';
import React, {useEffect, useState} from 'react';



export default function Favourite(props) {

    const {dramaId, dramaImage, dramaTitle, userFrom} = props;
    const [favouriteNumber, setFavouriteNumber] = useState(0);
    const [isFavourited, setIsFavourited] = useState(false);
    useEffect(() => {
      
        const variables = {
            userFrom: userFrom,
            dramaId: dramaId,
            dramaTitle: dramaTitle,
            dramaImage: dramaImage,
        }

        axios.post('/api/favourite/favouriteNumber', variables)
        .then(res => {
            if(res.data.success){
                setFavouriteNumber(res.data.favourite);
            }else{
                alert('Fetching how many users favourited this drama == failed');
            }
        })

        axios.post('/api/favourite/isFavourited', variables)
        .then(res => {
            if(res.data.success){
                setIsFavourited(res.data.isFavourited);
            }else{
                alert('post req failed to find whether the movie is favourited or not');
            }
        })
      
    }, [])
    

    return (
        <div>
            <button>
                {isFavourited?'Already Favourited':'Add to Favourites'} {favouriteNumber}
            </button>
        </div>
    )
}
