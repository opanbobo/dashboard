import { Tree as Trees } from 'antd';

const Tree = ({ className, expandKey, selectedKey, checkedKey, data, ...props }) => {
	return (
		<div style={{ padding: 8, border: '1px dashed rgba(54, 65, 76, 0.3)' }}>
			<Trees
				checkable
				defaultExpandedKeys={expandKey}
				defaultSelectedKeys={selectedKey}
				defaultCheckedKeys={checkedKey}
				treeData={data}
				{...props}
			/>
		</div>
	);
};

export default Tree;
