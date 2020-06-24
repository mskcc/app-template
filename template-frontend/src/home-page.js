import React, {useState, useEffect} from 'react';
import {getQOD, getQuote} from './services/quote';
import dna from './assets/dna.png';
import './home-page.css';
import logo from './assets/igo-icon.png';

function HomePage() {
    const [quoteData, setQuoteData] = useState({
        quote: 'Science and everyday life cannot and should not be separated.',
        author: 'Rosalind Franklin'
    });
    const [nextQuote, setNextQuote] = useState({});

    const getNewQuote = (isRandom) => {
        if(isRandom){
            // Update w/ next quote, if data wasn't returned
            setQuoteData(nextQuote || quoteData);
            getNextQuote();
        } else {
            getQOD().then((newQuoteData) => {
                // Add new quote, or use old quote, if data wasn't returned
                setQuoteData(newQuoteData || quoteData)
            });
        }
    };

    async function getNextQuote() {
        getQuote().then(setNextQuote);
    };

    useEffect(() => {
        // Get Quote of Day first
        getNextQuote(false);
    }, []);

    return (<main id="flexOne">
        <section>    
            <img alt='dna' className='loading-icon inline-text' src={dna}/>
            <p id="author" className={'em2 inline-text mskcc-dark-blue'}> {quoteData['author'] || ''}</p>
            <p id="quote" className={'em4 italics mskcc-dark-blue'}>"{quoteData.quote || ''}"</p>
        </section>
        <div className={'quote-container'}>
            <button type='button'
                    onClick={() => getNewQuote(false)}>
                <p>Quote of Day</p>
            </button>
            <button type='button'
                    onClick={() => getNewQuote(true)}>
                <p>Random</p>
            </button>
            <img alt='igo-logo' className='logo-footer' src={logo}></img>
        </div>
    </main>);
}

export default HomePage;
