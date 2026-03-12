const showError = (fieldId, message) => {
  const errorElement = document.getElementById(fieldId + "Error");
  if (errorElement) errorElement.textContent = message;
};

const clearError = (fieldId) => {
  const errorElement = document.getElementById(fieldId + "Error");
  if (errorElement) errorElement.textContent = "";
};

const validateFullname = () => {
  const val = document.getElementById("fullname").value.trim();
  if (!val) {
    showError("fullname", "Không được để trống");
    return false;
  }
  if (val.length < 3) {
    showError("fullname", "Phải có từ 3 ký tự trở lên");
    return false;
  }
  if (
    !/^[a-zA-Z\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+$/.test(
      val,
    )
  ) {
    showError("fullname", "Chỉ chứa chữ cái và khoảng trắng");
    return false;
  }
  return true;
};

const validateEmail = () => {
  const val = document.getElementById("email").value.trim();
  if (!val) {
    showError("email", "Không được để trống");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    showError("email", "Sai định dạng email");
    return false;
  }
  return true;
};

const validatePhone = () => {
  const val = document.getElementById("phone").value.trim();
  if (!val) {
    showError("phone", "Không được để trống");
    return false;
  }
  if (!/^0\d{9}$/.test(val)) {
    showError("phone", "Phải gồm 10 chữ số, bắt đầu bằng 0");
    return false;
  }
  return true;
};

const validatePassword = () => {
  const val = document.getElementById("password").value;
  if (!val) {
    showError("password", "Không được để trống");
    return false;
  }
  if (
    val.length < 8 ||
    !/[A-Z]/.test(val) ||
    !/[a-z]/.test(val) ||
    !/[0-9]/.test(val)
  ) {
    showError("password", "Từ 8 ký tự, có chữ hoa, chữ thường và số");
    return false;
  }
  return true;
};

const validateConfirmPassword = () => {
  const pwd = document.getElementById("password").value;
  const val = document.getElementById("confirmPassword").value;
  if (!val) {
    showError("confirmPassword", "Không được để trống");
    return false;
  }
  if (val !== pwd) {
    showError("confirmPassword", "Mật khẩu không khớp");
    return false;
  }
  return true;
};

const validateGender = () => {
  const radios = document.querySelectorAll('input[name="gender"]');
  const isChecked = Array.from(radios).some((r) => r.checked);
  if (!isChecked) {
    showError("gender", "Vui lòng chọn giới tính");
    return false;
  }
  return true;
};

const validateTerms = () => {
  const isChecked = document.getElementById("terms").checked;
  if (!isChecked) {
    showError("terms", "Bắt buộc chọn");
    return false;
  }
  return true;
};

const fields1 = ["fullname", "email", "phone", "password", "confirmPassword"];
fields1.forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener("blur", () => {
    if (id === "fullname") validateFullname();
    if (id === "email") validateEmail();
    if (id === "phone") validatePhone();
    if (id === "password") validatePassword();
    if (id === "confirmPassword") validateConfirmPassword();
  });
  el.addEventListener("input", () => clearError(id));
});

const radios1 = document.querySelectorAll('input[name="gender"]');
radios1.forEach((r) => {
  r.addEventListener("change", () => clearError("gender"));
});
document
  .getElementById("terms")
  .addEventListener("change", () => clearError("terms"));

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const isValid = Boolean(
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirmPassword() &
    validateGender() &
    validateTerms(),
  );

  if (isValid) {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("successName").textContent =
      document.getElementById("fullname").value;
    document.getElementById("registerSuccess").style.display = "block";
  }
});
