import React from 'react'
import placeholder from '../placeholder.png'

const Header = (props) => {
    return (
        <div className={'header'}>
            <div className={'container'}>
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
            </div>
            <div className={'userContainer'}>
                <img src={placeholder}  alt={'abc'}/>
                Manan Agrawal
            </div>
        </div>
    )
}

Header.defaultProps = {
    title : 'iMVIDU'
}
export default Header