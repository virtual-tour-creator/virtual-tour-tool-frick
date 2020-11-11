import React from 'react';
import './Jumbotron.styles.css';

const Jumbotron = () => {

    const bannerUrl = "https://mediad.publicbroadcasting.net/p/wesa/files/styles/x_large/public/201804/clayton_1-300_cmyk.jpg";

    return(
        <div className="jumbotron jzumbotron-fluid" style={{'backgroundImage': bannerUrl}}>
        </div>
    )
}

export default Jumbotron;