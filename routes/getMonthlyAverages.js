const DailyStat = require('../models/DailyStat');

module.exports = async (req, res) => {
  let year = req.params.year;
  let country = req.params.country;

  try {
    let stats = await DailyStat.aggregate([
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
          country: '$countries.code',
          technology: '$countries.technologies.name',
          jobCount: '$countries.technologies.jobCount'
        }
      },
      {
        $group: {
          _id: { 
            $concat: [ 
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
          country: country
        }
      }
    ]);
    return res.json(stats);
  } catch (error) {
    console.log(error);
  }
};