import { ApexChart } from 'components';

function SummaryTone({ className, charts, ...props }) {
	return <ApexChart className={className} id='summaryTone' type='line' {...charts} {...props} />;
}

export default SummaryTone;
