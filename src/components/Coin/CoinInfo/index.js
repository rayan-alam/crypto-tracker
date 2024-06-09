import React, { useState } from 'react';
import './styles.css';

function CoinInfo({ heading, desc }) {
    const shortDesc = desc.slice(0,350) + "<span style='color:var(--grey)'> Read More...</span>";
    const longDesc = desc + "<span style='color:var(--grey)'> Read Less...</span>";

    const [flag, setFlag] = useState(false);
    return (
        <div className='grey-wrapper'>
            <h2 className='coin-heading-info'>{heading}</h2>
            <p 
            onClick={() => setFlag(!flag)}
            className='coin-desc-info'
            dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }}
            />
        </div>
    );
}

export default CoinInfo;
