const Technology = require('../models/Technology');

const getAll = async () => {
  try {
    const technologies = await Technology.find();
    return technologies;
  } catch (error) {
    throw error;
  }
};

const create = async data => {
  try {
    const newTechnology = new Technology(data);
    return newTechnology.save();
  } catch (error) {
    throw error;
  }
};

module.exports = { getAll, create };