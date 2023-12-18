import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ApexChart({
	id,
	chartOptions,
	title,
	options,
	height = 300,
	width = '100%',
	series,
	type,
	animations = false,
	toolbar = false,
	events,
}) {
	const baseOptions = {
		chart: {
			background: '#65add0',
			title: {
				style: {
					fontSize: '14px',
					fontWeight: 400,
					color: '#263238',
				},
				...title,
			},
			animations: {
				enabled: animations,
			},
			toolbar: {
				show: toolbar,
			},
			dropShadow: {
				enabled: false,
			},
			events: { ...events },
			...chartOptions,
		},
		...options,
	};

	return <Chart id={id} options={baseOptions} height={height} width={width} series={series} type={type} />;
}
