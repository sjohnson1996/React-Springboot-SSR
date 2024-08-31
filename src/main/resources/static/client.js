import { App } from '../components/App';
import {hydrateRoot} from "react-dom/client";

const photosString = window.__PRELOADED_STATE__;

const rootElement = document.getElementById('app');
hydrateRoot(rootElement, <App photosString={photosString} />);
