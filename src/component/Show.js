import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import "./MainCss.css";


const Show=(props)=> {
  const [graph, setGraph] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    let arrayValue = Object.values(props.dataObj);
    let objToAdd = [["City", "recovered", "deceased"]];
    let arrytoClone = [];
    let allstate = 0,
      tested = 0,
      recoverd = 0,
      confirm = 0;

    Object.entries(Object.values(props.datajson)[0]).map(
      ([keys, value], index) => {
        if (arrayValue[index] === true) {
          allstate += 1;
          tested += value.total.tested;
          recoverd += value.total.recovered;
          confirm += value.total.confirmed;
          objToAdd.push([keys, value.total.recovered, value.total.deceased]);
        }
      }
    );

    arrytoClone.push(allstate);
    arrytoClone.push(tested);
    arrytoClone.push(confirm);
    arrytoClone.push(recoverd);
    setTotal(arrytoClone);
    setGraph(objToAdd);
  }, [props]);

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  return (
    <div>
      <div>
        <div className="stateDiv">
          <h3>SELECTED STATE</h3>
          <p> {total[0]}</p>
        </div>

        <div className="showDiv">
          <h3>TESTED</h3>
          <p> {kFormatter(total[1])}</p>
        </div>

        <div className="showDiv">
          <h3>CONFIRMED</h3>
          <p> {kFormatter(total[2])}</p>
        </div>

        <div className="showDiv">
          <h3>RECOVERED</h3>
          <p> {kFormatter(total[3])}</p>
        </div>
      </div>
      <h3 className="graphicalText">GRAPHICAL REPRESENTATION</h3>

      <div className="secondiv">
        <p className="stetetext">STATE WISE</p>
        <p className="stetetext">DISTRICT WISE BY STATE GROUPED</p>
      </div>

      <h4 className="text">TESTED CONFIRMED AND RECOVERED STATE</h4>

      <Chart
        width={"900px"}
        height={"800px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={graph}
        options={{
          chartArea: { width: "40%", height: "40%" },
          isStacked: true,
        }}
      />
    </div>
  );
}
export default Show;