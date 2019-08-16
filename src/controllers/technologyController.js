const Technology = require('../models/Technology');

const getAll = async () => {
  const technologies = await Technology.find();
  return technologies;
};

const create = async data => {
  const newTechnology = new Technology(data);
  return newTechnology.save();
};

module.exports = { getAll, create };
