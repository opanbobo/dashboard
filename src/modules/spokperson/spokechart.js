import { ApexChart, Card } from 'components';

const SpokeChart = ({ className, cards, charts }) => {
	return (
		<Card {...cards}>
			<ApexChart className={className} type='bar' {...charts} />
		</Card>
	);
};

export default SpokeChart;
