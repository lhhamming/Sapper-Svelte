<script>
    import {onMount} from 'svelte'
    import {getAuctionItem, getToken} from "./util";

    let auctionItem
    let cannotSubmit = true;

    let inputs;
    let inputName
    let inputBid
    let inputType
    let inputTime

    onMount( () =>{
        getUpdateItem();
        inputs = document.querySelectorAll('#form input')
        console.log('every input' + inputs)
        console.log(inputName)
    })

    function getUpdateItem(){
        const itemFromStorage = localStorage.getItem('updateAuction')
        getAuctionItem(itemFromStorage).then(result => {
            console.log(result);
            auctionItem = result
        })
    }

    function test(){
        inputName = document.getElementById('auctionName')
        inputBid = document.getElementById('auctionBid')
        inputType = document.getElementById('auctionType')
        inputTime = document.getElementById('auctionTime')
        if(inputName.value != '' || inputBid.value != '' || inputType !== '' || inputTime != ''){
            cannotSubmit = false;
        }
    }

    let updateItem = (event) =>{
        event.preventDefault()
        const xhr = new XMLHttpRequest()
        const token = getToken();
        const url = `http://localhost:3000/api/auctions/update`
        let body = {"name" : auctionItem.name, "startingBid" : auctionItem.startingBid, "type" : auctionItem.type, "expires" : auctionItem.expires}


        xhr.open('POST',url ,true)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer${token}`)
        xhr.onreadystatechange = () =>{
            if(xhr.readyState == 4 && xhr.readyState == 200){

            }
        }
        xhr.send(JSON.stringify(body))
        console.log("Going to another location")
        window.location.href = '/administration'
    }


</script>

<style>
    .submitButton{
        width: 30%;
    }
</style>

<svelte:head>
    <title> Update an auction</title>
</svelte:head>

<main>
    <div>
        {#if auctionItem}
            <form id="form" method="" action="">
                <p>Auction item:</p>
                <input id='auctionName' on:change={() => test()} type="text" placeholder="name" required bind:value={auctionItem.name}>
                <p>Auction startingbid:</p>
                <input id='auctionBid' on:change={() => test()} type="number" placeholder="startingbid" required bind:value={auctionItem.startingBid}>
                <p>Auction type:</p>
                <input id='auctionType' on:change={() => test()}  type="text" placeholder="type" required bind:value={auctionItem.type}>
                <p>Auction endtime:</p>
                <input id='auctionTime' on:change={() => test()} type="datetime-local" placeholder="type" required bind:value={auctionItem.expires}>
                <p></p>
                <input id="submit" class='submitButton' disabled={cannotSubmit} type="submit" required on:click={updateItem} value="Update">
            </form>
        {/if}
    </div>
</main>