import axios from 'axios'
import 'es6-promise/auto'

const baseDomain = 'http://project.local'
const baseURL = `${baseDomain}/api`

export default axios.create({
  baseURL,
  timeout: 1000,
  headers: {'Accept': 'application/json'},
});