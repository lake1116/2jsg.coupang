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
    function num_name(event){
            var name_num = document.getElementById("name_num").value;
            if (selectedProducts.join(', ') == 0) {
            alert("상품을 선택해주세요.");
            } else if (name_num == 0) {
            alert("학번과 이름을 입력해주세요.");
            } else {
            alert(name_num + "\n" + selectedProducts.join(', ') + "\n" + totalPrice.toLocaleString() + "원");
            }    
        }
