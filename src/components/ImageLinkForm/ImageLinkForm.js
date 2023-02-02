import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p
                className='f3 white'>
                {'This AI will detect faces'}
            </p>

            <div className='center'>
                <div className='form center pa3 br3 shadow-5'>
                    <input
                        className='f4 pa2 w-70 center in'
                        type='text'
                        placeholder='URL'
                        onChange={onInputChange}
                    />
                    <button
                        className='w-30 grow f4 link ph3 pv2 dib black bg-light-green'
                        onClick={onSubmit}>
                        Detect
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ImageLinkForm;