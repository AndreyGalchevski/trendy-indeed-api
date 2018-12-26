const Country = require('../models/Country');

const getAll = async () => {
  try {
    const countries = await Country.find();
    return countries;
  } catch (error) {
    throw error;
  }
};

const create = async data => {
  try {
    const newCountry = new Country(data);
    return newCountry.save();
  } catch (error) {
    throw error;
  }
};

module.exports = { getAll, create };