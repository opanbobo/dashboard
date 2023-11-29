import { ApexChart } from 'components';

const MediaTone = ({ className, charts, ...props }) => {
	return <ApexChart id='mediaTone' type='bar' className={className} {...charts} {...props} />;
};

export default MediaTone;
