<script>

    import {goto} from "@sapper/app";

    let user
    let userEmail
    let password
    let errorMessage

    let registerUser = (event) => {
        event.preventDefault();
        console.log("Entering register user")
        let req = new Request('/registration', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user,userEmail,password})
        })
        fetch(req)
            .then(response => response.json().then(json =>{
                if(response.status==200){
                    localStorage.setItem('Authorization', json.token)
                    goto('/about')
                }else{
                    console.log('Error in json message: ' + json.errorMessage)
                    errorMessage = json.errorMessage
                }
            }));
        console.log("Registered user")
        //Dit gaat nu goed. Hij gaat nu fout bij Register.js
    }
</script>
<style>
    .error{
        color:red;
    }
</style>
<svelte:head>
    <title> Register </title>
</svelte:head>
<form>
    <input type="text" placeholder="Gebruikersnaam" name="username" required bind:value={user}/>
    <input type="text" placeholder="Email" name="email" required bind:value={userEmail}/>
    <input type="password" placeholder="Wachtwoord" name="password" required bind:value={password}/>
    <input type="submit" value="Register" on:click={registerUser} />
</form>

{#if errorMessage}
    <span class="error">{errorMessage}</span>
{/if}