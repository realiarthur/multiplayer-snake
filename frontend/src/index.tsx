import React from 'react'
import * as ReactDOM from 'react-dom/client'
import Game from 'components/Game'
import { ELEMENTS_IDS, setCssConst } from 'core/const'
import './index.css'

setCssConst()

const root = ReactDOM.createRoot(document.getElementById(ELEMENTS_IDS.ROOT_ID) || document.body)

root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
)
