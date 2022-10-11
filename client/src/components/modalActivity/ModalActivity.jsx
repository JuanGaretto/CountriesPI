import style from "./ModalActivity.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setModal, createActivity } from "../../redux";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Error from "./errors/Error"
import { useEffect } from "react";

export const validateInputs = (input) => {
  const { name, difficulty, duration } = input;
  let errors = {};
  if(name.length > 20 && name !== "") errors.name = 'Longitud Maxima excedida';
  if(name.length < 2 && name !== "") errors.name = 'Longitud minima es de 2';


  if(difficulty !== "" && isNaN(parseInt(difficulty))) errors.difficulty = 'La dificultad necesita ser un numero'
  if(difficulty !== "" && difficulty.length > 1) errors.difficulty = 'Numero minimo 1 y numero maximo 5'
  if(parseInt(difficulty) < 1) errors.difficulty = 'Numero minimo es 1';
  if(parseInt(difficulty) > 5) errors.difficulty = 'Numero maximo es 5';

  if(duration.length > 5) errors.duration = 'Longitud Maxima excedida';
  if(duration.length && duration[2] !== ':') errors.duration = 'El formato es hh:mm'
  if(duration.length && !duration[3]) errors.duration =  'El formato es hh:mm';
  if(duration.length && !duration[4]) errors.duration =  'El formato es hh:mm';
  if(parseInt(duration[0]+duration[1]) > 24) errors.duration = 'Maximas horas es de 24'
  if(parseInt(duration[3]+duration[4]) > 59) errors.duration = 'Maximos minutos es de 59'  
  if(duration[0] && isNaN(parseInt(duration[0]))) errors.duration = `"${duration[0]}" necesita ser un número`;
  if(duration[1] && isNaN(parseInt(duration[1]))) errors.duration = `"${duration[1]}" necesita ser un número`;
  if(duration[3] && isNaN(parseInt(duration[3]))) errors.duration = `"${duration[3]}" necesita ser un número`;
  if(duration[4] && isNaN(parseInt(duration[4]))) errors.duration = `"${duration[4]}" necesita ser un número`;

  return errors;
}

export const validateCountries = (input) => {
  const {countries} = input;
  let errors = {};

  if(countries.length > 3) errors.countries = 'No puedes agregar más de 3 paises';
  return errors;
}

const ModalActivity = () => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState({
    names: [],
    countries: [],
  });
  const [input, setInput] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: ''
  })
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true)
  const [limitCountry,setLimitCountry] = useState({});
  const [done, setDone] = useState("");
  const { filtered, detailed_country } = useSelector((state) => state);
  const { pathname } = useLocation();
  const countryList=  pathname === `/countries/${detailed_country.ID}` ? [detailed_country] : filtered

  useEffect(() => {

    if(errors.name || errors.difficulty || errors.duration) {
      setIsDisabled(true);
    } else {
      if(!countries.names.length || !input.name.length || !input.difficulty.length || !input.duration.length || !input.season.length) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false)
      }
    }

    return () => {
      setIsDisabled(true);
    }

  }, [countries, input ,limitCountry, errors]);


  const handleClose = () => {
    dispatch(setModal(false));
    document.body.style.overflow = "scroll";
  };

  const handleCountry = (e) => {
    const max = validateCountries({
      names: [...countries.names, e.target[e.target.selectedIndex].text],
      countries: [...countries.countries, e.target.value]
    })
    setLimitCountry(max);

    if(!max.countries) {
      setCountries({
        names: [...countries.names, e.target[e.target.selectedIndex].text],
        countries: [...countries.countries, e.target.value]
      })
    }
  }

  const handleDelete = (e) => {
    setCountries({
      names: [...countries.names.filter((c, index) => index !== parseInt(e.target.id))],
      countries: [...countries.countries.filter((c, index) => index !== parseInt(e.target.id))]
    })
  }

  const handleInputChange = (e) => {
      setErrors(validateInputs({
        ...input,
        [e.target.name]: e.target.value
      }))

      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createActivity(countries.countries ,input))
     .then( res => setDone(res.msg))

     setTimeout(() => {
      setInput({
        name: '',
        difficulty: '',
        duration: '',
      })
      setDone("");
     }, 3500);
  }

  return (
    <div className={style.modalBG}>
      <form onSubmit={handleSubmit} className={style.modalContainer}>
        <div className={style.topBtn}>
          <button onClick={handleClose}>Cerrar</button>
        </div>
        <div className={style.wrapper}>
          <div className={style.countryInput}>
            <label htmlFor="">Pais:</label>
            <select onChange={handleCountry} className={`${style.input_style} ${style.select}`}>
              <option value="" hidden>Elije el pais</option>
              {countryList.length && countryList.map( c => {
                const uppercase = c.name[0].toUpperCase() + c.name.substring(1);
                return (
                  <option key={c.ID} value={c.ID} name={uppercase} id={uppercase}>{uppercase}</option>
                )
              })}
            </select>
            {limitCountry.countries &&  <Error timedError={limitCountry.countries} />}
          </div>
          <div className={style.countryInput}>
            <label htmlFor="">Nombre de la Actividad:</label>
            <input className={style.input_style}  value={input.name}  onChange={handleInputChange} name="name" type="text" placeholder="Fútbol, Basquet, Paddle, Caminar, etc" />
            {errors.name ? <Error error={errors.name}/> : null}
          </div>
          <div className={style.countryInput}>
            <label htmlFor="">Dificultad: <span className={style.aclaration}>1 - 5</span></label>
            <input className={style.input_style} value={input.difficulty} onChange={handleInputChange} name="difficulty" type="text" min={1} max={5}  placeholder="Configura la dificultad" />
            {errors.difficulty ? <Error error={errors.difficulty}/> : null}
          </div>
          <div className={style.countryInput}>
            <label htmlFor="">Duración: <span className={style.aclaration}>formato hh:mm</span></label>
            <input className={`${style.input_style} ${style.time}`}  value={input.duration} placeholder='Configura el tiempo de duración'  onChange={handleInputChange} name="duration" type="text" />
            {errors.duration ? <Error error={errors.duration}/> : null}
          </div>
          <div onChange={handleInputChange}  className={style.countryInput}>
            <label htmlFor="">Estación del año:</label>
            <div className={style.checkbox_container}>
              <div className={style.checkbox}>
                <label htmlFor="">Verano</label>
                <input name="season" type="radio" value={'Summer'} />
              </div>
              <div className={style.checkbox}>
                <label htmlFor="">Primavera</label>
                <input name="season" type="radio" value={'Spring'} />
              </div>
              <div className={style.checkbox}>
                <label htmlFor="">Otoño</label>
                <input name="season" type="radio" value={'Autumn'} />
              </div>
              <div className={style.checkbox}>
                <label htmlFor="">Invierno</label>
                <input name="season" type="radio" value={'Winter'} />
              </div>
            </div>
          </div>
          <div className={style.addedCountries} >
            {countries.names.length ? countries.names.map((name, index) => (
                <span onClick={handleDelete} id={index}  key={name} >{name}</span>
            )): null}
          </div>
          <button className={done ? `${style.submit} ${style.done}` : style.submit} disabled={isDisabled} type="submit">{done ? done : 'Enviar Actividad'}</button>
        </div>
      </form>
    </div>
  );
};

export default ModalActivity;
