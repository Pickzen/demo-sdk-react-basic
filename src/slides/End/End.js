import React, { useState, useContext } from 'react';
import { SlideContext } from '../../context/SlideContext';
import Result from '../../components/Result/Result'
import Header from "../../components/Header/Header";
import './End.css'
import Navigation from "../../components/Navigation/Navigation";

function End() {
    const { slideModel } = useContext(SlideContext);
    const [results, setResults] = useState(null);

    if (!results) {
        slideModel.getResults().then( (results) => {
            setResults(results.map( result =>  <Result key={result.getId()} value={result} /> ));
        }).catch( (reason) => {
            console.error(reason);
        })
    }

    return (
        <div className="slide end">
            {results?(
                <>
                    <Header />

                    <div className="results">
                        {results}
                    </div>

                    <Navigation />
                </>
            ):(
                <div className="loading">Loading ...</div>
            )}
        </div>
    );

}

export default End;