const { Router } = require("express");
const router = Router();
const { Activity, Country } = require('../db.js');


router.get('/', async (req,res) => {
  const activities = await Activity.findAll()
  res.status(200).json(activities)
})

router.post('/', async (req,res) => {
  const { countries , name , difficulty, duration, season} = req.body;
  const capitalized = name[0].toUpperCase() + name.substring(1).toLowerCase();

  const posts = await Promise.all(
    countries.map( async (code) => {
      return await Country.findByPk(code, {
        include: Activity
      })
    })
  );

  const promises = posts.map( p => p.createActivity({name: capitalized,difficulty,duration,season}));
  await Promise.all(promises);

  res.status(200).json({msg:`Activity created and associated to countries`});
});

module.exports = router;
