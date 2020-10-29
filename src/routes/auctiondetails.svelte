<script>
    import {onMount} from "svelte";

    let bidResponse = undefined
    let succes
    let minimumBid


    onMount( () => {

        const
            auction_title = document.getElementById('auction_title'),
            auction_description = document.getElementById('auction_description'),
            bid_form = document.querySelector('main form'),
            bid_amount = bid_form.querySelector('input[type=text]'),
            bid_submit = bid_form.querySelector('input[type=submit]'),
            bid_detail_list = document.getElementById('auction_detail_bid_list')


        let clickedOnItem = localStorage.getItem('ClickedOnAction')

        async function getAuctionItem() {
            const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTHV1ayIsInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJpYXQiOjE2MDE0OTQwMzh9.71M6IEiVT9IsmUHNz2kNChPnJWBzQy6RslsJM4XCh1s"
            const auctionUrl = 'http://localhost:3000/api/auctions/' + clickedOnItem
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer' + adminToken
                }
            }
            let reponse = await fetch(auctionUrl, options)
            let data = await reponse.json();
            console.log("Data: " + data)
            return data
        }

        getAuctionItem().then(reponse => {
                let item = reponse
                auction_title.innerText = item.name
                console.log("Highest bidder: " + item.highestBidder)
                minimumBid = item.startingBid
                if(item.highestBidder) {
                    auction_description.innerText = `The current highest bid is: ${item.currentBid}\n The highest bidder is: ${item.highestBidder}`
                    minimumBid = item.currentBid
                }
                else{
                    auction_description.innerText = `There is no current highest bidder! The bidding starts at: ${item.startingBid}`
                    minimumBid = item.startingBid
                }
                if (item.previousBids.length >= 1) {
                    const headerTwo = document.createElement("h2")
                    headerTwo.innerText="Bids"
                    bid_detail_list.appendChild(headerTwo)
                    const bidding_Table = document.createElement("ul")
                    let previousBids = item.previousBids
                    for (let i = 0; i < previousBids.length; i++) {
                        const jsonFromArray = previousBids[i]
                        const convertedJson = JSON.parse(jsonFromArray);
                        if(convertedJson.bidFromuser > 0){
                            const table_Row = document.createElement("li")
                            table_Row.className = 'auction_detail_bid'
                            const span_DetailBidPrice = document.createElement("span")
                            span_DetailBidPrice.className = "auction_detail_bid_price"
                            span_DetailBidPrice.innerText = convertedJson.bidFromuser
                            const span_DetailsBidUser = document.createElement("span")
                            span_DetailsBidUser.className = "auction_detail_bid_user"
                            span_DetailsBidUser.innerText = convertedJson.user
                            const span_DetailBidTime =  document.createElement("span")
                            span_DetailBidTime.className = "auction_detail_bid_time"
                            span_DetailBidTime.innerText = "4;20"
                            table_Row.appendChild(span_DetailBidPrice)
                            table_Row.appendChild(span_DetailsBidUser)
                            table_Row.appendChild(span_DetailBidTime)
                            bidding_Table.appendChild(table_Row)
                        }
                    }
                    bid_detail_list.appendChild(bidding_Table)
                }
            }
        )

        function sendAuctionBid(method, url) {
            console.log("Sending bid")

            const bidAmountValue = bid_amount.value;

            const body = { "bidAmount": bidAmountValue,"token": 'Bearer'+localStorage.getItem('AUTHTOKEN')}
            const jsonBody = JSON.stringify(body)

            const xhr = new XMLHttpRequest()
            xhr.open(method,url,true)
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.setRequestHeader('Authorization', body.token)
            xhr.onreadystatechange = () =>{
                if(xhr.readyState == 4 && xhr.status == 200){
                }
            }
            console.log("Sending body: " + body)
            xhr.send(jsonBody)
            xhr.onload = function (){
                if(xhr.status == 406){
                    succes = false;
                    bidResponse = `The bid you have send was too low for the item. The minimum is ${minimumBid}`
                }else{
                    succes = true;
                    bidResponse = `The bid you have send has been accepted! Refresh the page to see it`
                }
            }
        }

        bid_submit.addEventListener('click', event => {
            event.preventDefault()
            const URL = '/api/auctions/' + clickedOnItem + '/bid'
            sendAuctionBid('POST',URL)
        })
    })



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
    <title> Auction Item</title>
</svelte:head>
<main>
    <div class="row">
        <section class="auction_detail">
            <div class="auction_column">
                <img src="public/product.jpeg"/>
            </div>
            <div class="auction_column">
                <h1 id="auction_title" class="auction_title">Title auction</h1>
                <p id="auction_description"  class="auction_description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </p>
                <form method="" action="/">
                    <input class="auction_bid_amount" type="text" placeholder="amount" />
                    <input class="auction_bid_button" type="submit" value="Bid" />
                </form>
                {#if bidResponse}
                    {#if succes}
                        <span class="succes">{bidResponse}</span>
                    {:else}
                        <span class="error">{bidResponse}</span>
                    {/if}
                {/if}
                <div id="auction_detail_bid_list" class="auction_detail_bid_list">
                </div>
            </div>
        </section>
    </div>
</main>