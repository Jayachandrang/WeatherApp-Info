import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment'
import _ from 'lodash'
import Container from '@material-ui/core/Container'
import { Forward } from '@material-ui/icons'
import { fetchReport } from './../Actions/weatherActions'
import TempDetails from './TempDetails'
import TempSelection from './TempSelection'
import * as constants from './../Common/constant'

/*
  This method is used to iterate weather report on day wise.
*/
function WeatherReport() {

	const weatherReport = useSelector(state => state.weatherReducer)
	const [data, setData] = useState({ loading: true })
	const [currentPage, setCurrentPage] = useState(1)
	const [format, setFormat] = useState(constants.CELCIUS)
	const [dayReport, setDayReport] = useState({})
	const [datesList, setDatesList] = useState({})
	const [selDate, setSelDate] = useState('')
	const itemsPerPage = constants.ITEMS_PER_PAGE

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchReport())
	}, [dispatch])

	useEffect(() => {

		let reports = weatherReport.report.reduce((cumm, item) => {
			let date = moment(item.dt_txt).format(constants.DATE_FORMAT)
			let time = moment(item.dt_txt).format(constants.HOUR_FORMAT)
			let sigleRecord = {
				value: (format === constants.FAHRENHEIT) ? Math.round(item.main.temp) : Math.round((item.main.temp - 32) * 5 / 9),
				date: date,
				text: time,
				format: format,
				isSelected: (selDate === date) ? true : false
			};

			if (!cumm[date]) {
				cumm[date] = []

			}
			cumm[date].push(sigleRecord)

			return cumm;
		}, {});
		// Used chunk to split the arrays
		setDatesList(_.chunk(_.keys(reports), itemsPerPage)[currentPage - 1])
		setDayReport(reports);
		setData(weatherReport);
	}, [weatherReport, format, currentPage, itemsPerPage, selDate])

	const selTempFormat = value => {
		setFormat(value)
	};
	const selCurrentPage = cond => {
		setCurrentPage(currentPage + cond)
	};
	const selectedDate = date => {
		setSelDate(date)
	};
	return (
		<div className="App">
			<h2> {constants.TITLE} </h2>
			{
				data.loading ?
					<div className="loader"></div> :
					<Container maxWidth="md" className="base">
						<TempSelection selTempFormat={selTempFormat} />
						<div className="navigation">
							{
								currentPage > 1 ?
									<Forward className="backward" onClick={() => selCurrentPage(-1)} /> : ''
							}
							{
								datesList && datesList.length > -1 && currentPage < datesList.length - 1 ?
									<Forward className="forward" onClick={() => selCurrentPage(1)} /> : ''
							}
						</div>
						{
							datesList && datesList.length > -1 ?
								<TempDetails data={dayReport} datesList={datesList} selectedDate={selectedDate} highlightedDate={selDate} format={format} /> : ''
						}

					</Container>
			}
		</div>
	);
}

export default WeatherReport;
