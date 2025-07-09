import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './name.module.scss';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap/esm';
import health from '../../../../images/health.png';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pp from '../../../../images/profile.png'
const Name = () => {
    return (
        <Container className={`mt-4 ${styles.cont}`}>
            <div className="row">
                <div className={`col-md-2 col-3 ${styles.img} `}>
                    <img src = {pp} alt="ProfilePicture" className={styles.profilep}></img>
                 </div>
            </div>
        </Container> 
    );
}

export default Name;
