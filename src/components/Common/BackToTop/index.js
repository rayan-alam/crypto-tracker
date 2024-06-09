import React, { useEffect, useRef } from 'react';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import './styles.css';

function BackToTop() {
    const buttonRef = useRef(null);

    useEffect(() => {
        const scrollFunction = () => {
            if (buttonRef.current) {
                if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                    buttonRef.current.style.display = "flex";
                } else {
                    buttonRef.current.style.display = "none";
                }
            }
        };

        window.addEventListener('scroll', scrollFunction);

        // Clean up the event listener
        return () => {
            window.removeEventListener('scroll', scrollFunction);
        };
    }, []);

    const topFunction = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div 
            className='back-to-top-btn' 
            id='myBtn'
            ref={buttonRef}
            onClick={topFunction}>
            <ArrowUpwardRoundedIcon
                style={{ color: "var(--blue)" }}>
            </ArrowUpwardRoundedIcon>
        </div>
    );
}

export default BackToTop;

// import React from 'react';
// import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
// import './styles.css';

// function BackToTop() {
//     let mybutton = document.getElementById("myBtn");

//     // When the user scrolls down 20px from the top of the document, show the button
//     window.onscroll = function() {
//         scrollFunction()
//     };
//     function scrollFunction() {
//         if (document.body.scrollTop > 300 || 
//             document.documentElement.scrollTop > 300) {
//             mybutton.style.display = "flex";
//         } else {
//             mybutton.style.display = "none";
//         }
//     }
//     // When the user clicks on the button, scroll to the top of the document
//     function topFunction() {
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//     }
    
//     return(
//         <div 
//         className='back-to-top-btn' 
//         id='muBtn'
//         onChange={() => topFunction()}>
//             <ArrowUpwardRoundedIcon
//             style={{ color: "var(--blue)" }}>
//             </ArrowUpwardRoundedIcon>
//         </div>
//     )
// }

// export default BackToTop;