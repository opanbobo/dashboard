// @ts-nocheck
const fs = require('fs');
const vars = fs.readFileSync('./src/styles/vendor/antd.less', 'utf-8').replace(/,\n/g, ',');

const matchs = vars.match(/^@.*/gm);

const allVars = matchs.map((m) => {
	const mv = m.match(/^@(.*?):.*;/m);
	if (mv && mv[1]) return mv[1];
});

const HEADER = `@import './antd.less';
:root {
`;

const FOOTER = `}
`;

let CONTENT = '';

allVars.forEach((v) => {
	if (!v) return;

	CONTENT += `--${v}: @${v};\n`;
});

fs.writeFileSync('./src/styles/vendor/variables-css.less', `${HEADER}${CONTENT}${FOOTER}`);
