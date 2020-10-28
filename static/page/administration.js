// TODO: control administration page

import {createNavbar, getItems, getTokenPayload} from "./util.js";

const
    adminTable = document.querySelector('table')

window.addEventListener("DOMContentLoaded", () => {
    createNavbar()
    getItems().then(result => {
        const token = getTokenPayload();
        const userName = token.user
        let currentAuctionableItems = result;
        for (let i = 0; i < currentAuctionableItems.length; i++) {
            let isShown = false;
            if(isShown){
                //Do nothing
            }else{
                const currentItem = currentAuctionableItems[i]
                isShown = true;
                const tableRow = document.createElement('tr')
                const tableData_Name = document.createElement('td')
                tableData_Name.innerText = currentItem.name
                const tableData_Actions = document.createElement('td')
                const icon_Edit = document.createElement('i')
                icon_Edit.className = 'fa fa-pencil'
                const icon_Delete = document.createElement('i')
                icon_Delete.className = 'fa fa-trash'
                tableData_Actions.appendChild(icon_Edit)
                tableData_Actions.appendChild(icon_Delete)
                tableRow.appendChild(tableData_Name)
                tableRow.appendChild(tableData_Actions)
                adminTable.appendChild(tableRow)
            }
        }
    })
});