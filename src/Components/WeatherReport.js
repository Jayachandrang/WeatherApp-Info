import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment'
import _ from 'lodash'
import Container from '@material-ui/core/Container'
import { Forward } from '@material-ui/icons'
import { fetchReport } from './../Actions/weatherActions'
import TempDetails from './TempDetails'
import TempSelection from './TempSelection'

/*
  This method is used to iterate weather report on day wise.
*/
function WeatherReport() {

	const weatherReport = useSelector(state => state.weatherReducer)
	const [data, setData] = useState({ loading: true });
	const [currentPage, setCurrentPage] = useState(1);
	const [format, setFormat] = useState('Celcius');
	const [dayReport, setDayReport] = useState({});
	const [datesList, setDatesList] = useState({});

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchReport())
	}, [dispatch])

	useEffect(() => {
		let reports = weatherReport.report.reduce((cumm, item) => {
			let date = moment(item.dt_txt).format("YYYY-MM-DD");
			let time = moment(item.dt_txt).format("H:00");

			let singleRecord = {
				value: (format === 'Fahrenheit') ? Math.round(item.main.temp) : Math.round((item.main.temp - 32) * 5 / 9),
				date: date,
				text: time,
				format: format
			};

			if (!cumm[date]) {
				cumm[date] = []
			}
			else {
				cumm[date].push(singleRecord);
			}
			return cumm;
		}, {});
		setDatesList(_.keys(reports));
		setDayReport(reports);
		setData(weatherReport);
	}, [weatherReport, format])


	const selTempFormat = value => {
		setFormat(value)
	};

	return (
		<div className="App">
			<h2> Weather Forecast </h2>
			{
				data.loading ?
					<div className="loader"></div> :
					<Container maxWidth="md" className="base">
						<TempSelection selTempFormat={selTempFormat} />
						<div className="navigation">
							<Forward className="backward" />
							<Forward className="forward" />
						</div>
						<TempDetails data={dayReport} datesList={datesList} format={format} />
					</Container>
			}
		</div>
	);
}

export default WeatherReport;
