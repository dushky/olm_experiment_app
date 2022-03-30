import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'

const NavigationScroll = ({ children } : any) => {
    const location = useLocation()
    const { pathName }: any = location    

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathName])

    return children || null
}

NavigationScroll.propTypes = {
    children: PropTypes.node
}

export default NavigationScroll
