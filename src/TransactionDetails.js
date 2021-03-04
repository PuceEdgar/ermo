import React, { useEffect, useState } from "react";
import { DetailRow } from "./TransactionDetailsFull";
import RequiredFields from "./RequiredFields.json";
import { CheckValue } from "./Utilities/ValidateData";
import { transaction, t_from_my_client } from "./Fields/XmlFields";

const Link = (props) => {
  const { kid, num, isValid } = props;

  let buttonType = isValid ? "info" : "danger";
  let classDescription = "";
  let selected = false;

  if (kid === "transaction") {
    classDescription = `nav-link active btn btn-outline-${buttonType}`;
    selected = true;
  } else {
    classDescription = `nav-link  btn btn-outline-${buttonType}`;
    selected = false;
  }

  return (
    <button
      className={classDescription}
      id={`v-pills-${kid}-tab-${num}`}
      data-toggle="pill"
      href={`#v-pills-${kid}-${num}`}
      role="tab"
      aria-controls={`v-pills-${kid}-${num}`}
      aria-selected={selected}
    >
      {kid}
    </button>
  );
};

const Info = (props) => {
  const { kid, value, num } = props;

  let classDescription = "";
  if (kid === "transaction") {
    classDescription = "tab-pane fade show active";
  } else {
    classDescription = "tab-pane fade";
  }

  return (
    <div
      className={classDescription}
      id={`v-pills-${kid}-${num}`}
      role="tabpanel"
      aria-labelledby={`v-pills-${kid}-tab-${num}`}
    >
      <ShowValues values={value} parent={kid} />
    </div>
  );
};

function RowBlock(props) {
  const { filteredItems, parent, deleteItem } = props;

  let required = RequiredFields[parent];
  let comp;
  if (required) {
    comp = filteredItems.map((item, i) => {
      const valid = CheckValue(item);

      return (
        <DetailRow
          key={i}
          name={item[0]}
          value={item[1]}
          parent={parent}
          show={required[item[0]]}
          valid={valid}
          deleteItem={deleteItem}
        />
      );
    });
  } else {
    comp = filteredItems.map((item, i) => {
      const valid = CheckValue(item);

      return (
        <DetailRow
          key={i}
          name={item[0]}
          value={item[1]}
          parent={parent}
          valid={valid}
        />
      );
    });
  }

  return <div className="container">{comp}</div>;
}

function SelectInput(props) {
  const { filteredItems, addItem } = props;

  let itemsR = filteredItems.map((it, i) => {
    return it[0];
  });
  let trans = transaction.filter(function (el) {
    return !itemsR.includes(el);
  });
  const [selectedItem, setSelectedItem] = useState(trans[0]);

  function changeSelected(event) {
    setSelectedItem(event.target.value);
  }

  const options = trans.map((op, i) => {
    return (
      <option key={i} value={op}>
        {op}
      </option>
    );
  });

  return (
    <div className="row">
      <div className="col-8">
        <select
          className="form-control"
          onChange={(event) => changeSelected(event)}
        >
          {options}
        </select>
      </div>
      <div className="col-4">
        <button onClick={() => addItem(selectedItem)}>ADD</button>
      </div>

      {/* {valid.valid ? null : <div className="invalid-feedback">{valid.message}</div>} */}
    </div>
  );
}

const ShowValues = (props) => {
  const { values, parent } = props;

  const [filteredItems, setFilteredItems] = useState([]);

  let newFiltered = filteredItems;

  function deleteItem(id) {
    newFiltered = filteredItems.filter((item, i) => {
      return item[0] !== id;
    });

    setFilteredItems(newFiltered);
  }

  function addItem(item) {
    console.log("id to add: " + item);

    newFiltered.push([item, "test"]);

    console.log("new: " + newFiltered);
    setFilteredItems(newFiltered);
  }

  useEffect(() => {
    const filtered = Object.values(values).filter((val, i) => {
      return typeof val[1] !== "object";
    });
    setFilteredItems(filtered);
  }, [values]);

  return (
    <div className="container">
      <div className="text-right">
        <button
          className="btn btn-primary"
          type="button"
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Add Row
        </button>
      </div>
      <div className="collapse container-fluid m-3" id="collapseExample">
        <div className="card card-body">
          <SelectInput
            parent={parent}
            filteredItems={filteredItems}
            addItem={addItem}
          />
        </div>
      </div>
      <div className="container-fluid">
        <RowBlock
          parent={parent}
          deleteItem={deleteItem}
          filteredItems={filteredItems}
        />
      </div>
    </div>
  );
};

const TransactionDetails = (props) => {
  const { num, kvp, unvalidItems } = props;

  const values = kvp.map((entry, i) => {
    return Object.entries(entry).map((kvp, i) => {
      const value = Object.values(kvp[1]);
      return <Info kid={kvp[0]} value={value} num={num} key={i} />;
    });
  });

  const keys = kvp.map((entry, i) => {
    return Object.entries(entry).map((kvp, i) => {
      return (
        <Link
          kid={kvp[0]}
          num={num}
          key={i}
          isValid={!unvalidItems.includes(kvp[0])}
        />
      );
    });
  });

  return (
    <div className="row">
      <div className="col-3">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {keys}
        </div>
      </div>
      <div className="col-9">
        <div className="tab-content" id="v-pills-tabContent">
          {values}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
