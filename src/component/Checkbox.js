import React from "react";

const Checkbox=({name, checked = true, handelCheck, keyval }) =>{
  return (
    <div>
      <label className="label">
        <input
          type="checkbox"
          name = {name}
          checked={checked}
          onChange={handelCheck}
        />
        {keyval}
      </label>
    </div>
  );
}
export default Checkbox;