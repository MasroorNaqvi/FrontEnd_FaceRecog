import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import Light from './ai.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3"> 
                    <img alt = 'Light' src={Light}/>
                 </div>
            </Tilt>
        </div>
    )
}

export default Logo;