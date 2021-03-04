import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export function ActionReasonAccordion(props) {
  const { investigation, conclusion, reportType } = props;
  const classes = useStyles();

  let investigationClass =
    reportType === "STR" && !investigation ? "bg-warning text-dark" : null;

  let conclusionClass =
    reportType === "STR" && !conclusion ? "bg-warning text-dark" : null;
  return (
    <div className="container-fluid">
      <Accordion>
        <AccordionSummary
          className={investigationClass}
          //   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Investigation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{investigation}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          className={conclusionClass}
          //   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Conclusion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{conclusion}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export function FieldsAccordion(props) {
  const { caseDetails, reportType } = props;
  const classes = useStyles();

  let suspicionIndicatorsArray = [
    caseDetails.SI1,
    caseDetails.SI2,
    caseDetails.SI3,
  ];

  let suspicionIndicators = suspicionIndicatorsArray.filter((si, i) => {
    return si !== null && si !== undefined;
  });

  let riskIndicatorsArray = [
    caseDetails.RI1,
    caseDetails.RI2,
    caseDetails.RI3,
    caseDetails.RI4,
    caseDetails.RI5,
    caseDetails.RI6,
    caseDetails.RI7,
  ];

  let riskIndicators = riskIndicatorsArray.filter((si, i) => {
    return si !== null && si !== undefined;
  });

  let suspicionClass =
    reportType === "STR" && suspicionIndicators.length < 1
      ? "bg-warning text-dark"
      : null;
  let riskClass =
    reportType === "STR" && riskIndicators.length < 1
      ? "bg-warning text-dark"
      : null;

  return (
    <div className="container-fluid">
      <Accordion>
        <AccordionSummary
          className={suspicionClass}
          //   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Suspicion Indicators
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{suspicionIndicators.join()}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          className={riskClass}
          //   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Risk Indicators</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{riskIndicators.join()}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
