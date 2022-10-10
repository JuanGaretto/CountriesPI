const fetch = require("node-fetch");
require("dotenv").config();
const { URL_ALL } = process.env;
const {Country} = require('../db.js');

const getCountriesAPI = async () => {
  try {
    const response = await fetch(`${URL_ALL}`);
    const allCountries = await response.json();

    const countriesToDB = allCountries.map(c => {
      return {
        ID: c.cca3,
        name: c.name.common,
        img_url: c.flags[0],
        continent: c.region,
        capital: c.capital !== undefined ? c.capital[0] : "No Capital",
        sub_region: c.subregion !== undefined ? c.subregion : "No subregion",
        area: Math.round(c.area),
        population: c.population,
        currencies: c.currencies === undefined ? { ANY: {} } : c.currencies,
        flag: c.flag === undefined ? 'No flag' : c.flag,
        languages: c.languages === undefined ? null : c.languages,
        independent: c.independent === undefined ? null : c.independent
      };
    });

    countriesToDB.map( c => {
      Country.findOrCreate({
        where: {
          ID: c.ID,
          name: c.name,
          img_url: c.img_url,
          continent: c.continent,
          capital: c.capital,
          sub_region: c.sub_region,
          area: c.area,
          population: c.population,
          currencies: c.currencies,
          flag: c.flag,
          languages: c.languages,
          independent: c.independent
        }
      })
    });

    console.log('synchronized db')
  } catch (error) {
    console.log(error)
  }
};

module.exports = {getCountriesAPI}