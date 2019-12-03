import React, { useState, createContext, useEffect, useRef } from 'react'
import {cfg} from '../containers/App'

export const SlideContext = createContext(null);

const SlideContextProvider = ({children}) => {
    const EngineRef = useRef(null);

    const [slideModel, setSlideModel] = useState(null);
    const [nav, setNav] = useState({canBack:false, canNext:false});

    useEffect(() => {
        // Mounted
        window.pickzen.waitForEngine((Engine)=>{
            if (Engine) {
                EngineRef.current = Engine;

                Engine.load(cfg.code, cfg.server).then(() => {
                    displayCurrentSlide();
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                console.error("Error loading the Pickzen SDK");
            }
        });
    }, []);

    const displayCurrentSlide = () => {
        const Engine = EngineRef.current;
        const slideModel = Engine.getSlide();

        setSlideModel(slideModel);

        const canRestart = slideModel.getType()==='EndSlide';

        setNav( {canBack:slideModel.canBack(), canNext:slideModel.canNext(), canRestart});
    };

    const next = () => {
        slideModel.next();
        displayCurrentSlide();
    };

    const back = () => {
        slideModel.back();
        displayCurrentSlide();
    };

    const restart = () => {
        slideModel.restart();
        displayCurrentSlide();
    };

    return (
        <SlideContext.Provider value={{ Engine:EngineRef.current, slideModel, displayCurrentSlide, nav:{canBack:nav.canBack, canNext:nav.canNext, canRestart:nav.canRestart, back, next, restart} }}>
            {slideModel?children:null}
        </SlideContext.Provider>
    )
};

export default SlideContextProvider