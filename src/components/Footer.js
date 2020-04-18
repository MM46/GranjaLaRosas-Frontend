import React from 'react'
import '../style/Footer.css'

const date = new Date();
const year = date.getFullYear();
const copy = "\u00A9";

export default function Footer() {
    return (
        <footer>
            {copy} Granja Las Rosas {year}
        </footer>
    )
}
