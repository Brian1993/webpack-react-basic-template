import React, { Component } from 'react'
import { MODULE_CLASS_NAME } from '../config'
import '../index.scss'
import img  from '../assets/dims.jpg'
class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageName : 'HomePage'
    }
  }
  render () {
    return (
      <div id={MODULE_CLASS_NAME}>
        <h1>{this.state.pageName}</h1>
        <div >
          <img src={img} />
        </div>
      </div>
    )
  }
}

export default Main