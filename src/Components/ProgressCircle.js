import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(9),
    },
  },
}));

export function CircularProgressBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

export function LinearProgressBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <LinearProgress /> */}
      <LinearProgress color="secondary" />
    </div>
  );
}
