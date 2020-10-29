<script>
    import {goto} from '@sapper/app'

    import Nav from '../components/Nav.svelte'

    let user
    let password
    let errorMessage

    function loginUser(event){
        event.preventDefault();
        const request = new Request('/credentials', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user,password})
        })
        fetch(request)
            .then(response => response.json()
                .then(json =>{
                    if(response.status==200){
                        console.log("")
                        localStorage.setItem('AUTHTOKEN', json.token)
                        goto('/')
                    }else{
                        console.log('Error in json message: ' + json.errorMessage)
                        errorMessage = json.errorMessage
                    }
                }))
    }
</script>
<style>
    .error{
        color:red;
    }
</style>
<svelte:head>
    <title> Login </title>
</svelte:head>
<form>
    <input type="text" placeholder="Gebruikersnaam" name="username" required bind:value={user}/>
    <input type="password" placeholder="Wachtwoord" name="password" required bind:value={password}/>
    <input type="submit" value="Login" on:click="{loginUser}"/>
</form>

{#if errorMessage}
    <span class="error">{errorMessage}</span>
    {/if}