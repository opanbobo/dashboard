require('highcharts/modules/map')(Highcharts);
import Highcharts from 'highcharts';
import { Chart } from 'components';

import indo from 'constant/map.json';

const Geo = ({ style, className, options, series, clickEvent, ...props }) => {
	const chartOptions = {
		chart:{
			backgroundColor: '#ffffff59',
		},
		title: {
			text: '',
		},
		plotOptions: {
			map: {
				states: {
					hover: {
						color: '#4b79be',
					},
				},
			},
			series: {
				point: {
					events: {
						click: (event) => {
							clickEvent(event.point.name);
						},
					},
				},
			},
		},
		colorAxis: {
			min: 0,
			minColor: 'rgba(25, 144, 255, 0.1)',
			maxColor: 'rgba(0, 106, 180, 1)',
			max: 10,
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
		},

		subtitle: {
			text: '',
			floating: true,
			align: 'right',
			y: 50,
			style: {
				fontSize: '16px',
			},
		},
		series: [
			{
				mapData: indo,
				data: options.map((item) => {
					return [item.key.toUpperCase(), item.value];
				}),
				name: '',
				dataLabels: {
					enabled: false,
					format: '{point.name}',
				},
			},
		],
		mapNavigation: {
			enabled: true,
			buttonOptions: {
				verticalAlign: 'bottom',
			},
		},
		credits: {
			enabled: false,
		},
		...options,
	};

	return (
		<div id='chart' className={className}>
			<Chart constructorType='mapChart' highcharts={Highcharts} options={chartOptions} {...props} />
		</div>
	);
};

export default Geo;
