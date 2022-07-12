import React , {useState, useEffect} from 'react';
import NavBar from '../../navbar/navbar';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { baseImageURL } from '../../config';
import { useSelector } from 'react-redux';

export default function FavDramaPage() {

    const user = useSelector(state => state.user);
    // console.log(user);

    const dataToSend = {userFrom: localStorage.getItem('userId')};
    const [favDramaList, setFavDramaList] = useState([]);

    const fetchFavDrama = () => {
        axios.post('/api/fav/getFavDramas', dataToSend)
        .then(res => {
            if(res.data.success){
                setFavDramaList(res.data.favList);
            }else{
                if(user && user.userData && user.userData.isAuth){
                    alert('failed to fetch the favourite dramas');
                }else{
                    console.log('failed to fetch the favourite dramas');
                }
            }
        });
    }

    useEffect(() => {
        fetchFavDrama();
    }, []);
    
    const handleRemoveFavDrama = (id) => {

        const variables = {
            userFrom: localStorage.getItem('userId'),
            dramaId: id
        };

        axios.post('/api/fav/removeFromFav', variables)
        .then(res => {
            if(res.data.success){
                fetchFavDrama();
            }else{
                if(user && user.userData && user.userData.isAuth)
                    alert('failed to remove the drama from favourites');
                else{
                    console.log('failed to remove the drama from favourite list');
                }
            }
        })

    }

    return (
        <div>
            <NavBar />
            <div style={{width:'85%', margin:'3rem auto'}}>
                <h3>My Favourite Dramas</h3>
                <hr />
                {favDramaList.length > 0  && favDramaList.map((drama, index) => {
                    return (
                    <React.Fragment key={index}>
                        <MDBCard background='dark' className='text-white'>
                            <MDBRow className='g-0'>
                                <MDBCol md='4'>
                                <MDBCardImage 
                                src={`${baseImageURL}/w300/${drama.dramaImage}`}
                                alt='drama poster' fluid style={{maxHeight:'250px', minWidth:'220px', objectFit:'cover'}}/>
                                </MDBCol>
                                <MDBCol md='8'>
                                <MDBCardBody>
                                    <MDBCardTitle>{drama.dramaTitle}</MDBCardTitle>
                                    <MDBCardText>{drama.dramaOverview}</MDBCardText>
                                    <Button variant="outline-primary" 
                                        onClick={() => handleRemoveFavDrama(drama.dramaId)}>
                                        Remove from favourites
                                    </Button>
                                </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                        <br />
                    </React.Fragment>
                    )
                })}
                
            </div>
        </div>
    )
}
