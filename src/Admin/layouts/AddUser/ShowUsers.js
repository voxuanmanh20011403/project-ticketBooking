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
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import "./ShowUsers.css";
import { Button, Card, Grid } from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { db } from "data/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import MDBox from "Admin/components/MDBox";
import MDTypography from "Admin/components/MDTypography";
import AddUser from "./AddUser/AddUser";
import UpdateUser from "./UpdateUser/UpdateUser";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { auth } from "data/firebase";
import { deleteUser } from "firebase/auth";

//Filter
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

//GET DATA TO TABLE VENUE

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "UID",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Họ và tên",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Số điện thoại",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Mật khẩu",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Quyền",
  },
];

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

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Manage Account
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState(false);
  const [ActiveButtonUpdate, setActiveButtonUpdate] = useState(false);

  function createData(name, calories, fat, carbs, protein, id) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      id,
    };
  }

  useEffect(() => {
    async function fetchData() {
      const accountsCol = collection(db, "Account");
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
  }, [data]);
  const rows = data.map((item) =>
    createData(
      item.Email,
      item.Name,
      item.NumberPhone,
      item.Password,
      item.Role,
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
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleDelete = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        console.log(id);
        await deleteDoc(doc(db, "Account", id));
        //         import { getAuth, deleteUser } from "firebase/auth";
        //  const auth = getAuth();
        const user = auth.currentUser;
        deleteUser(user);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleUpdate = (id, name) => {
    console.log("av", name);
    setId(id);
    setName(name);
  };
  //BUTTON RENDER COMPONENT
  // const  handleSearch=(searchValue) =>{
  //   console.log("Search value:", searchValue);
  //   // Thực hiện các xử lý tìm kiếm tại đây
  // }
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchValue) => {
    // Xử lý tìm kiếm ở đây
    console.log("Searchvalue:", searchValue);
    setSearchTerm(searchValue);
  };

  return (
    // <DashboardLayout>
    //   <Button onClick={() => { setRefreshCount(refreshCount + 1) }}></Button>

    // </DashboardLayout>
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
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
                      <h3 className="h3Title">
                        Quản lý tài khoản người dùng và nhân viên
                      </h3>
                      <div className="btnAdd">
                        <Button
                          onClick={() => setActiveButton(true)}
                          className="btnAddd"
                          style={{ backgroundColor: "black" }}
                        >
                          Thêm admin
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
                                ? Object.values(row).some((val) =>
                                    val
                                      .toString()
                                      .toLowerCase()
                                      .includes(searchTerm.toLowerCase())
                                  )
                                : true
                            )
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.id);
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.name}
                                  selected={isItemSelected}
                                  sx={{ cursor: "pointer" }}
                                  className="abc"
                                >
                                  <TableCell padding="">
                                    <Checkbox
                                      onClick={(event) =>
                                        handleClick(event, row.id)
                                      }
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        "aria-labelledby": labelId,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell align="right" className="id">
                                    <div>
                                    {row.id}
                                    </div>
                                  </TableCell>
                                  <TableCell align="right">
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
                                    {row.protein == 1 ? "nhanvien" : "admin"}
                                  </TableCell>

                                  <TableCell align="right">
                                    <Button
                                      onClick={(id) => {
                                        handleDelete(row.id);
                                      }}
                                    >
                                      <DeleteOutlineIcon />
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
        <UpdateUser
          ActiveButtonUpdate={ActiveButtonUpdate}
          setActiveButtonUpdate={setActiveButtonUpdate}
          name={name}
        />
      ) : (
        <></>
      )}
      {activeButton ? (
        <AddUser
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      ) : (
        <></>
      )}
    </DashboardLayout>
  );
}
