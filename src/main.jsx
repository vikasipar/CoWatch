import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { PopzProvider } from 'popupz';

ReactDOM.createRoot(document.getElementById('root')).render(
    <RecoilRoot>
        <PopzProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </PopzProvider>
    </RecoilRoot>
)
