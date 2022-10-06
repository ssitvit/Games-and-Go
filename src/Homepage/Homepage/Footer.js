import React from 'react'
import "./Footer.css"
import {GoMarkGithub} from 'react-icons/go'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <div className='foot'>
<div >
<p style={{fontSize:"2rem"}}>Made with<span style={{fontSize:"200%",color:"red"}}>&hearts;</span>by IEEE SSIT VIT</p>
<a href='https://github.com/ieeessit-vit' target="_blank" className='git'><GoMarkGithub/></a>
</div>
</div>
    </div>
  )
}

export default Footer
