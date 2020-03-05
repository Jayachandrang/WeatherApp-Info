import React, { useState } from 'react';

import TempCardDetails from './TempCardDetails';
import TempChart from './TempChart'


import { useDispatch, useSelector } from "react-redux"

import { Forward } from '@material-ui/icons'
import { fetchReport } from './../Actions/weatherActions'

import TempSelection from './TempSelection'


export default function TempDetails({ data }) {

    const [chartData, setChartData] = useState([]);
    const [date, setdate] = useState([]);
    const [format, setFormat] = useState('Celcius');
    const dispatch = useDispatch()

    let reportList = data.report
    const selectedDate = date => {

        setdate(date)
        let selDate = date.split(' ')[0];
        let newData = reportList.filter(x => (x.dt_txt).indexOf(selDate) > -1)

        let data = [];
        newData.forEach(element => {
            let ele = {
                text: element.dt_txt.split(' ')[1],
                value: format === 'Celcius' ? element.main.temp : element.main.temp_kf
            }
            data.push(ele)
        });
        setChartData(data)
    };

    const handleChange = value => {
        setFormat(value)
        dispatch(fetchReport())
        selectedDate(date)
    };

    const listItems = reportList.map((item) =>

        <TempCardDetails
            key={item.dt.toString()}
            item={item}
            selectedDate={selectedDate}
        />
    );

    return (
        <div>
            <TempSelection handleChange={handleChange} />

            <div className="navigation">
                <Forward className="backward" />
                <Forward className="forward" />
            </div>

            {listItems}
            {chartData.length > 0 ? <TempChart data={chartData} /> : ''}

        </div>
    )
}
