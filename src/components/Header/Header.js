import React, { useContext } from 'react';
import { SlideContext } from '../../context/SlideContext'
import CustomHTML from '../../components/CustomHTML/CustomHTML'
import './Header.css'

function Header() {
    const {slideModel} = useContext(SlideContext);

    return (
        <div className="header">
            <CustomHTML className="title" html={slideModel.getTitle()} />
            <CustomHTML className="subtitle" html={slideModel.getSubtitle()} />
            <CustomHTML className="content-title" html={slideModel.getContentTitle()} />
        </div>
    );
}

export default Header;
