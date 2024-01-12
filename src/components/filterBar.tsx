import * as React from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
    //   maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function FilterBar(props: any){
    const [personName, setPersonName] = React.useState<string[]>([]);

    return (
        <div style={{margin: "10px"}}>
            
            <Grid container spacing={2}> 

                <Grid item md={6}>
                    <div>
                        <FormControl sx={{ m: 1, width: 250 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Account Name</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            // onChange={handleChange}
                            input={<OutlinedInput label="Account Name" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </div>
                </Grid>
                
                
                <Grid item md={6}>
                    <div>
                        <FormControl sx={{ m: 1, width: 250 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Protfolio Name</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            // onChange={handleChange}
                            input={<OutlinedInput label="Protfolio Name" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </div>
                </Grid>
                
            
            </Grid>


            
            <Grid container spacing={2}> 

                <Grid item md={6}>
                    <div>
                        <FormControl sx={{ m: 1, width: 250 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Loan Number</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            // onChange={handleChange}
                            input={<OutlinedInput label="Account Name" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </div>
                </Grid>


                <Grid item md={6}>
                    <div>
                        <FormControl sx={{ m: 1, width: 250 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Loan Status</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            // onChange={handleChange}
                            input={<OutlinedInput label="Account Name" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </div>
                </Grid>


            </Grid>
                            
            <div style={{marginTop: "20px"}}>
                <DateRangePickerComponent title="Funded Date" placeholder="Funded Date"/>
            </div>
  
        </div>
        
        )

}

export default FilterBar