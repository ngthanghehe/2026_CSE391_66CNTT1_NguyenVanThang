const showError = (fieldId, message) => {
  const errorElement = document.getElementById(fieldId + "Error");
  if (errorElement) errorElement.textContent = message;
};

const clearError = (fieldId) => {
  const errorElement = document.getElementById(fieldId + "Error");
  if (errorElement) errorElement.textContent = "";
};
const prices = {
  ao: 150000,
  quan: 200000,
  giay: 350000,
};

const validateProduct = () => {
  const val = document.getElementById("product").value;
  if (!val) {
    showError("product", "Bắt buộc chọn sản phẩm");
    return false;
  }
  return true;
};

const validateQuantity = () => {
  const val = document.getElementById("quantity").value;
  if (!val) {
    showError("quantity", "Không được để trống");
    return false;
  }
  const num = Number(val);
  if (!Number.isInteger(num) || num < 1 || num > 99) {
    showError("quantity", "Phải là số nguyên từ 1 đến 99");
    return false;
  }
  return true;
};

const validateDeliveryDate = () => {
  const val = document.getElementById("deliveryDate").value;
  if (!val) {
    showError("deliveryDate", "Không được để trống");
    return false;
  }

  const selectedDate = new Date(val);
  selectedDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);

  if (selectedDate < today) {
    showError("deliveryDate", "Không được chọn ngày trong quá khứ");
    return false;
  }
  if (selectedDate > maxDate) {
    showError("deliveryDate", "Không quá 30 ngày từ hôm nay");
    return false;
  }
  return true;
};

const validateAddress = () => {
  const val = document.getElementById("address").value.trim();
  if (!val) {
    showError("address", "Không được để trống");
    return false;
  }
  if (val.length < 10) {
    showError("address", "Từ 10 ký tự trở lên");
    return false;
  }
  return true;
};

const validateNotes = () => {
  const val = document.getElementById("notes").value;
  if (val.length > 200) {
    showError("notes", "Không quá 200 ký tự");
    return false;
  }
  return true;
};

const validatePayment = () => {
  const radios = document.querySelectorAll('input[name="payment"]');
  const isChecked = Array.from(radios).some((r) => r.checked);
  if (!isChecked) {
    showError("payment", "Bắt buộc chọn phương thức");
    return false;
  }
  return true;
};

const calculateTotal = () => {
  const prod = document.getElementById("product").value;
  const qtyText = document.getElementById("quantity").value;
  const qty = parseInt(qtyText) || 0;
  let total = 0;
  if (prod && prices[prod] && qty >= 1 && qty <= 99) {
    total = prices[prod] * qty;
  }
  document.getElementById("totalPrice").textContent =
    total.toLocaleString("vi-VN") + " VNĐ";
  return total;
};

const fields2 = ["product", "quantity", "deliveryDate", "address", "notes"];
fields2.forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener("blur", () => {
    if (id === "product") validateProduct();
    if (id === "quantity") validateQuantity();
    if (id === "deliveryDate") validateDeliveryDate();
    if (id === "address") validateAddress();
    if (id === "notes") validateNotes();
  });
  el.addEventListener("input", () => {
    clearError(id);
    if (id === "product" || id === "quantity") {
      calculateTotal();
    }
  });
  if (id === "product") {
    el.addEventListener("change", () => {
      clearError(id);
      calculateTotal();
    });
  }
});

const radios2 = document.querySelectorAll('input[name="payment"]');
radios2.forEach((r) => {
  r.addEventListener("change", () => clearError("payment"));
});

document.getElementById("notes").addEventListener("input", (e) => {
  const len = e.target.value.length;
  const countSpan = document.getElementById("charCount");
  countSpan.textContent = `${len}/200`;
  if (len > 200) {
    countSpan.style.color = "red";
    validateNotes();
  } else {
    countSpan.style.color = "#555";
    clearError("notes");
  }
});

document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const isValid = Boolean(
    validateProduct() &
    validateQuantity() &
    validateDeliveryDate() &
    validateAddress() &
    validateNotes() &
    validatePayment(),
  );

  if (isValid) {
    const prodSelect = document.getElementById("product");
    const prodName = prodSelect.options[prodSelect.selectedIndex].text;

    document.getElementById("confProd").textContent = prodName;
    document.getElementById("confQty").textContent =
      document.getElementById("quantity").value;
    document.getElementById("confDate").textContent =
      document.getElementById("deliveryDate").value;
    document.getElementById("confTotal").textContent =
      calculateTotal().toLocaleString("vi-VN") + " VNĐ";

    document.getElementById("confirmModal").style.display = "flex";
  }
});

document.getElementById("btnConfirm").addEventListener("click", () => {
  document.getElementById("confirmModal").style.display = "none";
  document.getElementById("orderForm").style.display = "none";
  document.getElementById("orderSuccess").style.display = "block";
});

document.getElementById("btnCancel").addEventListener("click", () => {
  document.getElementById("confirmModal").style.display = "none";
});
