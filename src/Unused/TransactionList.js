import React from "react";
import { TableRow } from "../Components/TableRowAll";
import { GetObjectDetails } from "../GetObjects";
import { ValidateData } from "../Utilities/ValidateData";

const Table = (props) => {
  const { transactions } = props;
  return (
    <table className="table align-items-center">
      <thead>
        <tr>
          <th scope="col">Account</th>
          <th scope="col">Name</th>
          <th scope="col">Counter account</th>
          <th scope="col">Counter name</th>
          <th scope="col">Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>{transactions}</tbody>
    </table>
  );
};

function TransactionList(props) {
  const { transactions } = props;

  const transactionValues = transactions.map((item, i) => {
    let kvp = GetObjectDetails(item);
    let unvalidItems = ValidateData(kvp);
    let valid = unvalidItems.length < 1;

    return (
      <>
        <TableRow
          key={i}
          transaction={item}
          id={i}
          valid={valid}
          kvp={kvp}
          unvalidItems={unvalidItems}
        />
      </>
    );
  });
  return <Table transactions={transactionValues} />;
}

export default TransactionList;
