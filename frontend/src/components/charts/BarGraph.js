import React, { Component } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";

class BarGraph extends Component {
  render() {
    const graphBars =
      this.props.data &&
      Object.keys(this.props.data).map((key, index) => {
        var randomColor = "#000000".replace(/0/g, function() {
          return (~~(Math.random() * 16)).toString(16);
        });
        return <Bar dataKey={key} fill={randomColor} key={index} />;
      });

    return (
      <div>
        <BarChart
          width={this.props.width}
          height={this.props.height}
          data={[{ ...{ name: this.props.name }, ...this.props.data }]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {graphBars}
        </BarChart>
      </div>
    );
  }
}
export default BarGraph;
