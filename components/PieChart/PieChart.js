import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';
import { connect } from 'react-redux';

class DonutChart extends Component {
  render() {
    const colorArray = [
      '#8884d8',
      '#8dd1e1',
      '#9cacf1',
      '#82ca9d',
      '#a4de6c',
      '#d0ed57'
    ];
    let idx = 0;

    const data = this.props.candidates
      ? this.props.candidates.map(candidate => {
          let candidateName = candidate.name;
          let candidateVoteCount = (+candidate.voteCount + 1) * 5000;
          let dataObj = {
            name: candidateName,
            value: candidateVoteCount,
            fill: colorArray[idx]
          };
          idx++;
          return dataObj;
        })
      : null;

    return (
      <PieChart width={500} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          fill="#82ca9d"
          innerRadius="50%"
          label
        />
        <Legend />
        <Tooltip />
      </PieChart>
    );
  }
}

// const mapState = (state) => {
//   return {
//     candidates: state.activeElection.candidates,
//   }
// }

// export default connect(mapState)(DonutChart);
export default DonutChart;
