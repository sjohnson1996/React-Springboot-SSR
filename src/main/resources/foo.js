import React from 'react';
import { App } from './components/App';

import ReactDOMServer from 'react-dom/server';

// Function to render the component to a string
export function renderToString(props) {
    // You can pass props from Java or set default values here
    return ReactDOMServer.renderToString(<App {...props} />);
}
