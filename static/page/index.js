// TODO: control index page

import {createNavbar, getItems} from './util.js'

const
    auctionItems = document.getElementById('auctionableItems')

window.addEventListener("DOMContentLoaded", () => {
    createNavbar()
    getItems().then(result => {
        let auctionableitems = result
        console.log("Length auction items: " + auctionableitems.length)
        for (let i = 0; i < auctionableitems.length; i++) {
            const auctionBox = document.createElement("section")
            auctionBox.className = "auction_box"
            const a_title = document.createElement("a")
            a_title.id = "bidOn"
            a_title.href = 'auction.html'
            a_title.className = auctionableitems[i].name
            a_title.innerText = auctionableitems[i].name;
            const p_itemDescription = document.createElement("p")
            p_itemDescription.className = "auction_description"
            p_itemDescription.innerText = "Test tekst 1"
            const div_Bid = document.createElement("div")
            div_Bid.className = "auction_bid"
            const span_BidPrice = document.createElement("span")
            span_BidPrice.className = "auction_starting_bid_price"
            span_BidPrice.innerText = "Starting bid: " + auctionableitems[i].startingBid
            const span_currentBid = document.createElement("span")
            span_currentBid.className = "auction_current_bid_price"
            span_currentBid.innerText = "Current highest bid: " + auctionableitems[i].currentBid
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
    })
})
//This is done so javascript can load the site first. Cause of the promise.
//Than later we can add the bidAbleButton click cause the page has done loading.
window.onload = function(){
    let bidAbleButton = document.getElementById('bidOn')
    bidAbleButton.addEventListener('click', () => {
        localStorage.setItem('ClickedOnAction', bidAbleButton.className)
    })
}


