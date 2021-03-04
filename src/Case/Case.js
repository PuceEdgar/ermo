import React, { useEffect, useState } from "react";
import ModalWindow from "../Components/ModalWindow";
import TransactionDetailsFull from "../TransactionDetailsFull";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgressBar } from "../Components/ProgressCircle";
import { getCaseState } from "../Redux/Actions/caseActions";
import { connect } from "react-redux";
import {
  createCaseInfo,
  caseInfoExists,
  getCaseInfo,
} from "../Utilities/sessionStorage";
import {
  ActionReasonAccordion,
  FieldsAccordion,
} from "../MaterialUI/Accordions";
import { download } from "../Utilities/GenerateReport";
import TransactionTable from "../MaterialUI/Transactions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50%",
    },
  },
  input: {
    display: "none",
  },
}));

function SelectReport({ setReportType }) {
  return (
    <div className="input-group">
      <select
        className="custom-select"
        id="inputGroupSelect04"
        defaultValue="blank"
        onChange={(e) => setReportType(e.target.value)}
      >
        <option value="blank">Choose type</option>
        <option value="STR">STR</option>
        <option value="AIFT">AIFT</option>
      </select>
    </div>
  );
}

const Case = (props) => {
  const { ID } = (props.location && props.location.state) || {};

  if (!caseInfoExists(ID)) {
    createCaseInfo(ID);
  }

  const [caseReports, setCaseReports] = useState(getCaseInfo(ID));
  const [caseDetails, setCaseDetails] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [reportType, setReportType] = useState();

  const classes = useStyles();

  useEffect(() => {
    props.getCaseState(ID);
  }, []);

  useEffect(() => {
    setCaseDetails(props.case.case);
  }, [props.case.case]);

  function uploadFile(file) {
    setLoading(true);
    let data = new FormData();
    data.append("file", file);
    fetch("http://localhost:9999/home/getstrtransactions", {
      method: "POST",

      body: data,
    })
      .then((response) => response.json())
      .then((success) => {
        if (typeof success === "string") {
          alert("Failed to upload file! " + success);
          setLoading(false);
        } else {
          if (caseReports[reportType].length > 0) {
            let list = caseReports[reportType];
            list.push(success.report.transaction);
            caseReports[reportType] = list.flat();
            sessionStorage.setItem(ID, JSON.stringify(caseReports));
          } else {
            caseReports[reportType] = success.report.transaction;
            sessionStorage.setItem(ID, JSON.stringify(caseReports));
          }

          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <div className="container-fluid">
      <h3 className="text-center">Case {caseDetails.ID} details</h3>
      <h4 className="text-center">
        Case name: <span>{caseDetails.CaseName}</span> | Date Open:{" "}
        <span>{caseDetails.DateOpen}</span>
      </h4>
      <h4 className="text-center">
        Report type: <span>{reportType}</span>
      </h4>

      <div className="row">
        <div className="col-6">
          <h4>Indicators</h4>
          {reportType !== undefined && reportType !== "blank" ? (
            <div>
              <FieldsAccordion
                caseDetails={caseDetails}
                reportType={reportType}
              />
            </div>
          ) : null}
        </div>

        <div className="col-6">
          <h4>Actions</h4>

          <div className="container m-2">
            <SelectReport setReportType={setReportType} />
          </div>
          <div className="container m-2">
            <input
              className={classes.input}
              id="fileinput"
              multiple
              type="file"
              onChange={(e) => uploadFile(e.target.files[0])}
            />
            <label htmlFor="fileinput">
              {reportType === undefined || reportType === "blank" ? null : (
                <Button variant="contained" color="primary" component="span">
                  Add transactions
                </Button>
              )}
            </label>
          </div>
          <div className="container m-2">
            {reportType !== undefined &&
            reportType !== "blank" &&
            caseReports[reportType].length !== 0 ? (
              <div className="row">
                <div className="col-3">
                  <ModalWindow
                    headerName="Full report"
                    buttonName="See full report"
                    bodyComponent={
                      <TransactionDetailsFull value={caseReports[reportType]} />
                    }
                    classDescription="btn btn-success float-center"
                  />
                </div>
                <div className="col-3">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      download(caseReports, reportType, caseDetails)
                    }
                  >
                    Download Report
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="container-fluid">
        <ActionReasonAccordion
          investigation={caseDetails.Investigation}
          conclusion={caseDetails.Conclusion}
          reportType={reportType}
        />
      </div>

      <hr></hr>
      <div className="container-fluid">
        <h4 className="text-center">Transaction list</h4>
        {isLoading === true ? (
          <CircularProgressBar />
        ) : (
          caseReports[reportType] && (
            <TransactionTable transactions={caseReports[reportType]} />
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    case: state.case,
  };
};
export default connect(mapStateToProps, { getCaseState })(Case);
