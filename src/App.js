import React, { Component } from 'react'
import { mainComponent as Main } from './modules/app_modules/homePage/index'

class App extends Component {
  constructor (props) {
    super(props)

  }
  render() {
      return ( 
        <div>
          <Main />
        </div>
    );
  }
}

export default App