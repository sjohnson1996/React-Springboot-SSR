import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { PhotoGallery, Photo } from "../pages";

function renderPhotoGallery({ photos }: {
    photos: Photo[];
}) {
    return ReactDOMServer.renderToString(<PhotoGallery photos={photos} />);
}

export { renderPhotoGallery };
