const url = 'http://192.168.2.194:8080'

export const getUsers = ({ resolve, reject }) => {
	fetch(url + "/v1/user", {
		method: 'GET',
	    mode: 'cors',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    }
	})
    .then(function(response) {
        if (response.status >= 400) {
            reject("Bad response from server")
        }
        return response.json()
    })
    .then(function(data) {
    	resolve(data)
    }).catch(function(error){
    	reject(error)
    });
}