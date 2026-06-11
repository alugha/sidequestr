import React from "react";
import AppIcon from './assets/icon.svg'

const AboutUs: React.FC =()=> {
    return <>
        <h1><img src={AppIcon} style={{maxHeight:'2rem'}}></img>SideQuestr is proudly made by</h1>
        <ul>
            <li>Ithamar Adema</li>
            <li>Christian Gitter</li>
            <li>Sabrina Hopf</li>
            <li>Steffen Petri</li>
            <li>Ben Sparks</li>
        </ul>
        <p>
            Wanna see more of what we do? Go visit <a href="https://alugha.com" referrerPolicy="no-referrer" >alugha.com</a> and find out how we make the world grow together
        </p>
    </>
    }

    export default AboutUs;