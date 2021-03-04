import React, { useEffect, useState } from "react";
import CaseTable from "../MaterialUI/CaseTable";
import { getCaselistState } from "../Redux/Actions/caselistActions";
import { connect } from "react-redux";
import {
  getFilterPeriod,
  getFilterValue,
  setFilterPeriod,
  setFilterValue,
} from "../Utilities/Filters";

function SearchCase(props) {
  const {
    setCaseList,
    fullList,
    setError,
    loadData,
    setInputValue,
    inputValue,
  } = props;

  function filterList(input) {
    const filtered = fullList.filter((c, i) => {
      return (
        c.ID.toString() === input ||
        c.UserId.toString().toUpperCase() === input.toUpperCase() ||
        c.Status.toString().toUpperCase() === input.toUpperCase()
      );
    });

    if (filtered.length > 0) {
      setError(false);
      setCaseList(filtered);
      setInputValue("");
    } else {
      setError(true);
      setCaseList(filtered);
      setInputValue("");
    }
  }

  function findInFCRM(input) {
    setFilterValue(input);
    setFilterPeriod(90);
    loadData();
    setInputValue("");
  }

  function findInFCRMHistory(input) {
    setFilterValue(input);
    setFilterPeriod(0);
    loadData();
    setInputValue("");
  }
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search for case by id, user or status"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />

      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => filterList(inputValue)}
        >
          In selected
        </button>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => findInFCRM(inputValue)}
        >
          In 90 days
        </button>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => findInFCRMHistory(inputValue)}
        >
          In all cases
        </button>
      </div>
    </div>
  );
}

function CaseList(props) {
  const [caseList, setCaseList] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const loggedUser = sessionStorage.getItem("loggeduser");

  function openSelected(c) {
    props.history.push({
      pathname: "/case",
      state: c,
    });
  }

  function getMyCases() {
    setFilterValue(loggedUser);
    setFilterPeriod(90);
    loadData();
    setInputValue("");
  }

  function loadData() {
    props.getCaselistState(getFilterValue(), getFilterPeriod());
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setFullList(props.caseList.cases);
    setCaseList(props.caseList.cases);
    if (props.caseList.cases.length < 1) {
      setError(true);
    } else {
      setError(false);
    }
  }, [props.caseList.cases]);

  return (
    <div>
      <div className="row">
        <div className="col-4 input-group">
          <SearchCase
            setCaseList={setCaseList}
            setFullList={setFullList}
            caseList={caseList}
            fullList={fullList}
            setError={setError}
            loadData={loadData}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          {error ? <h4 className="text-danger">Nothing found!</h4> : null}
        </div>
        <div className="col-4">
          <button className="btn btn-outline-info" onClick={() => getMyCases()}>
            Show my cases
          </button>
        </div>
      </div>
      <CaseTable caseList={caseList} openSelected={openSelected} />
    </div>
  );
}

// export default CaseList;
const mapStateToProps = (state) => {
  return {
    caseList: state.cases,
  };
};
export default connect(mapStateToProps, { getCaselistState })(CaseList);
