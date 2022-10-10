const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    ID: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_region: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
    },
    currencies: {
      type: DataTypes.JSON,
    },
    flag: {
      type: DataTypes.STRING,
    },
    languages: {
      type: DataTypes.JSON,
    },
    independent: {
      type: DataTypes.BOOLEAN
    }
  }, {
    hooks: {
      beforeCreate: async instance => {
        const name = instance.get('name');
        instance.set('name', name.toLowerCase());
      }
    }
  });
};
