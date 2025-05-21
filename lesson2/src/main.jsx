import { StrictMode } from "react";
import {createRoot} from 'react-dom/client';
import App from './jsx_version/App';
import '../src/styles/main.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
)