import React from 'react';
import { render } from 'react-dom';

const Home = () => {
    return (
        <div>
            <h1>Subscription Search</h1>
            <input id="search_input" placeholder="Search Term" maxLength="100"/>
            <input id="search_max_results" type="number" min="1" max="10" value="3"/>
            <button>Search</button>
        </div>
    );
};

render(<Home />, document.getElementById('root'));
