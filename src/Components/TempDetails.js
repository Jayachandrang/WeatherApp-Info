import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined'
import TempChart from './TempChart'
import * as constants from './../Common/constant'

export default function TempDetails({ data, datesList, selectedDate, highlightedDate, format }) {
    const [chartData, setChartData] = useState([])
    const [selDate, setSelDate] = useState(highlightedDate)
    const defaultSeldateIndex = constants.DEFAULT_SEL_DATE_INDEX

    useEffect(() => {
        _.forEach(data, function (value) {
            value.isSelected = false
        });

        if (data[selDate])
            setChartData(data[selDate])

        if (!selDate && datesList.length > 0) {
            setSelDate(datesList[defaultSeldateIndex])
            setChartData(data[datesList[defaultSeldateIndex]])
        }
    }, [datesList, data, selDate, defaultSeldateIndex])

    const listItems = datesList.map((item) => {

        if (data[item] && data[item].length > 0) {
            return <Card
                key={item}
                onClick={() => {
                    data[item].isSelected = true
                    selectedDate(selDate)
                    setSelDate(item)
                    setChartData(data[item])
                }}
                className={(data[item].isSelected || data[item][0].date === selDate ? 'active' : '') + ' card-size'}>
                <CardContent>
                    <Typography variant="h4" component="h3">
                        Temp:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {data[item][0].value} <FiberManualRecordOutlinedIcon className="degrees" /> {format[0]}
                    </Typography>
                    <Typography variant="h4" component="h3">
                        Date:
                    </Typography>
                    <Typography variant="h6" component="h3">
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
