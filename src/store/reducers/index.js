import { combineReducers } from 'redux';

import { default as analytic } from './analyticReducers';
import { default as newsClipping } from './newsClippingReducers';
import { default as spokeperson } from './spokespersonReducers';
import { default as filter } from './filterReducers';
import { default as geo } from './geospatialReducers';
import { default as summary } from './summaryReducers';

import { default as mediaConfig } from './mediaReducers';
import { default as categoryConfig } from './categoryReducers';
import { default as subcategoryConfig } from './subCategoryReducers';
import { default as influencerConfig } from './influencerReducers';

import { default as adminCompany } from './adminCompanyReducers';
import { default as adminReducers } from './adminUserReducers';
import { default as searching } from './searchReducers';
import { default as issues } from './issueReducers';

import { default as connect } from './connectReducers';
import { default as stopword } from './stopwordReducers';
import { default as aliases } from './aliasReducers';

import { default as excellconfig } from './excellcolReducers';
import { default as menuReducers } from './menuReducers';

const reducers = combineReducers({
	adminCompany,
	adminReducers,
	analytic,
	newsClipping,
	spokeperson,
	filter,
	mediaConfig,
	categoryConfig,
	subcategoryConfig,
	influencerConfig,
	geo,
	summary,
	searching,
	issues,
	connect,
	stopword,
	aliases,
	excellconfig,
	menuReducers,
});

export default reducers;
