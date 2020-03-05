import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Container from '@material-ui/core/Container'
import {fetchReport} from './../Actions/weatherActions'

import TempDetails from './TempDetails'




function WeatherReport() {

	const weatherReport = useSelector(state => state.weatherReducer)
	
	const [data, setData] = useState({loading: true});
	const [currentPage, setCurrentPage] = useState(1);
	const dispatch = useDispatch()

	useEffect(() => {
        dispatch(fetchReport())
        setData(weatherReport)
	}, [dispatch])

	useEffect(() => {
		setData(weatherReport);
	}, [weatherReport])



	return (
		
		<div className="App">
			<h2> Weather Info </h2>
			{data.loading ? <div className="loader"></div> : 
				<Container maxWidth="md" className="base">
					
					
					<TempDetails data={data} />

					
					
				</Container>
			}
		</div>
	);
}

export default WeatherReport;
