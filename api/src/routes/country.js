const { Router } = require("express");
const router = Router();
const { Activity, Country, Op } = require("../db.js");

router.get("/", async (req, res) => {
  let { name } = req.query;

  try {
    if (name) {
      const countryByName = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: name + "%",
          },
        },
        include: Activity,
      });

      return countryByName.length
        ? res.status(200).json(countryByName)
        : res.status(200).json({ msg: `${name} does not exist` });
    }

    const allCountries = await Country.findAll({
        attributes: ["ID",
          "name",
          "img_url",
          "continent",
          "population",
          "currencies",
          "flag",
        ],
        include: Activity,
    });

    return res.status(200).json(allCountries);

  } catch (error) {
    res.status(404).json(error.msg);
  }
});

router.get("/:countryID", async (req, res) => {
  const { countryID } = req.params;
  try {
    const countryByID = await Country.findByPk(countryID.toUpperCase(), {
      attributes: {
        exclude: ["createdAt", "updatedAt"],

      },
      include: Activity,
    });

    if (countryByID === null) return res.status(404).json({ msg: `${countryID} Not found` });
    res.status(200).json(countryByID);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

module.exports = router;
