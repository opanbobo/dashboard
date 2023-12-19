require('highcharts/modules/wordcloud.js')(Highcharts);
import { Chart } from 'components';
import Highcharts from 'highcharts';

const WordCloud = ({ className, options, ...props }) => {
	const chartOptions = {
		background: '#ffffff59',
		title: {
			text: undefined,
		},
		credits: {
			enabled: false,
		},

		...options,
	};
	return (
		<div id='chart' className={className}>
			<Chart highcharts={Highcharts} options={chartOptions} containerProps={{ style: { height: '100%'} }} {...props} />
		</div>
	);
};

export default WordCloud;
