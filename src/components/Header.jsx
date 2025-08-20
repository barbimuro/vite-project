import React from 'react'
import { Link } from 'react-router'

function Header() {
  return (
    <div>
           <header className='Header'>
        <h1>Blog</h1>
        <nav><ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='posts'>Posts</Link></li>
        </ul>
        </nav>
   </header>
    </div>

  )
}

export default Header
