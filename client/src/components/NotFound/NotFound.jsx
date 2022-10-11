import React from 'react';
import styles from './styles/NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return <div className={styles.NotFound}>
		<div className={styles.glitch}>404</div>
		<div className={styles.text}>Pagina no encontrada</div>
		<Link to="/countries"><button className={styles.butt}>Volver</button></Link>
	</div>;
};

export default NotFound;

