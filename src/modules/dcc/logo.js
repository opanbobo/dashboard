import { Card, Image } from 'components';

const Logo = ({ className, data, ...props }) => {
	return (
		<Card className={className} {...props}>
			<Image src={data} objectFit='contain' alt='headLogo' height={200} width={200} priority='true' />
		</Card>
	);
};

export default Logo;
