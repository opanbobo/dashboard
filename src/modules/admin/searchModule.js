import { Input } from 'antd';
const Search = Input.Search;

const SearchModule = ({ onSearch, ...props }) => {
	return <Search allowClear onSearch={onSearch} {...props} />;
};

export default SearchModule;
