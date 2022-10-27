import { menuArray } from './data.js'

let customerOrder = []


document.addEventListener("click", function(e){
    if(e.target.id === "add-item-btn"){
        handleAddBtnClick(e.target.dataset.addBtn)
    }
    else if(e.target.id === "remove-btn"){
        handleRemoveBtnClick(e.target.dataset.removeBtn)
    }
    else if(e.target.id === "order-btn"){
        handleOrderBtnClick()
    }
    else if(e.target.id === "new-order-btn"){
        handleNewOrderBtnClick()
    }
})


document.addEventListener("submit", function(e){
    
    e.preventDefault()

    const customerName = new FormData(document.getElementById('card-details-form')).get("customer-name")
    
    document.getElementById("checkout-inner").innerHTML = 
    `<div class="thank-you-message-container">
    <p class="thank-you-message">Thanks, ${customerName}! Your order is on its way!</p>
    </div>
    <div class="new-order-btn-container">
    <button class="pay-btn" id="new-order-btn">START A NEW ORDER</button>
    </div>
    `
    
    document.getElementById('customer-name').value = ""
    document.getElementById('card-number').value = ""
    document.getElementById('cvv').value = ""
    document.getElementById("modal").style.display = "none"

})


function handleAddBtnClick(addBtnId){
    
    const targetMenuItem = menuArray.filter(function(item){
        return item.id === parseInt(addBtnId,10)
    })[0]
    
    customerOrder.push(
        {name:`${targetMenuItem.name}`,
        price:`${targetMenuItem.price}`,
        id:`${customerOrder.length}`})
    
    if (customerOrder.length===1){
        document.getElementById("checkout-inner").style.display="block" 
    }
    
    getOrderHtml()
    
}


function handleRemoveBtnClick(removeBtnId){
    
    if (customerOrder.length === 1){
            customerOrder = []
            document.getElementById("checkout-inner").style.display = "none"
    }
    else{
        customerOrder = customerOrder.filter(function(orderItem){
           return orderItem.id != removeBtnId 
        })
        getOrderHtml()
    }
    
}


function handleOrderBtnClick(){
    document.getElementById("modal").style.display = "block"
}

function handleNewOrderBtnClick(){
    customerOrder = []
    document.getElementById("checkout-inner").innerHTML = 
    `<h2 class="order-title">Your order</h2>
        <div class="order-area" id="order-area">              
        </div>
        <div class="order-total" id="order-total">
            <h2 class="order-item">Total price:</h2>
            <p class="order-item-price" id="total-price"></p>
        </div>
        <div class="order-btn-container">
            <button class="order-btn" id="order-btn">COMPLETE ORDER</button>
        </div>`
    document.getElementById("checkout-inner").style.display="none"
}


function getOrderHtml(){
    let orderHtml = ""
    let totalPrice = 0
    
    customerOrder.forEach(function(orderItem){
        
        orderHtml +=
        `<div class="order-line-item" id="order-line-item">
            <div class="order-item-container" id="order-item-container">
                <h2 class="order-item">${orderItem.name}</h2>
                <button 
                    class="remove-btn" 
                    id="remove-btn" 
                    data-remove-btn="${orderItem.id}"
                    >remove</button>
            </div>
            <p class="order-item-price" id="order-item-price">\$${orderItem.price}</p>
        </div>` 
        
         totalPrice += parseInt(orderItem.price,10)   
         document.getElementById("total-price").innerText=`\$${totalPrice}`
    })
    
    document.getElementById("order-area").innerHTML=orderHtml
}


function getMenuHtml(){
    
    let menuHtml = ""
    
    menuArray.forEach(function(menuItem){
        
        let ingredientsList = ""
        
        for (let i=0; i<menuItem.ingredients.length; i++){
            if (i === menuItem.ingredients.length - 1){
                ingredientsList += menuItem.ingredients[i]
            }
            else{
                ingredientsList += menuItem.ingredients[i] + ", "
            }
        }
        
        menuHtml += 
        `<div class="menu-section">
            <div class="item-description">
                <div>
                    <p class="item-emoji" id="item-emoji">${menuItem.emoji}</p>
                </div>
                <div class="item-text">
                    <h2 class="item-name">${menuItem.name}</h2>
                    <p class="item-ingredients">${ingredientsList}</p>
                    <p class="item-price">\$${menuItem.price}</p>
                </div>
            </div>
            <div class="add-item-btn-section">
                <button class="add-item-btn" id="add-item-btn" data-add-btn="${menuItem.id}">+</button>
            </div>
        </div>`
    })
    return menuHtml
}


function renderMenuHtml(){
    document.getElementById("full-menu").innerHTML = getMenuHtml()
}


renderMenuHtml()


