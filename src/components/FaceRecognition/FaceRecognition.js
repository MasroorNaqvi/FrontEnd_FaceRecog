import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    const style = {
        top: box.topRow,
        right: box.rightCol,
        bottom: box.bottomRow,
        left: box.leftCol
    }
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='InputImage' src={imageUrl} alt='' width='500px' height='auto' />
                <div className='bounding-box' style={style}>
                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;