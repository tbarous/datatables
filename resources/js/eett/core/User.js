import api from '../api'

class User {
	constructor(){
		this.resource = '/users'
		this.username = 
	}

	getUsers(){
		return api.get(`${resource}`)
	}

}