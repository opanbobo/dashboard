import { Button as Buttons } from 'antd';
import Icon from './icon';

function Button({ className, block, danger, type, icons, children, style, href, ...props }) {
	return (
		<Buttons
			style={style}
			block={block}
			danger={danger}
			className={`button-component ${className}`}
			type={type}
			icon={icons && <Icon type={icons} {...props} />}
			{...props}
		>
			{children}
		</Buttons>
	);
}

export default Button;
