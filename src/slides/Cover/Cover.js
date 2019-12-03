import React, { useContext } from 'react';
import { SlideContext } from '../../context/SlideContext'
import CustomHTML from '../../components/CustomHTML/CustomHTML'
import Header from '../../components/Header/Header'
import './Cover.css'

function Cover() {
    const {slideModel, displayCurrentSlide} = useContext(SlideContext);

    const start = () => {
        slideModel.start();
    	displayCurrentSlide();
    };

    return (
        <div className="slide cover">
            <Header />

            <button onClick={start}>
                <CustomHTML html={slideModel.getStartLabel()} />
            </button>
        </div>
    );
}

export default Cover;
