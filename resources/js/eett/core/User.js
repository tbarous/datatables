import api from '../api'

module.exports = class User {

	constructor(){
		this.resource = '/users'
	}

	getUsers(){
		return api.get(`${resource}`)
	}

}

export default User