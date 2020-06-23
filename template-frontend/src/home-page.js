import React, {useState, useEffect} from 'react';
import {getQOD, getQuote} from './services/quote';
import dna from './assets/dna.png';
import MuiButton from '@material-ui/core/Button/Button';

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
                setQuoteData(newQuoteData || quoteData);
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

    return (<div>
        <div className={'quote-container'}>
            <div className={'margin-hor-10 display-inline'}>
                <MuiButton
                    variant="contained"
                    onClick={() => getNewQuote(false)}
                    disabled={false}
                    size={'small'}>
                    <p className={'margin-0 inline black-color'}>Quote of Day</p>
                </MuiButton>
            </div>
            <div className={'margin-hor-10 display-inline'}>
                <MuiButton
                    variant="contained"
                    onClick={() => getNewQuote(true)}
                    disabled={false}
                    size={'small'}
                    classes={{root: 'button'}}>
                    <p className={'margin-0 inline black-color'}>Random</p>
                </MuiButton>
            </div>
            <p className={'em4 italics mskcc-dark-blue'}>"{quoteData.quote || ''}"</p>
            <div className={'width-350 float-right'}>
                <p className={'em2 display-inline mskcc-dark-blue'}>- {quoteData['author'] || ''}</p>
                <img alt='dna' className='loading-icon display-inline' src={dna}/>
            </div>
        </div>
    </div>);
}

export default HomePage;
