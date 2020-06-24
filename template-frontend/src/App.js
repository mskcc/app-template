import React from 'react';
import './App.css';
import HomePage from './home-page';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (<Router>
        <blockquote class="imgur-embed-pub" lang="en" data-id="a/QWCcFQW"><a href="//imgur.com/a/QWCcFQW"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
        <div className={'background-mskcc-light-blue app-body'}>
            <HomePage />
        </div>
    </Router>);
}

export default App;
