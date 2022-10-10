import React from "react";
import { Link } from "react-router-dom";
import style from './Landing.module.css'

const Landing = () => {
  return (
    <div className={style.main_container}>
      
      <p className={style.parrafal}>
      DISFRUTA DE TODOS LOS PAISES DEL MUNDO<br /> conoce sobre ellos y organiza tu actividad.
      </p>
      <Link to='/countries'>
      <button className={style.boton}>Ingresar</button>
      </Link>
    </div>
  );
};

export default Landing;