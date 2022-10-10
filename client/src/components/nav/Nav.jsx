import style from './Nav.module.css'
import { useDispatch, useSelector } from "react-redux";
import { filters, getCountryByName, getAllCountries, setModal, getActivities } from "../../redux";
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import ActivityList from './activityList/ActivityList';
import mundo from "../../assets/img/mundo.png"
const Nav = () => {
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const {countries,continent_state, order_state, created, activity_state, activities} = useSelector((state) => state);
  const [continent, setCotinent] = useState(continent_state);
  const [activity, setActivity] = useState(activity_state);
  const [order, setOrder] = useState(order_state);

  const unique = [...new Map(countries.map(item => [item.continent, item])).values()];

  const setFilters = (continent = "", order = "" , activity = "") => {
    setCotinent(continent);
    setOrder(order);
    setActivity()

    dispatch(filters({
      continent,
      order,
      activity,
    }))
  }

  useEffect(() => {
    dispatch(getActivities())
  },[dispatch, created]);

  const handleSearch = (e) => {
    if(e.target.value) {
      dispatch(getCountryByName(e.target.value))
    } else {
      if(continent === "" && order === "" && activity === "") {
        dispatch(getAllCountries());
      } else {
        setFilters(continent, order, activity);
      }
    }
  };

  const handleContinent = (e) => {
    setFilters(e.target.value, order, activity)
  };

  const handleOrder = (e) => {
    setFilters(continent, e.target.value, activity )
  }

  const handleActivitySearch = (e) => {
    setFilters(continent, order, e.target.value)
  }

  const handleActivity = () => {
    dispatch(setModal(true));
    document.body.style.overflow = "hidden";
  }

  return (
    <nav className={style.nav_container}>
      <div className={style.btn_container}>
        <div className={style.logoInputContainer}>        
          <Link className={style.link} to={'/countries'}>
           <img src= {mundo} className={style.pru} />
          </Link>
          <Link to={'/countries'}>
          <h1 className={style.title}>El mundo en tus manos!</h1>        
          </Link>  
          {pathname === '/countries' || pathname === '/countries/' ?
            <input placeholder='Buscar..' className={style.searchBar} type="text" onChange={handleSearch}/>
          : null }
        </div>
        <button className={style.activity} onClick={handleActivity}>Crear Actividad</button>
      </div>
      {pathname === '/countries' || pathname === '/countries/' ?
        <div className={style.input_container}>
          <div className={style.input_bg}>
            <div className={style.labelAndSelect}>
              <label htmlFor="title-continent">Filtro de continente</label>
              <select className={style.selectInput} defaultValue='Choose Continent' name="filter" id="filter" onChange={handleContinent}>
                <option value="">Elije uno</option>
                {unique.map( c => <option key={c.ID} value={c.continent}>{c.continent}</option>)}
              </select>
            </div>
            <div className={style.labelAndSelect}>
              <label htmlFor="title-continent">Filtro de busqueda</label>
              <select className={style.selectInput} defaultValue='Choose Continent' name="order" id="order" onChange={handleOrder}>
                <option value="">Elije Filtro</option>
                <option value="asc">A-Z</option>
                <option value="des">Z-A</option>
                <option value="higher">Mayor Población</option>
                <option value="lower">Menor Población</option>
              </select>
            </div>
            <div className={style.labelAndSelect}>
              <label htmlFor="title-activity" >Filtro de Actividad</label>
              <select className={style.selectInput} onChange={handleActivitySearch}  name="activities" id="activities">
                <ActivityList act={activities}/>
              </select>
            </div>
          </div>
        </div>
      : null }
    </nav>
  );
};

export default Nav;