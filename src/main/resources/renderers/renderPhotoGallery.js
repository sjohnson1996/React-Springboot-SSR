import React from 'react';
import { PhotoGallery } from "../pages";
import ReactDOMServer from 'react-dom/server';

function renderPhotoGallery({ photos }) {
    return ReactDOMServer.renderToString(<PhotoGallery photos={photos} />);
}

export { renderPhotoGallery };
