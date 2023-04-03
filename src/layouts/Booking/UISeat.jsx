import "./style.css";

// Ghế trống
export const seatEmptyUI = () => {
  return (
    <div className="seat seat__note">
      <svg
        width="32"
        height="40"
        viewBox="0 0 28 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.75"
          y="2.75"
          width="22.5"
          height="34.5"
          rx="2.25"
          fill="#FFF"
          stroke="#B8B8B8"
          stroke-width="1.5"
          stroke-linejoin="round"
        ></rect>
        <rect
          x="5.75"
          y="27.75"
          width="16.5"
          height="6.5"
          rx="2.25"
          fill="#FFF"
          stroke="#B8B8B8"
          stroke-width="1.5"
          stroke-linejoin="round"
        ></rect>
        <path
          class="icon-selected"
          d="M14 8.333A6.67 6.67 0 0 0 7.333 15 6.67 6.67 0 0 0 14 21.667 6.67 6.67 0 0 0 20.667 15 6.669 6.669 0 0 0 14 8.333zm-1.333 10L9.334 15l.94-.94 2.393 2.387 5.06-5.06.94.946-6 6z"
          fill="transparent"
        ></path>
        <path
          class="icon-disabled"
          d="M18.96 11.46l-1.42-1.42L14 13.59l-3.54-3.55-1.42 1.42L12.59 15l-3.55 3.54 1.42 1.42L14 16.41l3.54 3.55 1.42-1.42L15.41 15l3.55-3.54z"
          fill="transparent"
        ></path>
      </svg>
    </div>
  );
};
// Ghế được chọn
export const seatChooseUI = () => {
  return (
    <div className=" seat seat__note_choose">
      <svg
        width="32"
        height="40"
        viewBox="0 0 28 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.75"
          y="2.75"
          width="22.5"
          height="34.5"
          rx="2.25"
          fill="#FFF"
          stroke="#B8B8B8"
          stroke-width="1.5"
          stroke-linejoin="round"
        ></rect>
        <rect
          x="5.75"
          y="27.75"
          width="16.5"
          height="6.5"
          rx="2.25"
          fill="#FFF"
          stroke="#B8B8B8"
          stroke-width="1.5"
          stroke-linejoin="round"
        ></rect>
        <path
          d="M14 8.333A6.67 6.67 0 0 0 7.333 15 6.67 6.67 0 0 0 14 21.667 6.67 6.67 0 0 0 20.667 15 6.669 6.669 0 0 0 14 8.333zm-1.333 10L9.334 15l.94-.94 2.393 2.387 5.06-5.06.94.946-6 6z"
          fill="transparent"
        ></path>
      </svg>
    </div>
  );
};
// Ghế k được chọn
export const seatNullUI = () => {
  return (
    <div className=" seat seat__note_null">
      <svg
        width="32"
        height="40"
        viewBox="0 0 28 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.75"
          y="2.75"
          width="22.5"
          height="34.5"
          rx="2.25"
          fill="#FFF"
          stroke="#B8B8B8"
          stroke-width="1.5"
          stroke-linejoin="round"
          className="rect__seat_null"
        ></rect>
        <rect
          x="5.75"
          y="27.75"
          width="16.5"
          height="6.5"
          rx="2.25"
          fill="#FFF"
          stroke="#B8B8B8"
          stroke-width="1.5"
          stroke-linejoin="round"
          className="rect__seat_null"
        ></rect>
        <path
          class="icon-disabled"
          d="M18.96 11.46l-1.42-1.42L14 13.59l-3.54-3.55-1.42 1.42L12.59 15l-3.55 3.54 1.42 1.42L14 16.41l3.54 3.55 1.42-1.42L15.41 15l3.55-3.54z"
          fill="transparent"
        ></path>
      </svg>
    </div>
  );
};
