export default {
    LOGOUT: () => {
        axios.post('/logout').then(response => {
            window.location.href = '/'
        }).catch(e => {
            console.log(e.response.data)
        })
    }
}