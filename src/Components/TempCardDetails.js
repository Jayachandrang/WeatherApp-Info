import React, { useState } from 'react';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function TempCardDetails({ item, selectedDate }) {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <Card
            className={(isSelected ? 'active' : '') + ' card-size'}
            onClick={() => {
                setIsSelected(!isSelected)
                selectedDate(item.dt_txt);
            }}
        >
            <CardContent >
                <Typography variant="h5" component="h2">
                    Temp:
                </Typography>
                <Typography variant="h5" component="h2">
                    {item.main.temp} F
                </Typography>
                <Typography variant="h5" component="h2">
                    Date:
                </Typography>
                <Typography variant="h5" component="h2">
                    {item.dt_txt}
                </Typography>
            </CardContent>
        </Card>
    )
}
