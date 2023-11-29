import dynamic from 'next/dynamic';

const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false });

const Chart = ({ highcharts, options, ...props }) => {
	return <HighchartsReact highcharts={highcharts} options={options} {...props} />;
};

export default Chart;
