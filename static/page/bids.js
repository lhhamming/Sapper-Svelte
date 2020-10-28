// TODO: control bids page
import {createNavbar, getItems,getTokenPayload} from "./util.js";

const
    biddingTable = document.querySelector('table')



window.addEventListener("DOMContentLoaded", () => {
    createNavbar()
    getItems().then(result => {
        const token = getTokenPayload();
        const userName = token.user
        let auctionableItems = result;
        for (let i = 0; i < auctionableItems.length; i++) {
            let userHasBid = false;
            let previousBidsItem = auctionableItems[i].previousBids;
            for (let j = 0; j < previousBidsItem.length; j++) {
                if(!userHasBid) {
                    const currentItem = previousBidsItem[j]
                    const jsonFromObject = JSON.parse(currentItem)
                    if(userName == jsonFromObject.user) {
                        console.log("Adding to table")
                        const tableRow = document.createElement('tr')
                        const tableData_Name = document.createElement('td')
                        tableData_Name.innerText = auctionableItems[i].name
                        const tableData_Price = document.createElement('td')
                        tableData_Price.innerText = auctionableItems[i].currentBid
                        const tableData_BestBid = document.createElement('td')
                        tableData_BestBid.innerText = checkBestBid(previousBidsItem)
                        const tableData_Remove = document.createElement('td')
                        const icon = document.createElement('i')
                        icon.className = 'fa fa-trash'
                        tableData_Remove.appendChild(icon)
                        userHasBid = true;

                        tableRow.appendChild(tableData_Name)
                        tableRow.appendChild(tableData_Price)
                        tableRow.appendChild(tableData_BestBid)
                        tableRow.appendChild(tableData_Remove)
                        biddingTable.appendChild(tableRow)
                    }
                }else{
                    //Do nothing
                }
            }
        }
    })
});

function checkBestBid(givenJsonData) {
    const token = getTokenPayload();
    const userName = token.user
    //Get the last item
    const lastItemIndex = (givenJsonData.length - 1)
    const JSONFromArray = JSON.parse(givenJsonData[lastItemIndex])
    const lastUserInArray = JSONFromArray.user
    if(lastUserInArray == userName)
        return 'Yes';
    return 'No';
}