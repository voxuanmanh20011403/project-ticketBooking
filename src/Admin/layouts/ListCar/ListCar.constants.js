export const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "ID xe",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Thuộc nhà xe",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Loại xe",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Số ghế",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Biển số",
  },
  {
    id: "fromto",
    numeric: true,
    disablePadding: false,
    label: "Điểm đi - Điểm đến ",
  },
  {
    id: "hotline",
    numeric: true,
    disablePadding: false,
    label: "Điện thoại",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Giá vé",
  },
];
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

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
export function stableSort(array, comparator) {
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

//HÀM CREATE
export function createData(
  id,
  Namegarage,
  TypeVehicle,
  seat,
  LicensePlate,
  fromto,
  hotline,
  Price,
  EndPoint,
  StartPoint,
  PakingEnd,
  PakingStart,
  duration
) {
  return {
    id,
    Namegarage,
    TypeVehicle,
    seat,
    LicensePlate,
    fromto,
    hotline,
    Price,
    EndPoint,
    StartPoint,
    PakingEnd,
    PakingStart,
    duration,
  };
}
