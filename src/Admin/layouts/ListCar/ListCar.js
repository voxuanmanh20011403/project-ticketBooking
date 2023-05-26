import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
import { Button, Card, Grid } from "@mui/material";
import { db } from "data/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import MDBox from "Admin/components/MDBox";
import MDTypography from "Admin/components/MDTypography";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  createData,
  getComparator,
  headCells,
  stableSort,
} from "./ListCar.constants";
import AddCar from "./AddCar/AddCar";
import UpdateListCar from "./UpdateListCar/UpdateListCar";
import { toast } from "react-toastify";

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
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
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

export default function ListCar() {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const accountsCol = collection(db, "ListCar");
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
  console.log("data.data", data.length);

  const rows = data.map((item) =>
    createData(
      item.id,
      item.Namegarage,
      item.TypeVehicle,
      item.seat,
      item.PakingStart + "-" + item.EndPoint,
      item.LicensePlate,
      item.Hotline,
      item.Price,
      item.EndPoint,
      item.StartPoint,
      item.PakingEnd,
      item.PakingStart,
      item.duration
    )
  );
  console.log("rows", rows);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Namegarage);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, Namegarage) => {
    const selectedIndex = selected.indexOf(Namegarage);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Namegarage);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // Avoid a layout jump when reaching the last page with empty rows.
  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const isSelected = (Namegarage) => selected.indexOf(Namegarage) !== -1;
  const [show, setShow] = useState(false);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        console.log(id);
        await deleteDoc(doc(db, "ListCar", id));
        toast.success("Xoá xe thành công!", {
          autoClose: 1000,
        });
      } catch (error) {
        toast.error("Xoá xe thất bại!", {
          autoClose: 1000,
        });
      }
    }
  };
  const [activeButton, setActiveButton] = useState(false);
  const [ActiveButtonUpdate, setActiveButtonUpdate] = useState(false);
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [pakingEnd, setPakingEnd] = useState("");
  const [pakingStart, setPakingStart] = useState("");
  const [duration, setduration] = useState("");

  //update
  const handleUpdate = (
    id,
    price,
    EndPoint,
    StartPoint,
    PakingEnd,
    PakingStart,
    duration
  ) => {
    setPrice(price);
    setId(id);
    setEndPoint(EndPoint);
    setStartPoint(StartPoint);
    setPakingEnd(PakingEnd);
    setPakingStart(PakingStart);
    setduration(duration);
  };
  //searerch
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchValue) => {
    // Xử lý tìm kiếm ở đây
    console.log("Searchvalue:", searchValue);
    setSearchTerm(searchValue);
  };
  return (
    <DashboardLayout>
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
                  marginTop="10px"
                >
                  <MDTypography variant="h6" color="white">
                    <div style={{ width: "100%", display: "flex" }}>
                      <h3 className="h3Title"> Quản lý danh sách xe</h3>
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
                                  key={row.Namegarage}
                                  selected={isItemSelected}
                                  sx={{ cursor: "pointer" }}
                                  className="abc"
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      onClick={(event) =>
                                        handleClick(event, row.Namegarage)
                                      }
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        "aria-labelledby": labelId,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell align="right">
                                    <div>{row.id}</div>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                  >
                                    {row.Namegarage}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.TypeVehicle}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.seat}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.fromto}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.LicensePlate}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.hotline}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.Price.toLocaleString()}
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
                                          row.Price,
                                          row.EndPoint,
                                          row.StartPoint,
                                          row.PakingEnd,
                                          row.PakingStart,
                                          row.duration
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
        <UpdateListCar
          ActiveButtonUpdate={ActiveButtonUpdate}
          setActiveButtonUpdate={setActiveButtonUpdate}
          price={price}
          id={id}
          endPoint={endPoint}
          startPoint={startPoint}
          pakingEnd={pakingEnd}
          pakingStart={pakingStart}
          duration={duration}
        />
      ) : (
        <></>
      )}
      {activeButton ? (
        <AddCar
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          data={data}
        />
      ) : (
        <></>
      )}
    </DashboardLayout>
  );
}
