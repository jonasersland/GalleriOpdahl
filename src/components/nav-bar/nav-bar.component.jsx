import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () =>(
    <div className='topWrapper'>
        <div className='logoWrapper'>
            <div className='logo'>
            <Link to={"/Ny/"}>Galleri Opdahl</Link>
            </div>
        </div>
        <div className='menuWrapper'>
            <div className='menu'>
                <Link to={"/Ny/artists"}>Artists</Link>
                <Link to={"/Ny/exhibitions"}>Exhibitions</Link>
                <Link to={"/Ny/newspage"}>News</Link><br/>
                <Link to={"/Ny/about"}>About</Link>
                <a href='https://www.instagram.com/galleriopdahl/'>Instagram</a>
                <a href='https://www.artsy.net/galleri-opdahl'>Artsy</a>
            </div>
        </div>
    </div>
)

export default NavBar;