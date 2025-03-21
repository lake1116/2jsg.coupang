let totalPrice = 0;
let selectedProducts = [];

function toggleSelection(productItem) {
    const price = parseInt(productItem.getAttribute('data-price'));
    const productName = productItem.querySelector('h3').textContent;
    const isSelected = productItem.classList.contains('selected');

    if (isSelected) {
        totalPrice -= price;
        selectedProducts = selectedProducts.filter(name => name !== productName);
    } else {
        totalPrice += price;
        selectedProducts.push(productName);
    }

    productItem.classList.toggle('selected');

    const checkmark = productItem.querySelector('.checkmark');
    checkmark.style.display = isSelected ? 'none' : 'block';

    document.querySelector('.total-price').textContent = `선택한 상품의 총 가격: ₩ ${totalPrice.toLocaleString()}`;
    document.querySelector('.selected-products').textContent = selectedProducts.length 
        ? `선택한 상품: ${selectedProducts.join(', ')}` 
        : "선택한 상품: 없음";
}