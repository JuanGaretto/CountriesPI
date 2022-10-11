import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllCountries } from "../../redux";
import {Card, Pagination, NoCountry} from "./index"
import style from "./Home.module.css";

const Home = () => {
  const { page, filtered, created } = useSelector((state) => state);
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch, pathname, created]);

  
  const offset = page === 0 ? page * 9 : page * 10;
  const limit = page ===0 ? offset + 9: offset + 10;
  let current = filtered.slice(offset, limit);



  return (
    <div className={style.countries}>
      {current.length ? (
        current.map( c => (
          <Card
            key={c.ID}
            id={c.ID}
            name={c.name}
            img={c.img_url}
            continent={c.continent}
            curr={c.currencies}
            flag={c.flag}
          />
        ))
      ) : (
        <NoCountry />
      )}
        <Pagination page={page} total={filtered.length} />
    </div>
  );
};

export default Home;
