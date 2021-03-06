import React from 'react';
import { SortableElement, SortableContainer } from 'react-sortable-hoc';
import './TourPage.styles.css';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import PlaceholderThumbnail from '../../images/placeholder-thumbnail.png';

const StopBox = SortableElement(({singleStop, index, handleRemove, handleSwapLeft, handleSwapRight}) => {
    return (
        <li className='sortable-stop-card'>
            <div className="single-stop" >
                <div className="edit-card-container">
                    <img alt={singleStop.name} src={singleStop.medium_url==false? PlaceholderThumbnail : singleStop.medium_url} style={{width: "18rem"}} className="stop-thumbnail"/>  
                    <button className='swap-button' id="swap-left"  onClick={() => handleSwapLeft(index)}></button>
                    <button className='swap-button' id="swap-right" onClick={() => handleSwapRight(index)}></button>
                    <button className='remove tour-page-button' onClick={() => handleRemove(index)}><CloseIcon style={{'pointerEvents':'none'}}/> </button>
                    
                </div>
                <p className="stop-name">{singleStop.name}</p>
            </div>
        </li>
    )
})


const StopBoxList = SortableContainer(({ stops, onRemoveStop, onSwapLeft, onSwapRight }) => {
        return(
            <div>
                <ul className='sortable-row stops-container-view'>
                {stops.map((singleStop, index) =>
                    <StopBox 
                        index={index}
                        singleStop={singleStop} 
                        key={`item-${index}`} 
                        handleRemove={() => onRemoveStop(index)}
                        handleSwapLeft={() => onSwapLeft(index)}
                        handleSwapRight={() => onSwapRight(index)}/>
                )}
                </ul>
            </div>
        )
        
    }
) 


export default StopBoxList;