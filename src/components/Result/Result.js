import React from 'react';
import CustomHTML from "../CustomHTML/CustomHTML";
import './Result.css'

const Result = ({value:result}) => {
    return (
	    <div className="result">
			<div className="image" style={{backgroundImage:`url(${result.getImage()})`}}></div>
	        <CustomHTML html={result.getTitle()} />
	    </div>
    )
};

export default Result;