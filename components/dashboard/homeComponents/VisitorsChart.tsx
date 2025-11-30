import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// #region Sample data
const data = [
  {
    name: 'Jan',
    visitors: 2600,
  },
  {
    name: 'Feb',
    visitors: 1400,
  },
  {
    name: 'Mar',
    visitors: 3500,
  },
  {
    name: 'Apr',
    visitors: 400,
  },
  {
    name: 'May',
    visitors: 200,
  },
  {
    name: 'Jun',
    visitors: 1684,
  },
  {
    name: 'Jul',
    visitors: 2574,
  },
  {
    name: 'Aug',
    visitors: 3366,
  },
  {
    name: 'Sep',
    visitors: 2020,
  },
  {
    name: 'Oct',
    visitors: 1050,
  },
  {
    name: 'Nov',
    visitors: 4000,
  },
  {
    name: 'Dec',
    visitors: 2543,
  },
];

// #endregion
const VisitorsChart = () => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '550px', maxHeight: '45vh', aspectRatio: 1.618, marginInline: "auto",  }}
      responsive
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <Tooltip />
      <Legend />
      <Bar dataKey="visitors" fill="#19183B" radius={[10, 10, 0, 0]} />
    </BarChart>
  );
};

export default VisitorsChart;