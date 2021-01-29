import React, { useState, useContext, useEffect } from 'react';
import { SlideContext } from '../../context/SlideContext';
import Result from '../../components/Result/Result';
import './EndCustom.css';

function ProductsCarrousel({results,className='',title}) {
    const { slideModel } = useContext(SlideContext);
    const target = React.createRef();
    
    const [isPhone,setIsPhone] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollSize, setScrollSize] = useState(results.length)


    useEffect(()=>{
        setIsPhone(window.innerWidth<600?true:false);
        
        setScrollSize(isPhone?results.length:Math.ceil(results.length/3))

        target.current.addEventListener('touchmove', scrollListener);
        return () => target.current && target.current.removeEventListener('touchmove', scrollListener);
    })

    const scrollListener = () => {
        if(!target.current)
            return;
        
        const element = target.current;
        const windowScroll = element.scrollLeft;
        const totalWidth = element.scrollWidth - element.clientWidth;
        
        if (windowScroll === 0)
            return setScrollProgress(0);
        
        if(windowScroll > totalWidth)
            return setScrollProgress(100);

        setScrollProgress( (windowScroll/totalWidth) * 100);
    }
    
    const scrollToPage = (i) => {
        const element = target.current;

        const firstChild = element.children[0]; 
        // Calculates the final width of each 'page'
        const pageWidth = ((firstChild.offsetWidth + parseInt(getComputedStyle(firstChild).margin) * 2) * (results.length/scrollSize));
        element.scrollLeft = pageWidth * (i)
        
        setScrollProgress( (element.scrollLeft/element.scrollWidth - element.clientWidth) * 100);
    }

    return (
        <div className={`pz-products ` + className}> 
            <h1 className='pz-title'>{title}</h1>
            <div className='pz-productsView' ref={target}>
                {results.map((result,i) =>  <Result key={result.getId()} value={result}/>)}
            </div>

            <div className='pz-scrollProgress'>
                {[...Array(Math.ceil(scrollSize)).keys()].map(i=>
                <div onClick={() => scrollToPage(i)}
                className={`pz-step ${((scrollProgress * scrollSize) / 100 >= i && (scrollProgress * scrollSize) / 100 <= i + 1)?'active':''}`} />)}
            </div>
        </div>
    );

}

export default ProductsCarrousel;