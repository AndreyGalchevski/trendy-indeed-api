const months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

const techs = [
  'Angular',
  'AngularJS',
  'C++',
  'C#',
  'Clojure',
  'Elixir',
  'Go',
  'Java',
  'JavaScript',
  'NodeJS',
  'PHP',
  'Python',
  'React',
  'Ruby',
  'Rust',
  'Scala',
  'Swift',
  'Vue'
];

const initLayout = () => {
  return {
    title: 'Monthly Average Number Of Job Listings By Technology',
    xaxis: {
      title: 'Month'
    },
    yaxis: {
      title: 'Monthly Average',
      rangemode: 'tozero',
      showline: true,
      zeroline: true
    },
    annotations: []
  };
};

const createPlotData = data => {
  let plotData = [];

  techs.forEach(tech => {
    let month = data
      .filter(item => item.technology === tech)
      .map(item => item.month);
    console.log(month);
    console.log(months[month]);
    let trace = {
      x: months[month],
      y: data
        .filter(item => item.technology === tech)
        .map(item => item.average),
      type: 'scatter',
      mode: 'lines',
      name: tech
    };

    plotData.push(trace);
  });

  return plotData;
};

const plot = data => {
  let layout = initLayout();

  let plotData = createPlotData(data);

  Plotly.newPlot('graph', plotData, layout, { responsive: true });
};

(async () => {
  try {
    let response = await axios.get('http://localhost:3000/api/stats/2018/il');
    plot(response.data);
  } catch (error) {
    console.log(error);
  }
})();
