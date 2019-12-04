import React, { useState, useContext } from 'react';
import { SlideContext } from '../../context/SlideContext';
import CustomHTML from "../CustomHTML/CustomHTML";
import './ListOptions.css'

function ListOptions({options}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const {slideModel, displayCurrentSlide} = useContext(SlideContext);

    const select = ( o ) => {
        slideModel.selectOption(o);
        setSelectedOptions( options.map( o => o.isSelected() ) );
        displayCurrentSlide();        
    };

    return (
        <ul className="list-options">
            { options.map((o, i) => (
                <li onClick={() => select(o)}
                    className={selectedOptions[i] ? 'selected' : ''}
                    key={o.getId()}>
                    {o.hasImage()?<div className="image" style={{backgroundImage:`url(${o.getImage()})`}} />:null}
                    <CustomHTML html={o.getTitle()} />
                </li>
            )) }
        </ul>
    );
}

export default ListOptions;