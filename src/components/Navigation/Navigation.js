import React, { useContext } from 'react';
import { SlideContext } from '../../context/SlideContext';
import './Navigation.css'

function Navigation({back, next, restart}) {
    const {nav} = useContext(SlideContext);

    // Allow handlers override
    back = back || nav.back;
    next = next || nav.next;
    restart = restart || nav.restart;

    return (
        <div className="navigation">
            <button disabled={!nav.canBack} onClick={back}>Back</button>

            {nav.canRestart?<button onClick={restart}>Restart</button>:null}

            <button disabled={!nav.canNext} onClick={next}>Next</button>
        </div>
    );
}

export default Navigation;