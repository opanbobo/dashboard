import { ApexChart } from 'components';

const EarlyWarning = ({ className, type = 'line', charts, ...props }) => {
	return <ApexChart className={className} id='earlywarning' type={type} {...charts} {...props} />;
};

export default EarlyWarning;
