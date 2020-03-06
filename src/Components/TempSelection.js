import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function TempSelection({selTempFormat}) {

    const [value, setValue] = useState('Celcius');
  
    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="position" row name="position" value={value} onChange={(event) => {
                    setValue(event.target.value);
                    selTempFormat(event.target.value);
                }} >
                <FormControlLabel
                    value="Celcius"
                    control={<Radio color="primary" />}
                    label="Celcius"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="Fahrenheit"
                    control={<Radio color="primary" />}
                    label="Fahrenheit"
                    labelPlacement="end"
                />
            </RadioGroup>
        </FormControl>
    )
}
