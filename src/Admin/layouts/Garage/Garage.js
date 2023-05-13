import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import { Button, Card, Grid, IconButton } from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { db } from "data/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import MDBox from "Admin/components/MDBox";
import MDTypography from "Admin/components/MDTypography";
import AddGarage from "./AddGarage/AddGarage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  createData,
  getComparator,
  headCells,
  stableSort,
} from "./Garage.constants";
import UpdateGarage from "./UpdateGarage/UpdateGarage";
import "./Garage.css";

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "calories";
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function Garage() {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const accountsCol = collection(db, "Garage");
      const accountsSnapshot = await getDocs(accountsCol);
      const accountsList = accountsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setData(accountsList);
    }
    fetchData();
  }, []);
  const rows = data.map((item) =>
    createData(
      item.NameGarage,
      item.Owner,
      item.Address,
      item.Hotline,
      item.Number,
      item.id
    )
  );
  useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
  }, [data]);

  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        rows,
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage]
  );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.NameGarage);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, NameGarage) => {
    const selectedIndex = selected.indexOf(NameGarage);
    let newSelected = [];
    console.log(selectedIndex);
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = React.useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0
          ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
          : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage]
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy]
  );

  const isSelected = (NameGarage) => selected.indexOf(NameGarage) !== -1;
  const [show, setShow] = useState(false);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        console.log(id);
        await deleteDoc(doc(db, "Garage", id));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [activeButton, setActiveButton] = useState(false);
  const [ActiveButtonUpdate, setActiveButtonUpdate] = useState(false);
  //form update
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");

  const [hotline, setHotline] = useState("");

  const handleUpdate = (id, name, owner, address, hotline) => {
    setId(id);
    setName(name);
    setOwner(owner);
    setAddress(address);
    setHotline(hotline);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchValue) => {
    // Xử lý tìm kiếm ở đây
    console.log("Searchvalue:", searchValue);
    setSearchTerm(searchValue);
  };
  const [open, setOpen] = React.useState(false);

  return (
    <DashboardLayout>
      {/* <DashboardNavbar />
       */}
      <DashboardNavbar onSearch={handleSearch} />

      <Grid item md={6}>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    <div style={{ width: "100%", display: "flex" }}>
                      <h3 className="h3Title"> Quản lý danh sách nhà xe</h3>
                      <div className="btnAdd">
                        <Button
                          className="btnAddd"
                          onClick={() => setActiveButton(true)}
                          style={{ backgroundColor: "black" }}
                        >
                          Thêm
                        </Button>
                      </div>
                    </div>
                  </MDTypography>
                </MDBox>

                <Box sx={{ width: "100%" }}>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 250 }}
                      aria-labelledby="tableTitle"
                      size={dense ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {visibleRows &&
                          visibleRows
                            .filter((row) =>
                              searchTerm
                                ? Object.values(row).some((val) => {
                                    try {
                                      return val
                                        .toString()
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase());
                                    } catch (err) {
                                      return false;
                                    }
                                  })
                                : true
                            )
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.NameGarage);

                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.NameGarage}
                                  selected={isItemSelected}
                                  sx={{ cursor: "pointer" }}
                                  className="abc"
                                >
                                  <TableCell>
                                    <IconButton
                                      aria-label="expand row"
                                      size="small"
                                      onClick={() => setOpen(!open)}
                                    >
                                      {open ? (
                                        <KeyboardArrowUpIcon />
                                      ) : (
                                        <KeyboardArrowDownIcon />
                                      )}
                                    </IconButton>
                                  </TableCell>
                                  <TableCell align="right">
                                    <div>{row.id}</div>
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      display: "flex",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.calories}
                                  </TableCell>
                                  <TableCell align="right">{row.fat}</TableCell>
                                  <TableCell align="right">
                                    {row.carbs}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.protein}
                                  </TableCell>

                                  <TableCell style={{ display: "flex" }}>
                                    <Button
                                      onClick={(id) => {
                                        handleDelete(row.id);
                                      }}
                                    >
                                      <DeleteOutlineIcon />
                                    </Button>
                                    <Button
                                      onClick={(id) => {
                                        setActiveButtonUpdate(true);
                                        handleUpdate(
                                          row.id,
                                          row.name,
                                          row.calories,
                                          row.fat,
                                          row.carbs
                                        );
                                      }}
                                    >
                                      <UpgradeIcon />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
      {ActiveButtonUpdate ? (
        <UpdateGarage
          ActiveButtonUpdate={ActiveButtonUpdate}
          setActiveButtonUpdate={setActiveButtonUpdate}
          name={name}
          id={id}
          owner={owner}
          address={address}
          hotline={hotline}
        />
      ) : (
        <></>
      )}
      {activeButton ? (
        <AddGarage
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      ) : (
        <></>
      )}
    </DashboardLayout>
  );
}
