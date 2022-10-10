import {
  GET_ALL_COUNTRIES,
  PAGINATION,
  EMPTY_FILTER,
  FILTER_CONTINENT,
  FILTER_ORDER,
  GET_COUNTRY_BY_NAME ,
  GET_COUNTRY_BY_ID,
  MODAL_OPEN,
  CREATE_ACTIVITY,
  GET_ACTIVITIES,
  FILTER_ACTIVITY
 } from "../actions/actions_vars";

const initialState = {
  countries: [],
  filtered: [],
  detailed_country: [],
  continent_state: "",
  activity_state: "",
  order_state: "",
  page: 0,
  modal_open: false,
  created: "",
  activities: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
        filtered: action.payload,
        page: state.page
      };
    }

    case PAGINATION: {
      return {
        ...state,
        page: action.page,
      };
    }

    case EMPTY_FILTER: {
      return {
        ...state,
        filtered: state.countries,
        order_state: "",
      }
    };

    case FILTER_CONTINENT: {
      const filtered = state.filtered.filter((c) =>
        c.continent.includes(action.payload)
      );

      return {
        ...state,
        filtered: filtered.length ? filtered : 'error',
        continent_state: action.payload,
      };
    }

    case FILTER_ORDER: {
      let order;

      if(action.payload === 'asc') {
        order =  state.filtered.slice().sort((a,b) => a.name.localeCompare(b.name));
      }
      if(action.payload === 'des') {
        order =  state.filtered.slice().sort((a,b) => b.name.localeCompare(a.name));
      }
      if(action.payload === 'higher') {
        order = state.filtered.slice().sort((a,b) => b.population - a.population)
      }
      if(action.payload === 'lower') {
        order = state.filtered.slice().sort((a,b) => a.population - b.population)
      }

      return {
        ...state,
        filtered: order || state.filtered,
        order_state: action.payload,
      }
    }

    case GET_COUNTRY_BY_NAME: {

      return {
        ...state,
        filtered: !action.payload.msg ? action.payload : [],
      }
    }

    case GET_COUNTRY_BY_ID: {
      return {
        ...state,
        detailed_country: action.payload,
      }
    }

    case MODAL_OPEN: {
      return {
        ...state,
        modal_open: action.payload
      }
    }

    case CREATE_ACTIVITY: {

      return {
        ...state,
        created: action.payload,
      }
    }

    case GET_ACTIVITIES: {
      return {
        ...state,
        activities: action.payload
      }
    }

    case FILTER_ACTIVITY: {
      const filtered = state.filtered.filter((c)=> c.Activities.some((a)=> a.name === action.payload))
      return {
        ...state,
        filtered: action.payload !== "" ? filtered : state.filtered,
        activity_state: action.payload,
      }
    }

    default:
      return state;
  }
};

export default reducer;
