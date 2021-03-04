import React, { useState } from "react";

export const DetailRow = (props) => {
  const { name, value } = props;
  const [read, setRead] = useState(true);
  const [field, setField] = useState(value);

  function editField(event) {
    setRead(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setField(event.target.value);
  }

  return (
    <div className="form-group row">
      <label htmlFor={name} className="col-sm-4 col-form-label">
        {name}:
      </label>
      <div className="col-sm-4">
        <input
          className="form-control"
          readOnly={read}
          type="text"
          name={name}
          id={name}
          value={field}
          onChange={handleChange}
        />
      </div>
      <div className="col-sm-4">
        <button
          className="btn btn-outline-warning"
          onClick={(e) => editField(e)}
        >
          Edit
        </button>
        <button className="btn btn-outline-danger">Delete</button>
      </div>
    </div>
  );
};

export const JsonObject = (props) => {
  const { value } = props;
  const keys = Object.keys(value).map((key, i) => {
    if (typeof value[key] === "object") {
      return (
        <div>
          <button
            class="btn btn-outline-success"
            type="button"
            data-toggle="collapse"
            data-target={`#${key}`}
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            {key}
          </button>

          <div className="collapse container m-3" id={key}>
            <JsonObject value={value[key]} />
          </div>
        </div>
      );
    } else {
      return <DetailRow name={key} value={value[key]} />;
    }
  });

  return <>{keys}</>;
};

export default DetailRow;
