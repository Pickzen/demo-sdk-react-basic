import React, { useState, useContext, useEffect } from 'react';
import { SlideContext } from '../../context/SlideContext';
import Result from '../../components/Result/Result'
import Header from "../../components/Header/Header";
import './EndCustom.css'
import Navigation from "../../components/Navigation/Navigation";
import ProductsCarrousel from './ProductsCarrousel';

function EndCustom() {
    const { slideModel } = useContext(SlideContext);
    const [results, setResults] = useState(null);


    useEffect(()=>{
        if(!results){
            slideModel.getResults().then( (results) => {
                setResults(results);
            }).catch( (reason) => {
                console.error(reason);
            })
        }
    })
    
    return (
        <div className="slide pz-customEnd">
            {results?(
                <>
                    <Header />
                    <div className="results">
                    {/* Add logic to determinate which products go where */}
                        <ProductsCarrousel results={results} className='pz-topView'/>
                        <ProductsCarrousel results={results} className='pz-bottomView'/>
                        
                    </div>    
                    <Navigation />
                </>
            ):(
                <div className="loading">Loading ...</div>
            )}
        </div>
    );
}

export default EndCustom;