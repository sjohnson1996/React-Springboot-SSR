// import React from 'react';
// import ReactDOMServer from 'react-dom/server'
// import serialize from 'serialize-javascript';
// import {StaticRouter} from "react-router-dom";

// import App from '../../../react-src/components/app'

// const render = (template, model) => {
//
//     console.log("Render function called with template:", template);
//
//     const location = model.get('currentPath');
//     const routerContext = {};
//
//     const initialState = JSON.parse(model.get('serverSideState'));
//
//     // const markup = ReactDOMServer.renderToString(
//     //     <StaticRouter location={location} context={routerContext}>
//     //         {/*<App store={initialState}/>*/}
//     //         <h1>This is a test!</h1>
//     //     </StaticRouter>
//     // );
//
//     const markup = '<h1>This is a test!</h1>';
//
//     return template
//         .replace('SERVER_RENDERED_HTML', markup)
//         // .replace(
//         //     'SERVER_RENDERED_STATE', serialize(initialState, {isJSON: true})
//         // );
// }

render = (template, model) => {
    // const jsModel = Java.asJSONCompatible(model);

    console.log("Type of model:", model.serverSideState);

    // Debug: Check the converted object
    console.log("Java Object:", Object.entries(Java));

    console.log("Render function called with template:", template);

    // Convert model to a JavaScript object
    // const modelMap = JSON.parse(JSON.stringify(model));
    // const location = modelMap.currentPath;
    // const initialState = JSON.parse(modelMap.serverSideState);

    const markup = `<h1>This is a test!</h1><h5>${JSON.stringify(model)}</h5>`;

    return template
        .replace('SERVER_RENDERED_HTML', model.renderedHtml)
        .replace('SERVER_RENDERED_STATE', model.serverSideState);
};
