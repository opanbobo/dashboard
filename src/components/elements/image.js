import dynamic from 'next/dynamic';
import { Avatar } from 'antd';

const Image = ({ type, className, src, url, ...props }) => {
	const Images = dynamic(() => import('next/image'));
	switch (type) {
		case 'avatar': {
			return <Avatar {...props} />;
		}
		default: {
			return <Images loader={({ src, width, quality }) => {
				return url ? `${url}${src}?w=${width}&q=${quality || 75}` : `${src}?w=${width}&q=${quality || 75}`
			}} className={className} src={src} {...props} />;
		}
	}
};

export default Image;
