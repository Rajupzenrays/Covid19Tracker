import React, { useState, useEffect } from "react";
import "./MainCss.css";
import axios from "axios";
import Checkbox from "./Checkbox";
import Show from "./Show";

const Main=()=> {
  const [checkbox, setCheckbox] = useState(true);
  const [data, setdata] = useState({ val: 0 });
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    axios.get("https://data.covid19india.org/v4/min/data.min.json")
      .then((res) => {
        let myobj = {};
        Object.entries(Object.values(res)[0]).map(([key, value], index) => {
          myobj = { ...myobj, [key]: true };
        });
        setCheckedItems(myobj);
        setdata(res);
      });
  }, []);

  let handelmaincheck = (e) => {
    setCheckbox(e.target.checked);
    if (e.target.checked === true) {
      let myobj = {};
      Object.entries(Object.values(data)[0]).map(([keys, value], index) => {
        myobj = { ...myobj, [keys]: true };
      });
      setCheckedItems(myobj);
    }
  };

  let handelCheck = (event) => {
    console.log(event.target);
    if (checkbox === true) setCheckbox(false);

    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="topdiv">
      <div className="sideBar">
        <label className="checkboxMainLabel">
          <input type="checkbox" checked={checkbox} onChange={handelmaincheck} />
          SELECT STATES
        </label>

        {Object.entries(Object.values(data)[0]).map(([key, value], index) => (
          <Checkbox
            name={key}
            checked={checkedItems[key]}
            handelCheck={handelCheck}
            keyval={key}
          />
        ))}
      </div>

      <div className="MainContainer">
        <Show datajson={data} dataObj={checkedItems} />
      </div>
    </div>
  );
}
export default Main;