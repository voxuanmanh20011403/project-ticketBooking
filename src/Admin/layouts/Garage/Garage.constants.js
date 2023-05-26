
export const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "UID",
    },
    {
        id: "NameGarage",
        numeric: false,
        disablePadding: true,
        label: "Tên nhà xe",
    },
    {
        id: "calories",
        numeric: true,
        disablePadding: false,
        label: "Chủ sở hữu",
    },
    {
        id: "fat",
        numeric: true,
        disablePadding: false,
        label: "Địa chỉ",
    },
    {
        id: "carbs",
        numeric: true,
        disablePadding: false,
        label: "Hotline",
    },
    {
        id: "protein",
        numeric: true,
        disablePadding: false,
        label: "Số xe ",
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
export function createData(name, calories, fat, carbs, protein, id,ID_Garage) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      id,
      ID_Garage
    };
}
