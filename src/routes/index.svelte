<script>
	import {onMount} from "svelte";
	import {getItems} from './util.js'

	onMount(()=>{
		const auctionItems = document.getElementById('auctionableItems')
		getItems().then(result => {
			let auctionableitems = result
			for (let i = 0; i < auctionableitems.length; i++) {
				console.log(auctionableitems[i])
				const auctionBox = document.createElement("section")
				auctionBox.className = "auction_box"
				const a_title = document.createElement("a")
				a_title.id = "bidOn"
				a_title.href = 'auctiondetails'
				a_title.className = auctionableitems[i].name
				a_title.innerText = auctionableitems[i].name;
				const p_itemDescription = document.createElement("p")
				p_itemDescription.className = "auction_description"
				p_itemDescription.innerText = "Beschrijving"
				const div_Bid = document.createElement("div")
				div_Bid.className = "auction_bid"
				const span_BidPrice = document.createElement("span")
				span_BidPrice.className = "auction_starting_bid_price"
				span_BidPrice.innerText = "Starting bid: " + auctionableitems[i].startingBid + "\n"
				const span_currentBid = document.createElement("span")
				span_currentBid.className = "auction_current_bid_price"
				span_currentBid.innerText = "Current highest bid: " + auctionableitems[i].currentBid+ "\n"
				const span_BidTime = document.createElement("span")
				span_BidTime.className = "auction_bid_time"
				span_BidTime.innerText = "Test Time"

				//Put the spans in the div.
				div_Bid.appendChild(span_BidPrice)
				div_Bid.appendChild(span_currentBid)
				div_Bid.appendChild(span_BidTime)

				auctionBox.appendChild(a_title)
				auctionBox.appendChild(p_itemDescription)
				auctionBox.appendChild(div_Bid)
				auctionItems.appendChild(auctionBox)
			}

			let bidAbleButton = document.getElementById('bidOn')
			bidAbleButton.addEventListener('click', () => {
				localStorage.setItem('ClickedOnAction', bidAbleButton.className)
			})
		})
	})
</script>

<style>

</style>

<svelte:head>
	<title>Auctions House</title>
</svelte:head>
<div id="auctionableItems">

</div>