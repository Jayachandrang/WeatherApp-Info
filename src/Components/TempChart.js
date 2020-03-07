import React, {useState, useEffect, useRef} from 'react'
import BarChart from 'react-bar-chart';

export default function TempChart(report) {
	
    let data = report.data
	const [chartWidth, setChartWidth] = useState(500);
    const chartRef = useRef(null);
    const margin = {top: 20, right: 20, bottom: 30, left: 40};

	useEffect( () => {
		setChartWidth(chartRef.current.offsetWidth); 
		window.onresize = () => {
			setChartWidth(chartRef.current.offsetWidth); 
		};
	},[chartWidth])
	   
    return (
        <div ref={chartRef}>
            <div style={{width: '100%'}}> 
                <BarChart
                    width={chartWidth}
                    height={500}
                    margin={margin}
                    data={data}/>
            </div>
        </div>        
    )
}
