import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
export default function CommonAutoComplatete({
  setState,
  options,
  lableValueFrom,
  inputName,
  value,
}) {
  const onHandleClick = (e) => {
    setState(e.target.value);
  };
  const onHandleChange = (e) => {
    if (!e.target.value) {
      setState("");
    }
  };

  const onHandleKey = (e) => {
    if (e.key === "Enter") {
      setState(`${e.target.value}`.trim());
    }
  };

  const onHandleKey2 = (e) => {
    if (e.key === "Enter") {
      setState(`${e.target.value}`.trim());
    }
  };

  return (
    // <>
    //   <button onClick={() => console.log(options)}>test</button>
    // </>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={inputName}
          value={value}
          onKeyDown={onHandleKey2}
          // onChange={(e) => setTextInput(e.target.value)}
        />
      )}
      onChange={onHandleChange}
      onKeyDown={onHandleKey}
      onSelect={onHandleClick}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
