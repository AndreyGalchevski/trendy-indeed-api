const DailyStat = require('../models/DailyStat');
const Country = require('../models/Country');

const getRawStats = async () => {
  const stats = await DailyStat.find().sort({ date: -1 });
  return stats;
};

const getMonthlyAverages = async (year, countryCode) => {
  const country = await Country.findOne({ code: countryCode });

  const stats = await DailyStat.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(year, 0, 1),
          $lt: new Date(year + 1, 0, 1)
        }
      }
    },
    {
      $unwind: { path: '$countries' }
    },
    {
      $unwind: { path: '$countries.technologies' }
    },
    {
      $project: {
        createdAtMonth: { $month: '$date' },
        country: '$countries.name',
        technology: '$countries.technologies.name',
        jobCount: '$countries.technologies.jobCount'
      }
    },
    {
      $group: {
        _id: {
          $concat: [
            { $substr: [year, 0, -1] },
            '-',
            { $substr: ['$createdAtMonth', 0, -1] },
            '-',
            '$country',
            '-',
            '$technology'
          ]
        },
        country: { $first: '$country' },
        technology: { $first: '$technology' },
        month: { $first: '$createdAtMonth' },
        average: { $avg: '$jobCount' }
      }
    },
    {
      $match: {
        country: country.name
      }
    }
  ]);
  return stats;
};

const getYearlyAverages = async year => {
  const stats = await DailyStat.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(year, 0, 1),
          $lt: new Date(year + 1, 0, 1)
        }
      }
    },
    {
      $unwind: { path: '$countries' }
    },
    {
      $unwind: { path: '$countries.technologies' }
    },
    {
      $project: {
        country: '$countries.name',
        technology: '$countries.technologies.name',
        jobCount: '$countries.technologies.jobCount'
      }
    },
    {
      $group: {
        _id: {
          $concat: [{ $substr: [year, 0, -1] }, '-', '$country', '-', '$technology']
        },
        country: { $first: '$country' },
        technology: { $first: '$technology' },
        average: { $avg: '$jobCount' }
      }
    }
  ]);
  return stats;
};

module.exports = { getRawStats, getMonthlyAverages, getYearlyAverages };
