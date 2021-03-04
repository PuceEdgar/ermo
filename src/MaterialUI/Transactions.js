import React from "react";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { GetObjectDetails } from "../GetObjects";
import { ValidateData } from "../Utilities/ValidateData";
import TransactionDetails from "../TransactionDetails";

function DetailsButton(props) {
  const { valid, id } = props;
  let btnType = valid ? "btn btn-outline-success" : "btn btn-outline-danger";
  return (
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
  );
}

function Row(props) {
  const { transaction, id, valid, kvp, unvalidItems } = props;

  return (
    <React.Fragment>
      <TableRow>
        <TableCell align="center">SEB account</TableCell>
        <TableCell align="center">SEB name</TableCell>
        <TableCell align="center">Counter account</TableCell>
        <TableCell align="center">Counter name</TableCell>
        <TableCell align="center">{transaction.date_transaction}</TableCell>
        <TableCell align="center">D/C</TableCell>
        <TableCell align="center">{transaction.amount_local}</TableCell>
        <TableCell>
          <DetailsButton valid={valid} id={id} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Box id={`id${id}`} className="collapse" margin={5}>
            <TransactionDetails
              object={transaction}
              num={id}
              kvp={kvp}
              unvalidItems={unvalidItems}
            />
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TransactionTable(props) {
  const { transactions } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const transactionValues = transactions
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((item, i) => {
      let kvp = GetObjectDetails(item);
      let unvalidItems = ValidateData(kvp);
      let valid = unvalidItems.length < 1;

      return (
        <>
          <Row
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

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center">SEB account</TableCell>
              <TableCell align="center">SEB name</TableCell>
              <TableCell align="center">Counter account</TableCell>
              <TableCell align="center">Counter name</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">D/C</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{transactionValues}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
