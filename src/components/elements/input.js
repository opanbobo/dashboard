import { Input as Inputs } from 'antd';
import { Icon, Tooltip } from 'components';

const { TextArea } = Inputs;
const Search = Inputs.Search;

const Input = ({ prefixIcon, suffixIcon, placeholder, type, value, tooltips, iconProps, ...props }) => {
	switch (type) {
		case 'search':
			return <Search placeholder={placeholder == null ? 'search...' : placeholder} {...props} />;
		case 'textarea':
			return <TextArea placeholder={placeholder} {...props} />;
		case 'password':
			return <Inputs.Password placeholder={placeholder} {...props} />;
		case 'number':
			return (
				<Inputs
					type='number'
					min={0}
					prefix={
						prefixIcon != null && (
							<Tooltip title={tooltips}>
								<Icon type={prefixIcon} {...iconProps} />
							</Tooltip>
						)
					}
					suffix={
						suffixIcon != null && (
							<Tooltip title={tooltips}>
								<Icon type={suffixIcon} {...iconProps} />
							</Tooltip>
						)
					}
					placeholder={placeholder}
					{...props}
				/>
			);
		default:
			return (
				<Inputs
					placeholder={placeholder}
					defaultValue={value}
					prefix={
						prefixIcon != null && (
							<Tooltip title={tooltips}>
								<Icon type={prefixIcon} {...iconProps} />
							</Tooltip>
						)
					}
					suffix={
						suffixIcon != null && (
							<Tooltip title={tooltips}>
								<Icon type={suffixIcon} {...iconProps} />
							</Tooltip>
						)
					}
					{...props}
				/>
			);
	}
};

export default Input;
