<script>
    import {onMount} from "svelte";
    import {checkBestBid, getToken} from "./util";
    import {getItems, getTokenPayload} from "../../static/page/util";

    let biddingTable;
    let userBidOn = [];
    let userBidOnLength = 0;

    let removeBidResponse;
    let removeBidSucces;

    onMount( () =>{
        getUserBidAuctions()
    })

    function getUserBidAuctions(){
        getItems().then(result => {
            console.log('Getting items')
            userBidOn = []
            userBidOnLength = 0
            const token = getTokenPayload();
            const userName = token.user
            let auctionableItems = result;
            for (let i = 0; i < auctionableItems.length; i++) {
                let userHasBid = false;
                let previousBidsItem = auctionableItems[i].previousBids;
                for (let j = 0; j < previousBidsItem.length; j++) {
                    if (!userHasBid) {
                        const currentItem = previousBidsItem[j]
                        const jsonFromObject = JSON.parse(currentItem)
                        if (userName == jsonFromObject.user) {
                            userBidOn.push(auctionableItems[i])
                            userBidOnLength = userBidOn.length
                            userHasBid = true;
                        }
                    }
                }
            }
        })
    }

    function removeBid(itemName){
        const xhr = new XMLHttpRequest()
        const token = getToken();
        const payload = getTokenPayload()
        const url = `http://localhost:3000/api/auctions/${itemName}/${payload.user}/remove`

        xhr.open('POST',url,true)
        xhr.setRequestHeader('Authorization', `Bearer${token}`)
        xhr.onreadystatechange = () =>{
            if(xhr.readyState == 4 && xhr.status == 200){
            }
        }
        xhr.send()
        xhr.onload = function(){
            if(xhr.status == 200){
                removeBidSucces = true;
                removeBidResponse = `The bid has been removed succes fully!`
                getUserBidAuctions()
            }else{
                removeBidSucces = false;
                removeBidResponse = `There is an error where the bid could not be removed.`
            }
        }
    }
</script>

<style>
    #bidsTable{
        width: 75%
    }
    #bidsTable tr{
        text-align: center;
        width: 75%
    }

    .error{
        color: red;
    }
    .succes{
        color:green;
    }
</style>
<svelte:head>
    <title> My Bids </title>
</svelte:head>

<main>
    <div class="row">
        <h1 class="auction_title"> My bids</h1>
    </div>
    {#if removeBidResponse}
        {#if removeBidSucces}
            <span class="succes">{removeBidResponse}</span>
        {:else}
            <span class="error">{removeBidResponse}</span>
        {/if}
    {/if}
    {#if userBidOnLength === 0}
        <p> You do not have any bids on the website! Click on Home to bid on something</p>
    {:else}
        <div id="biddingTable" class="row">
            <table id="bidsTable">
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Is best bid?</th>
                    <th>Remove</th>
                </tr>
                {#each userBidOn as bid}
                    <tr>
                        <td>{bid.name}</td>
                        <td>{bid.currentBid}</td>
                        <td>{checkBestBid(bid.previousBids)}</td>
                        <td><a on:click={() => removeBid(bid.name)}>Remove bid </a></td>
                    </tr>
                {/each}
            </table>
        </div>
    {/if}

</main>



