<script>

import {getItems, getTokenPayload} from "./util.js" ;
import {onMount} from "svelte";
import {getToken} from "./util";

let token
let auctionCreateSubmit;


function canUserAcces() {
    if(token.roles.includes('admin')){
        console.log('they can')
        //They can
    }else{
        console.log('they can not')
        window.location.href = '/'
    }
}

onMount(() => {
        auctionCreateSubmit = document.querySelector('input[type=submit]')
        auctionCreateSubmit.addEventListener('click', (event) =>{
            doCreate(event)
        })
        getAuctionItems();
        token = getTokenPayload();
        canUserAcces();
    });

    let auctionItemsArray = []
    let auctionItemsArrayLength = 0;

    let succes;
    let removeReponse;


    function getAuctionItems() {
        const adminTable = document.querySelector('table')
        auctionItemsArray = []
        auctionItemsArrayLength = 0;
        getItems().then(result => {
            const token = getTokenPayload();
            const userName = token.user
            let currentAuctionableItems = result;
            for (let i = 0; i < currentAuctionableItems.length; i++) {
                let isShown = false;
                if (isShown) {
                    //Do nothing
                } else {
                    const currentItem = currentAuctionableItems[i]
                    isShown = true;
                    auctionItemsArray.push(currentItem)
                    auctionItemsArrayLength = auctionItemsArray.length
                }
            }
        })
    }

function removeAuction(name) {
    const xhr = new XMLHttpRequest();
    const token = getToken();
    const url = `http://localhost:3000/api/auctions/remove`
    const body = {"name" : name}

    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer${token}`)
    xhr.onreadystatechange = () =>{
        if(xhr.readyState == 4 && xhr.readyState == 200){
        }
    }
    xhr.send(JSON.stringify(body));

    xhr.onload = () =>{
        if(xhr.status == 200){
            succes = true;
            removeReponse = `The auction has been removed succesfully!`
            getAuctionItems()
        }else{
            succes = false;
            removeReponse = `The auction either could not be removed or has already been removed`
        }
    }

}

function doCreate(event) {
    event.preventDefault();

    let itemName = document.querySelector("input[name='name']");
    let itemDescription = document.querySelector("input[name='description']");
    let itemMinimalBid = document.querySelector("input[name='minimalbid']");
    let itemExpireDate = document.querySelector("input[name='end_time']");
    let itemType = document.querySelector("input[name='type']");
    const body = {name: itemName.value, description : itemDescription.value, minimalBid : itemMinimalBid.value, expireDate : itemExpireDate.value, type : itemType.value}
    const xhr = new XMLHttpRequest();
    const token = getToken();
    const url = `http://localhost:3000/api/auctions/create`

    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer${token}`)
    xhr.onreadystatechange = () =>{
        if(xhr.readyState == 4 && xhr.readyState == 200){
        }
    }
    xhr.send(JSON.stringify(body));
    xhr.onload = () =>{
        if(xhr.status == 200){
            succes = true;
            removeReponse = xhr.response
            getAuctionItems()
        }else{
            succes = false;
            removeReponse = xhr.response
        }
    }
}

function updateAuction(name) {
    localStorage.setItem('updateAuction', name)
    console.log(localStorage.getItem('updateAuction'))
    window.location.href = '/updateauction'
}

</script>

<style>
    .error{
        color:red;
    }

    .succes{
        color:green;
    }
</style>

<svelte:head>
    <title> Administration </title>
</svelte:head>

<main>
    <div class="row">
        <h1> Add update or delete auctions</h1>
    </div>
    {#if removeReponse}
        {#if succes}
            <span class="succes">{removeReponse}</span>
            {:else}
            <span class="error">{removeReponse}</span>
        {/if}
    {/if}
    {#if auctionItemsArrayLength === 0}
        <p> There no auction currently going on.</p>
        {:else}
        <div class="row">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                {#each auctionItemsArray as item}
                    <tr>
                        <td>{item.name}</td>
                        <td>
                            <a on:click={ () => {removeAuction(item.name)}} href="administration"> Remove </a>
                            <a on:click={ () => {updateAuction(item.name)}} href="administration"> update </a>
                        </td>
                    </tr>
                {/each}
            </table>
        </div>
    {/if}
    <div class="row">
        <form class="auction_form" method="" action="">
            <h1 class="auction_title">Add an auction</h1>
            <input required type="text" placeholder="Name" name="name"/>
            <input required type="text" placeholder="Description" name="description"/>
            <input required type="number" placeholder="Starting bid" name="minimalbid"/>
            <input required type="text" placeholder="Auction Type" name="type"/>
            <input required type="datetime-local" placeholder="End time" name="end_time"/>
            <input type="submit" value="Add"/>
        </form>
    </div>
</main>