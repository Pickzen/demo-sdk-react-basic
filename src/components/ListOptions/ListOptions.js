import React, { useState, useContext } from 'react';
import { SlideContext } from '../../context/SlideContext';
import CustomHTML from "../CustomHTML/CustomHTML";
import './ListOptions.css'

function ListOptions({options}) {
    const [slideId, setSelectedId] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const {slideModel, displayCurrentSlide} = useContext(SlideContext);

    const refreshSelectedOptions = () => {
        setSelectedOptions( options.map( o => o.isSelected() ) );
    };

    if (slideModel.getId()!==slideId) {
        refreshSelectedOptions();
        setSelectedId(slideModel.getId());
    }

    const select = ( o ) => {
        slideModel.selectOption(o);
        refreshSelectedOptions();
        displayCurrentSlide();        
    };

    return (
        <ul className="list-options">
            { options.filter(o=>!o.isHidden()).map((o, i) => (
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