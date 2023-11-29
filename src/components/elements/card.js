import { Card as Cards } from 'antd';
import { Loading } from 'components';

const { Meta } = Cards;

export default function Card({ children, shadow = true, bordered = false, onLoading, meta, ...props }) {
	return (
		<Cards
			size='small'
			bordered={bordered}
			style={{
				borderRadius: 5,
				boxShadow: `${shadow == true ? '3px 0px 20px -12px rgba(54, 65, 76, 0.5)' : ''}`,
			}}
			headStyle={{
				textTransform: 'capitalize',
				borderColor: 'rgba(54, 65, 76, 0.08)',
			}}
			{...props}
		>
			{onLoading == true && <Loading />}
			{children}
			{meta ? <Meta title={meta.title} description={meta.description} /> : null}
		</Cards>
	);
}
