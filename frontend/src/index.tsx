import React from 'react'
import ReactDOM from 'react-dom'
import Game from 'components/Game'
import { ELEMENTS_IDS, setCssConst } from 'core/const'
import './index.css'

setCssConst()

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById(ELEMENTS_IDS.ROOT_ID),
)
