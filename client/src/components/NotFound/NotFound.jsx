import React from 'react';
import styles from './styles/NotFound.module.css';

const NotFound = () => {
	return <div className={styles.NotFound}>
		<div className={styles.glitch}>404</div>
		<div className={styles.text}>Page not found</div>
	</div>;
};

export default NotFound;

