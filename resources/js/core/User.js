import api from '../api'

class User {

	constructor(){
		this.resource = '/users'
	}

	getUsers(){
		return api.get(`${resource}`)
	}

}