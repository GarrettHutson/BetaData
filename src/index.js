import App from './components/App';

import { BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import React from 'react'
import './main.css'

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<BrowserRouter><App /></BrowserRouter>);

