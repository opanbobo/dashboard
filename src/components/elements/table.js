import { useState, useEffect } from 'react';
import { Table as Tables } from 'antd';
import { Image } from 'components';
import breakPointOberver from 'constant/mediaQuery';

const breakPoints = {
	tablet: '(min-width: 300px) and (max-width: 1023px)',
	desktop: '(min-width: 1024px)',
};

const Table = ({ data, column, ...props }) => {
	const [breakPoint, isBreakPoint] = useState();

	useEffect(() => {
		breakPointOberver(breakPoints, isBreakPoint);
	}, [breakPoint]);

	return (
		<Tables
			size='small'
			dataSource={data}
			columns={column}
			{...props}
			scroll={{ y: breakPoint == 'tablet' ? '65vh' : '50vh' }}
		/>
	);
};

const ColumnList = ({
	bold = false,
	title,
	children,
	content,
	type = ['default', 'action'],
	ellipsis = false,
	img,
	...props
}) => {
	return (
		<>
			<div style={ellipsis == true ? styleEllipsis : styleDefault} {...props}>
				<div style={{ textTransform: 'capitalize', fontWeight: bold == true ? '600' : '500' }}>
					{title != null && title}
				</div>
				{type == null || <div style={ellipsis == true ? textEllipis : {}}>{content}</div>}

				{type == 'action' && (
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
							alignItems: 'center',
							width: '100%',
							maxWidth: breakPoints == 'tablet' ? '100%' : 60,
						}}
					>
						{children}
					</div>
				)}
			</div>
			{img != null && (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div style={{ position: 'relative', width: 30, height: 30, borderRadius: 6 }}>
						<Image
							style={{ borderRadius: 6 }}
							src={img}
							layout='fill'
							objectFit='cover'
							alt='avatar'
							height={30}
							width={30}
							priority='true'
						/>
					</div>
					<div style={{ marginLeft: 5 }}>{children}</div>
				</div>
			)}
		</>
	);
};

const styleDefault = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingRight: '2%',
	marginBottom: 5,
};

const styleEllipsis = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	// alignItems: 'flex-start',
	marginBottom: 5,
};

const textEllipis = {
	display: '-webkit-box',
	maxWidth: '100%',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
};

export { Table, ColumnList };
