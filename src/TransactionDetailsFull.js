import React, { useState } from "react";
import { predefiend } from "./PredefinedValues/Predefined";

const DeleteButton = (props) => {
  const { show, deleteItem, id } = props;

  if (show) {
    return null;
  } else {
    return (
      <button className="btn btn-outline-danger" onClick={() => deleteItem(id)}>
        Delete
      </button>
    );
  }
};

function SelectInput(props) {
  const { name, className, valid, value } = props;

  const options = predefiend[name].map((op, i) => {
    return <option key={i}>{op}</option>;
  });
  return (
    <>
      <select
        className={className}
        id="exampleFormControlSelect1"
        defaultValue={value}
      >
        {options}
      </select>
      {valid.valid ? null : (
        <div className="invalid-feedback">{valid.message}</div>
      )}
    </>
  );
}

function InputField(props) {
  const { name, valid, value, id } = props;
  const [field, setField] = useState(value);

  function handleChange(event) {
    setField(event.target.value);
  }
  let inputClass = valid.valid
    ? "form-control is-valid"
    : "form-control is-invalid";

  if (Object.keys(predefiend).includes(name)) {
    return (
      <SelectInput
        name={name}
        className={inputClass}
        value={value}
        valid={valid}
      />
    );
  } else if (name === "from_funds_code" || name === "to_funds_code") {
    let type = "funds_type";
    return (
      <SelectInput
        name={type}
        className={inputClass}
        value={value}
        valid={valid}
      />
    );
  } else {
    return (
      <>
        <input
          className={inputClass}
          type="text"
          name={name}
          id={id}
          value={field}
          onChange={(e) => handleChange(e)}
        />
        {valid.valid ? null : (
          <div className="invalid-feedback">{valid.message}</div>
        )}
      </>
    );
  }
}

export const DetailRow = (props) => {
  const { name, value, parent, show, valid, deleteItem } = props;
  const id = parent + "." + name;

  return (
    <div className="form-group row">
      <label htmlFor={name} className="col-sm-4 col-form-label">
        {name}:
      </label>
      <div className="col-sm-4">
        <InputField name={name} valid={valid} value={value} id={id} />
      </div>
      <div className="col-sm-4">
        <DeleteButton show={show} deleteItem={deleteItem} id={name} />
      </div>
    </div>
  );
};

const DetailRowModal = (props) => {
  const { name, value } = props;

  return (
    <div>
      <p>
        {name} : {value}
      </p>
    </div>
  );
};

export const TransactionDetailsFull = (props) => {
  const { value } = props;
  const keys = Object.keys(value).map((key, i) => {
    if (typeof value[key] !== "object") {
      return <DetailRowModal name={key} value={value[key]} />;
    } else {
      return (
        <div>
          <h5>{key}: </h5>
          <div className="container m-3" id={key}>
            <TransactionDetailsFull value={value[key]} />
          </div>
        </div>
      );
    }
  });

  return <>{keys}</>;
};

export default TransactionDetailsFull;
