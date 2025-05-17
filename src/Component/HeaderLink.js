import React from 'react'

const HeaderLink = ({title, link, active, onClick}) => {
  return (
    <div onClick={onClick}
    className={'tail-text ${active? "tail-text-active" : ""}'}>
        <a className={'tail-text ${active? "tail-text-active" : ""}'} style={{textDecoration:"none"}}
        href={link}>
{title}
        </a>
      
    </div>
  )
}

export default HeaderLink
