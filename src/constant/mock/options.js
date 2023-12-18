export const LineOptions = {
	title: {
		text: 'title',
		align: 'left',
		offsetY: 5,
		floating: true,
		style: {
			fontSize: '14px',
			fontWeight: 400,
			color: '#263238',
		},
	},
	tooltip: {
		shared: false,
	},
	markers: {
		size: 6,
		hover: {
			sizeOffset: 0,
		},
	},
	stroke: {
		width: 4,
		lineCap: 'butt',
	},
	colors: ['#06d6a0', '#1990ff', '#ff6b6b'],
	legend: {
		position: 'bottom',
		horizontalAlign: 'center',
		markers: {
			width: 15,
			height: 4,
			radius: 0,
			offsetY: -2,
		},
	},
};

export const BarHorizontal = {
	chartOptions: {
		stacked: true,
	},
	colors: ['#ff6b6b', '#1990ff', '#06d6a0'],
	title: {
		text: 'title',
		align: 'left',
		offsetY: 5,
		floating: true,
		style: {
			fontSize: '14px',
			fontWeight: 400,
			color: '#263238',
		},
	},
	plotOptions: {
		bar: {
			horizontal: true,
			borderRadius: 6,
		},
	},
	xaxis: {
		categories: ['Media A', 'Media B', 'Media C', 'Media D'],
	},
	legend: {
		position: 'bottom',
		horizontalAlign: 'center',
		markers: {
			width: 8,
			height: 8,
			radius: 2,
			offsetY: 0,
		},
	},
};

export const SparklineOptions = {
	chart: {
		background: '#3ebbc2',
		sparkline: {
			enabled: true,
		},
	},
	options: {
		grid: {
			show: false,
		},
		yaxis: {
			show: true,
		},
		legend: {
			show: false,
		},
	},
};
