const DailyStat = require('../models/DailyStat');
const Country = require('../models/Country');

const getRawStats = async () => {
  try {
    const stats = await DailyStat.find().sort({ date: -1 });
    return stats;
  } catch (error) {
    throw error;
  }
};

const getMonthlyAverages = async (year, country) => {
  const countryName = (await Country.findOne({code: country})).name;

  try {
    const stats = await DailyStat.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(year, 1, 1),
            $lte: new Date(year, 12, 31)
          }
        }
      },
      { 
        $unwind: { path: "$countries"} 
      }, 
      { 
        $unwind: { path: "$countries.technologies"} 
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
              { $substr:[year, 0, -1 ] }, 
              '-',              
              { $substr:["$createdAtMonth", 0, -1 ] }, 
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
          country: countryName
        }
      }
    ]);
    return stats;
  } catch (error) {
    throw error;
  }
};

const getYearlyAverages = async year => {
  try {
    const stats = await DailyStat.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(year, 1, 1),
            $lte: new Date(year, 12, 31)
          }
        }
      },
      { 
        $unwind: { path: "$countries"} 
      }, 
      { 
        $unwind: { path: "$countries.technologies"} 
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
            $concat: [ 
              { $substr:[year, 0, -1 ] }, 
              '-', 
              '$country', 
              '-', 
              '$technology' 
            ] 
          },
          country: { $first: '$country' },
          technology: { $first: '$technology' },
          average: { $avg: '$jobCount' }
        }
      }
    ]);
    return stats;
  } catch (error) {
    throw error;
  }
};

module.exports = { getRawStats, getMonthlyAverages, getYearlyAverages };