import React from "react";

function getObjects(transaction) {
  const objects = Object.keys(transaction).filter((key, i) => {
    if (typeof transaction[key] === "object") {
      getObjects(transaction[key]);
    }
  });
}

const EditTransaction = (props) => {
  const { transaction } = props;

  const objects = getObjects(transaction);
};

export default EditTransaction;
