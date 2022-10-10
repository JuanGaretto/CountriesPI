import {
  GET_ALL_COUNTRIES,
  PAGINATION,
  EMPTY_FILTER,
  FILTER_CONTINENT,
  FILTER_ORDER,
  GET_COUNTRY_BY_NAME,
  GET_COUNTRY_BY_ID,
  MODAL_OPEN,
  CREATE_ACTIVITY,
  GET_ACTIVITIES,
  FILTER_ACTIVITY,
} from "./actions_vars";

export const getAllCountries = () => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:3001/countries`);
    const json = await res.json();
    dispatch({ type: GET_ALL_COUNTRIES, payload: json });
  } catch (error) {
    console.log(error);
  }
};

export const getCountryByName = (name) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:3001/countries?name=${name}`);
    const json = await res.json();
    dispatch({ type: GET_COUNTRY_BY_NAME, payload: json });
  } catch (error) {
    console.log(error);
  }
};

export const getCountryByID = (id) => async (dispatch) => {
  try {
    if(id !== "") {
    const res = await fetch(`http://localhost:3001/countries/${id}`);
    const json = await res.json();
    dispatch({ type: GET_COUNTRY_BY_ID, payload: json });
    } else {
      dispatch({type: GET_COUNTRY_BY_ID, payload: id})
    }
  } catch (error) {
    console.log(error);
  }
};

export const filters = (filters) => (dispatch) => {
  dispatch({ type: EMPTY_FILTER });
  dispatch({ type: FILTER_CONTINENT, payload: filters.continent });
  dispatch({ type: FILTER_ORDER, payload: filters.order });
  dispatch({ type: FILTER_ACTIVITY, payload: filters.activity });
};

export const pagination = (value) => (dispatch) => {
  dispatch({ type: PAGINATION, page: +value });
};

export const setModal = (value) => (dispatch) => {
  dispatch({ type: MODAL_OPEN, payload: value });
};

export const createActivity = (countries, data) => async (dispatch) => {
  try {
    const { name, difficulty, duration, season } = data;

    const toCreate = {
      countries: countries,
      name,
      difficulty,
      duration,
      season,
    };

    const res = await fetch("http://localhost:3001/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toCreate),
    });
    const json = await res.json();

    dispatch({ type: CREATE_ACTIVITY, payload: json });

    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getActivities = () => async (dispatch) => {
  const res = await fetch("http://localhost:3001/activities");
  const json = await res.json();
  dispatch({ type: GET_ACTIVITIES, payload: json });
};
