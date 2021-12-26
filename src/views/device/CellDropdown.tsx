import React, {useState} from 'react'

import { makeStyles } from "@material-ui/core/styles";


import { Select, MenuItem, InputLabel, Grid } from '@mui/material'

import { Update } from 'assets/constants';




interface Props {   
    options: Update[],
    multiple: boolean,
    label: string,
    change: (e: any) => void,
    selectedValue: Update | Update[],
    selectName: string
}

const useStyles = makeStyles(() => ({
    formControl: {
      width: '100%',
      background: "#FFFFFF"
    },
    indeterminateColor: {
      color: "#ffffff"
    }
  }));

const CellDropdown = ({options, multiple, label, change, selectedValue, selectName}: Props) => {
    const classes = useStyles();
    const [selected, setSelected] = useState<string | string[]>(Array.isArray(selectedValue) ? 
      selectedValue.map((item) => {return item.id})
    : selectedValue.id);
    
    const handleChange = (event: any) => {
        const value = event.target.value;
        console.log(event);
        
        setSelected(value);
        change(event)
    };

    console.log(selected);
    

    return (
        <Grid>
          <InputLabel id="test-select-label">{label}</InputLabel>
          <Select
            labelId="test-select-label"
            multiple={multiple}
            value={selected}
            onChange={handleChange}
            name={selectName}
            fullWidth
          >
            {options.map((option: Update) => (
              <MenuItem value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
    );
}

export default CellDropdown
