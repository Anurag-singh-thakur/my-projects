// let finalPrice = 0 ;
// let itemName = document.getElementById("item-name")
// let itemAmount = document.getElementById("item-amount")
// let totalAmount  = document.getElementById("total-amount");



let totalPrice = 0;

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    if (itemName === '')
        {
            alert("Please Enter the item name"); 
            totalPrice = 0;
            totalPrice -= itemPrice;
        }
    if (isNaN(itemPrice) || itemPrice <= 0) {
        alert("Please enter a valid item price.");
        return;
    }

    const itemListDiv = document.getElementById('itemList');
    const newItem = document.createElement('div');
    newItem.textContent = `${itemName}:${itemPrice.toFixed(2)}Rs`;
    itemListDiv.appendChild(newItem);

    totalPrice += itemPrice;
    document.getElementById('totalPrice').textContent = `Total Price: ${totalPrice.toFixed(2)}Rs`;
}