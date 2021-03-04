import React from "react";
import TransactionDetails from "../TransactionDetails";

function DetailsButton(props) {
  const { id, valid } = props;
  let btnType = valid ? "btn btn-outline-success" : "btn btn-outline-danger";
  return (
    <td>
      <button
        className={btnType}
        type="button"
        data-toggle="collapse"
        data-target={`#id${id}`}
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Details
      </button>
    </td>
  );
}

function Details(props) {
  const { transaction, id, kvp, unvalidItems } = props;

  return (
    <tr>
      <td colSpan="12">
        <div id={`id${id}`} className="collapse">
          <div className="card card-body">
            <TransactionDetails
              object={transaction}
              num={id}
              kvp={kvp}
              unvalidItems={unvalidItems}
            />
          </div>
        </div>
      </td>
    </tr>
  );
}

export function TableRow(props) {
  const { transaction, id, valid, kvp, unvalidItems } = props;

  return (
    <>
      <tr>
        <td>seb account id</td>
        <td>seb account name</td>
        <td>counterparty id</td>
        <td>counterparty name</td>
        <td>{transaction.date_transaction}</td>
        <td>{transaction.amount_local}</td>
        <DetailsButton id={id} valid={valid} />
      </tr>
      <Details
        transaction={transaction}
        id={id}
        kvp={kvp}
        unvalidItems={unvalidItems}
      />
    </>
  );
}
