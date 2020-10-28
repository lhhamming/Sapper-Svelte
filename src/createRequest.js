
export default function(user,userEmail,password){
    let req = new Request('/registration', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user,userEmail,password})
    })
    fetch(req)
        .then(response => response.json().then(json =>{
            if(response.status===200){
                console.log('User can register')
                localStorage.setItem('Authorization', json.token)
                return true;
            }else{
                console.log('Error in json message: ' + json.errorMessage)
                //errorMessage = json.errorMessage
                return false
            }
        }))
}