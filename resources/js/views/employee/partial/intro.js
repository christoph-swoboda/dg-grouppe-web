import React from "react"
import image from '../../../assets/1.jpg'

const Intro = () => {
    return (
        <div className='intro'>
            <img src={image} alt='avatar'/>
            <div className='userName'>
                <h2>James Dean</h2>
                <h3>Coca Cola Industries</h3>
            </div>
            <h3><span>Types: </span>Car, Train, Phone</h3>
            <h3><span>Status: </span> Online <span className='lightFont'>(since 21.6.21)</span></h3>
            <button onClick={() => alert('James Dean')}>Edit User</button>
        </div>
    )
}

export default Intro
