import './Desktop.css'
import React from 'react'
import DefaultWallpaper from './assets/defaultWallpaper.png';

const Wallpaper = () =>
{
    return(
        <div className='wallpaper'>
            <img className="element-background" src={DefaultWallpaper}/>
        </div>
    );
} 

export default Wallpaper;