import PropTypes from 'prop-types'
import React, { Component } from 'react'

import SocialLogin from '../../src/index'


const ButtonFC = ({ children, triggerLogin, triggerLogout, ...props } = props)=>{
    
    const style = {
      background: '#eee',
      border: '1px solid black',
      borderRadius: '3px',
      backgroundColor:'orange',
      display: 'inline-block',
      margin: '5px',
      padding: '10px 20px'
    }

    return (
      <div onClick={triggerLogin} style={style} {...props}>
        { children }
      </div>
    )
  
}

export default SocialLogin(ButtonFC)
