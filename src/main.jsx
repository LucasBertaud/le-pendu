import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { createContext, useReducer } from 'react'
import { initialState, reducer } from './reducers/playReducer.js'

// création du context
export const PlayContext = createContext([]);

// création du provider
const PlayProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <PlayContext.Provider value={[state, dispatch]}>
            {children}
        </PlayContext.Provider>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <PlayProvider>
            <App />
        </PlayProvider>
    </BrowserRouter>
)
