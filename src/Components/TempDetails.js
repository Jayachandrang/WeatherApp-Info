import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TempChart from './TempChart'


export default function TempDetails({ data, datesList, format }) {

    const [chartData, setChartData] = useState([]);
    const [selDate, setSelDate] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (data[selDate])
            setChartData(data[selDate])

        if (!selDate && datesList.length > 0) {
            setSelDate(datesList[0])
            setChartData(data[datesList[0]])
        }
    }, [datesList, data, isSelected])

    const listItems = datesList.map((item) => {
        if (data[item] && data[item].length > 0) {
            return <Card
                key={item}
                onClick={() => {
                    setIsSelected(!isSelected)
                    setSelDate(item)
                    setChartData(data[item])
                }}
                className={(isSelected && data[item][0].date === selDate ? 'active' : '') + ' card-size'}>
                <CardContent >
                    <Typography variant="h5" component="h2">
                        Temp:
                            </Typography>
                    <Typography variant="h5" component="h2">
                        {data[item][0].value} {format[0]}
                            </Typography>
                    <Typography variant="h5" component="h2">
                        Date:
                            </Typography>
                    <Typography variant="h5" component="h2">
                        {data[item][0].date}
                    </Typography>
                </CardContent>
            </Card>
        }
        return ''
    });

    return (
        <div>
            {listItems}
            {chartData.length > 0 ? <TempChart data={chartData} /> : ''}
        </div>
    )
}
