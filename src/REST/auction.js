import express from 'express'

const router = new express.Router();

const paintingType = 'painting'

const auctionableItems = [
    {name: 'Car', startingBid: '1000', currentBid: 0, previousBids : [],highestBidder: undefined,type:'autoMobile'},
    {name: 'CheapPainting', startingBid: '1000',currentBid: 0, previousBids: [],highestBidder: null,type:paintingType},
    {name: 'ExpensivePainting', startingBid: '5000',currentBid: 0,previousBids: [],highestBidder: null, type:paintingType}
]

router.get('/', (req,res)=>{
    res.json(auctionableItems);
})

router.get("/ExpensivePaintings", (req,res) =>{
    const expensivePaintingsList = [];
    for (let i = 0; i < auctionableItems.length; i++) {
        if(auctionableItems[i].type === paintingType){
            expensivePaintingsList.push(auctionableItems[i]);
        }
    }
    if(expensivePaintingsList.length !== 0){
        //There is atleast 1 painting
        res.json(expensivePaintingsList);
    }else{
        res.status(404).end("There are no paintings listed on the website");
    }
})

router.get('/:name',(req,res) =>{
    const toFindItemName = req.params.name;
    const foundItem = auctionableItems.find(item => item.name === toFindItemName);
    if(foundItem !== undefined){
        //Als die bestaat return hem
        res.json(foundItem);
    }else{
        res.status(404).end(`The given item with the name: ${toFindItemName} could not be found.`);
    }
})

router.get('/search/:name',(req,res) =>{
    console.log("Ended up in /search/name")
    const toFindItemName = req.params.name;
    console.log(`Searching for: ${toFindItemName}`)
    const foundItemArray = []
    for (let i = 0; i < auctionableItems.length; i++) {
        console.log(`Current item check: ${auctionableItems[i].name}`)
        if(auctionableItems[i].name.includes(toFindItemName)){
            foundItemArray.push(auctionableItems[i])
        }
    }
    res.json(foundItemArray)
})

router.get("/:name/bid/:amount", (req,res)=>{
    console.log("Name of item: " + req.params.name)
    const toFindItemName = req.params.name;
    const foundItem = auctionableItems.find(item => item.name === toFindItemName);
    if(foundItem){ //An undefined item is always false
        const bidAmount = req.params.amount;
        const bidAmountInt = Number.parseInt(bidAmount);
        const foundItemStartingBidInt = Number.parseInt(foundItem.startingBid);
        const foundItemCurrentBidInt = Number.parseInt(foundItem.currentBid);
        if((bidAmountInt > foundItemStartingBidInt) && (bidAmountInt > foundItemCurrentBidInt)){
            const currentBidOfItem = foundItem.currentBid;
            foundItem.previousBids.push(currentBidOfItem);
            foundItem.currentBid = bidAmount;
            res.status(202).end(`You are the new top bidder! Current bid: ${foundItem.currentBid}`);
        }else{
            res.status(406).end(`Your bid is lower than the current bid. your bid will not be send to be accepted.`)
        }
    }else{
        res.status(404).end(`The item you have searched for was not found.`)
    }
})

router.post("/:name/bid", (req,res) =>{
    console.log("In post of car/bid")
    console.log("User: " + req.token.user)
    if(req.token.roles.includes('user')){
        console.log("User is signed in")
        const toFindItemName = req.params.name;
        const foundItem = auctionableItems.find(item => item.name === toFindItemName);
        if(foundItem) { //An undefined item is always false
            const bidAmount = req.body.bidAmount;
            const bidAmountInt = Number.parseInt(bidAmount);
            const foundItemStartingBidInt = Number.parseInt(foundItem.startingBid);
            const foundItemCurrentBidInt = Number.parseInt(foundItem.currentBid);
            console.log("In bid item.")
            if ((bidAmountInt > foundItemStartingBidInt) && (bidAmountInt > foundItemCurrentBidInt)) {
                console.log("Made it through")
                const toJson = {bidFromuser : foundItem.currentBid, user: req.token.user }
                foundItem.previousBids.push(JSON.stringify(toJson));
                console.log(foundItem.previousBids)
                foundItem.currentBid = bidAmount;
                console.log("HighestBidder wil be: " + req.token.user)
                foundItem.highestBidder = req.token.user
                console.log("Highestbidder from item: " + foundItem.highestBidder)
                res.status(202).end(`You are the new top bidder! Current bid: ${foundItem.currentBid}`);
            } else {
                console.log(`foundItemCurrentBidInt ${foundItemCurrentBidInt}`)
                res.status(406).end(`Your bid is lower than the current bid. your bid will not be send to be accepted.`)
            }
        }else{
            res.status(404).end("Item was not found in the listing.")
        }
    }else{
        console.log("User is not signed in")
    }
})

router.get("/:name/removeBid", (req,res) =>{
    const toFindItemName = req.params.name;
    const foundItem = auctionableItems.find(item => item.name === toFindItemName);
    if(foundItem){
        if(foundItem.previousBids.length != 0){
            const previousBidsLength = foundItem.previousBids.length;
            const previousBid = foundItem.previousBids[previousBidsLength - 1];
            foundItem.previousBids.length = foundItem.previousBids.length - 1;
            foundItem.currentBid = previousBid;
            console.log(`Previous bid size: ${foundItem.previousBids.length}, The previous bid amount was: ${previousBid}`)
            res.json(foundItem)
        }else{
            res.status(406).end(`The item where you wanted to remove and bid has no bids left.`)
        }

    }else{
        res.status(404).end(`The item you have searched for was not found.`)
    }
})

export default router