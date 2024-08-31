import React from 'react';
import 'core-js/stable'; // Core-JS polyfills for modern JS features
import 'regenerator-runtime/runtime'; // Polyfills for async/await

import ReactDOMServer from 'react-dom/server';
import {Box, Card, CardHeader} from "@mui/material";

// Example React component
const App = () => {
    return (
        <Box>
            <Card>
                <CardHeader title="Scott's SSRed Card" subheader="This card was rendered from spring boot"/>
            </Card>
        </Box>
    );
};

// Function to render the component to a string
export function renderToString(props) {
    // You can pass props from Java or set default values here
    return ReactDOMServer.renderToString(<App {...props} />);
}
