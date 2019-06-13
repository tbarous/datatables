import axios from 'axios'
import 'es6-promise/auto'

const baseDomain = 'http://project.local'
const baseURL = `${baseDomain}/api`

import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 3 });

export default axios.create({
	baseURL,
	timeout: 1000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'multipart/form-data'
	}
});