import { App } from '../components/App';
import {hydrateRoot} from "react-dom/client";

const rootElement = document.getElementById('app');
hydrateRoot(rootElement, <App />);
