const { TextField } = require("@mui/material");

export const CustomTextField = (props) => {
  const { label, name, value, onChange, placeholder } = props;
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="Garage RenderFromGarage "
    />
  );
};
