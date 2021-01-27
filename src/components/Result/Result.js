import React from 'react';
import CustomHTML from "../CustomHTML/CustomHTML";
import './Result.css'

const Result = ({value:result}) => {
    return (
	    <div className="result">
	        <CustomHTML html={result.getTitle()} />
			<div className="image" style={{backgroundImage:`url(${result.getImage()})`}}></div>
	        <CustomHTML html={"$"+result.getPrice()}/>
			
	    </div>
    )
};

export default Result;