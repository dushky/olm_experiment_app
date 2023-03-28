import React, {useEffect, useState} from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Select, MenuItem, InputLabel, Grid } from "@mui/material";

import { Update } from "assets/constants";

interface Props {
  options: Update[];
  multiple: boolean;
  label: string;
  change: (e: any) => void;
  selectedValue: Update | Update[] | undefined;
  selectName: string;
  id: string;
}

const useStyles = makeStyles(() => ({
  formControl: {
    width: "100%",
    background: "#FFFFFF",
  },
  indeterminateColor: {
    color: "#ffffff",
  },
}));

const CellDropdown = ({
  options,
  multiple,
  label,
  change,
  selectedValue,
  selectName,
  id,
}: Props) => {
  const classes = useStyles();
    const [selected, setSelected] = useState<string | string[]>("");

    useEffect(() => {
        if (selectedValue) {
            setSelected(
                Array.isArray(selectedValue)
                    ? selectedValue.map((item) => {
                        return item.id;
                    })
                    : selectedValue.id
            )
        }
    }, [selectedValue]);

  const handleChange = (event: any) => {
    const value = event.target.value;

    setSelected(value);
    change(event);
  };

  return (
    <Grid>
      <Select
        required={true}
        labelId="test-select-label"
        multiple={multiple}
        value={selected}
        onChange={handleChange}
        name={selectName}
        id={id}
        fullWidth
        sx={{
          marginTop: "8px",
        }}
      >
        {options.map((option: Update) => (
          <MenuItem value={option.id} id={option.id} key={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <InputLabel
        id="test-select-label"
        sx={{
          marginLeft: "14px",
        }}
      >
        {label}
      </InputLabel>
    </Grid>
  );
};

export default CellDropdown;
