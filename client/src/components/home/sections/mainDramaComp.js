import React from 'react';

export default function MainDramaComp(props) {
    // console.log(props);
    const {imageURL, title, text} = props;

return (

    <div className='main-drama-component' style={{
        width:'100%',
        background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0) 41%, rgba(0,0,0,0.65) 100%), url(${imageURL}), #1c1c1c`,
        height: '500px',
        backgroundSize: '100%, cover',
        position: 'relative'
    }}>
        <div style={{position:'absolute', maxWidth: '700px', bottom:'2rem', marginLeft: '2rem'}}>
            <h3 style={{color: 'rgb(192, 117, 195)'}}><b>{title}</b></h3>
            <p style={{color:'rgb(192, 117, 195)', fontsize:'1rem'}}>{text}</p>
        </div>
    </div>

)
}
