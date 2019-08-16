const Country = require('../models/Country');

const getAll = async () => {
  const countries = await Country.find();
  return countries;
};

const create = async data => {
  const newCountry = new Country(data);
  return newCountry.save();
};

module.exports = { getAll, create };
