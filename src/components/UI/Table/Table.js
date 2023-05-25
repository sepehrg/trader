import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { default as MuiTable } from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import TablePaginationActions from "./tablePaginationActions/tablePaginationActions";
import Link from "../Link/Link";
import clsx from "clsx";
import Checkbox from "../checkbox/checkbox";
import ChangeHighlight from "../changeHighlight/changeHighlight";
import Spinner from "../spinner/spinner";
import OpenFolderIcon from "../icons/openFolder";

const useStyles = makeStyles((theme) => ({
  sizeSmall: {
    padding: 6,
  },
  selectInput: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.border.primary}`,
    borderRadius: 4,
    marginRight: 8,
    marginLeft: 22,
  },
  caption: {
    fontSize: 11,
    color: theme.palette.text.secondary,
  },
  spinner: {
    width: "100%",
    textAlign: "center",
  },

  emptyBodyRow: {
    height: 75,
  },
  emptyBody: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  emptyBodyIcon: {
    height: 36,
    width: 36,
    fill: `${theme.palette.icon.primary}66`,
  },
  containerHighlight: {
    height: "100%",
  },

  pagination: {
    position: "sticky",
    bottom: 0,
    backgroundColor: theme.palette.background.box,
    boxShadow: "0px -2px 5px 0px #0001",
  },
  toolbar: {
    minHeight: 40,
  },
}));

const Table = (props) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);
  const [checked, setChecked] = useState([]);
  const [checkboxAllChecked, setCheckboxAllChecked] = useState(false);

  const changePageHandler = (event, newPage) => {
    setPage(newPage);
    props.onPageChange(newPage + 1);
  };

  const changeRowsPerPageHandler = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    props.onRowsPerPageChange(parseInt(event.target.value));
    setPage(0);
  };

  const checkboxAllChangeHandler = (event) => {
    setCheckboxAllChecked(event.target.checked);
    setChecked([]);
    if (event.target.checked)
      setChecked(props.data.map((row) => row[Object.keys(row)[0]]));
  };

  const checkboxChangeHandler = (event, id) => {
    if (event.target.checked) setChecked([...checked, id]);
    else setChecked(checked.filter((item) => item !== id));
  };

  useEffect(() => {
    if (props.showCheckbox) {
      if (checked.length && checked.length === props.data.length)
        setCheckboxAllChecked(true);
      else setCheckboxAllChecked(false);
      props.onCheckedItemsChange(checked);
    }
  }, [checked]);

  const sortedRowsPerPage = [5, 10, 25, props.pageSize || 25]
    .filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .sort(function (a, b) {
      return a - b;
    });

  const table = (
    <MuiTable
      className={props.className}
      size="small"
      stickyHeader={props.stickyHeader}
    >
      {!props.hideHeader && (
        <TableHead className={props.tableHeadClassName}>
          <TableRow>
            {props.showCheckbox && (
              <TableCell padding="checkbox" className={classes.Checkbox}>
                <Checkbox
                  checked={checkboxAllChecked}
                  onChange={checkboxAllChangeHandler}
                />
              </TableCell>
            )}
            {props.schema.columns.map(
              (col) =>
                !col.hide && (
                  <TableCell
                    key={col.field}
                    align={col.align ?? "center"}
                    width={col.width}
                    classes={{ sizeSmall: classes.sizeSmall }}
                  >
                    {col.title}
                  </TableCell>
                )
            )}
            {props.schema.operations && (
              <TableCell align="center" width={props.operationsWidth}>
                عملیات
              </TableCell>
            )}
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        <>
          {props.loading ? (
            <TableRow>
              <TableCell
                className={classes.spinner}
                colSpan={
                  props.schema.columns.length +
                  (props.schema.operations ? 1 : 0)
                }
              >
                <Spinner size={30} />
              </TableCell>
            </TableRow>
          ) : props.data?.length > 0 ? (
            props.data.map((row, idx) => (
              <TableRow
                key={idx}
                className={props.rowClassName}
                onClick={() => (props.onRowClick ? props.onRowClick(row) : {})}
              >
                {props.showCheckbox && (
                  <TableCell padding="checkbox" className={props.classToggle}>
                    <Checkbox
                      checked={checked.some(
                        (c) => c === row[Object.keys(row)[0]]
                      )}
                      onChange={(event) =>
                        checkboxChangeHandler(event, row[Object.keys(row)[0]])
                      }
                    />
                  </TableCell>
                )}
                {props.schema.columns.map((col, index) => {
                  const additionals = col.additionals
                    ? col.additionals.map((add) => row[add])
                    : [];
                  return (
                    !col.hide && (
                      <TableCell
                        key={index}
                        align={col.align ?? "center"}
                        className={clsx({
                          [col.alternateClassName]: (idx + 1) % 2,
                          [col.className]: true,
                        })}
                        classes={{ sizeSmall: classes.sizeSmall }}
                        ref={React.createRef()}
                      >
                        {col.format
                          ? col.format(row[col.field], ...additionals)
                          : row[col.field]}
                      </TableCell>
                    )
                  );
                })}

                {props.schema.operations && (
                  <TableCell align="center">
                    <Grid container justify="center">
                      {props.schema.operations.map((o) => {
                        return !o.hide || !o.hide(row) ? (
                          <Link
                            key={
                              typeof o.title === "function"
                                ? o.title(row)
                                : o.title
                            }
                            title={
                              typeof o.title === "function"
                                ? o.title(row)
                                : o.title
                            }
                            component={
                              typeof o.icon === "function"
                                ? o.icon(row)
                                : o.icon
                            }
                            tooltipPlacement="top"
                            onClick={() => o.action(row)}
                            tooltipColor={
                              typeof o.tooltipColor === "function"
                                ? o.tooltipColor(row)
                                : o.tooltipColor
                            }
                          />
                        ) : (
                          ""
                        );
                      })}
                    </Grid>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className={classes.spinner}
                colSpan={
                  props.schema.columns.length +
                  (props.schema.operations ? 1 : 0)
                }
              >
                <div className={classes.emptyBody}>
                  <OpenFolderIcon className={classes.emptyBodyIcon} />
                  لیست خالی میباشد
                </div>
              </TableCell>
            </TableRow>
          )}
          {props.pageSum && (
            <TableRow className={props.footerClassName}>
              <TableCell align="center">جمع صفحه</TableCell>
              {props.schema.columns.slice(1).map((col) => (
                <TableCell key={col.field} align={col.align ?? "center"}>
                  {props.pageSum[col.field]
                    ? col.format
                      ? col.format(props.pageSum[col.field])
                      : props.pageSum[col.field]
                    : ""}
                </TableCell>
              ))}
            </TableRow>
          )}
          {props.totalSum && (
            <TableRow className={props.footerClassName}>
              <TableCell align="center">جمع کل</TableCell>
              {props.schema.columns.slice(1).map((col) => (
                <TableCell key={col.field} align={col.align ?? "center"}>
                  {props.totalSum[col.field]
                    ? col.format
                      ? col.format(props.totalSum[col.field])
                      : props.totalSum[col.field]
                    : ""}
                </TableCell>
              ))}
            </TableRow>
          )}
        </>
      </TableBody>
      {props.paging && (
        <TableFooter>
          <TableRow className={classes.pagination}>
            <TablePagination
              rowsPerPageOptions={sortedRowsPerPage}
              count={props.totalRecords || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page s" },
                native: true,
              }}
              classes={{
                selectRoot: classes.selectInput,
                caption: classes.caption,
                toolbar: classes.toolbar,
              }}
              labelRowsPerPage="تعداد سطر در هر صفحه"
              onChangePage={changePageHandler}
              onChangeRowsPerPage={changeRowsPerPageHandler}
              ActionsComponent={TablePaginationActions}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} از ${count !== -1 ? count : count}`
              }
            />
          </TableRow>
        </TableFooter>
      )}
    </MuiTable>
  );

  return (
    <>
      {props.highlight ? (
        <ChangeHighlight containerHighlight={classes.containerHighlight}>
          {table}
        </ChangeHighlight>
      ) : (
        table
      )}
    </>
  );
};

export default Table;
