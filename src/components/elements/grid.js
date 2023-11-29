import { Row as Rows, Col as Cols } from 'antd';

function Row({ children, gutter, ...props }) {
	return (
		<Rows
			gutter={
				gutter == null
					? [
							{ xs: 8, sm: 10, md: 10, lg: 12, xl: 12 },
							{ xs: 8, sm: 10, md: 10, lg: 12, xl: 12 },
					  ]
					: gutter
			}
			{...props}
		>
			{children}
		</Rows>
	);
}

function Col({ children, ...props }) {
	return <Cols {...props}>{children}</Cols>;
}

export { Row, Col };
