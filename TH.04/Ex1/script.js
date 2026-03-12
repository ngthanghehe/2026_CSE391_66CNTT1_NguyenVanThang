let students = [];
let sortDir = "none";

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const summaryArea = document.getElementById("summaryArea");
const nameInput = document.getElementById("nameInput");
const gradeInput = document.getElementById("gradeInput");
const addBtn = document.getElementById("addBtn");
const sortGradeBtn = document.getElementById("sortGradeBtn");

const getRank = (g) => {
  if (g >= 8.5) return "Giỏi";
  if (g >= 7.0) return "Khá";
  if (g >= 5.0) return "Trung bình";
  return "Yếu";
};

function updateUI() {
  const keyword = searchInput.value.toLowerCase().trim();
  const filterType = filterSelect.value;

  let displayList = students.filter((s) => {
    const matchName = s.name.toLowerCase().includes(keyword);
    const matchRank = filterType === "All" || s.rank === filterType;
    return matchName && matchRank;
  });

  if (sortDir === "asc") displayList.sort((a, b) => a.grade - b.grade);
  else if (sortDir === "desc") displayList.sort((a, b) => b.grade - a.grade);

  render(displayList);
  calcSummary();
}

function render(data) {
  tableBody.innerHTML = "";
  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="empty-message">Không tìm thấy sinh viên nào</td></tr>`;
    return;
  }

  data.forEach((s, i) => {
    const tr = document.createElement("tr");
    if (s.grade < 5) tr.className = "bg-warning";

    tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${s.name}</td>
            <td>${s.grade.toFixed(1)}</td>
            <td>${s.rank}</td>
            <td><button class="btn-delete" onclick="removeStudent(${s.id})">Xóa</button></td>
        `;
    tableBody.appendChild(tr);
  });
}

addBtn.onclick = () => {
  const name = nameInput.value.trim();
  const gradeRaw = gradeInput.value;
  const grade = parseFloat(gradeRaw);

  if (!name || isNaN(grade) || grade < 0 || grade > 10) {
    alert("Vui lòng nhập tên và điểm (0-10) hợp lệ!");
    return;
  }

  students.push({
    id: Date.now(),
    name,
    grade,
    rank: getRank(grade),
  });

  nameInput.value = "";
  gradeInput.value = "";
  nameInput.focus();
  updateUI();
};

window.removeStudent = (id) => {
  students = students.filter((s) => s.id !== id);
  updateUI();
};

function calcSummary() {
  const total = students.length;
  const avg =
    total > 0
      ? (students.reduce((sum, s) => sum + s.grade, 0) / total).toFixed(2)
      : "0.00";
  summaryArea.innerText = `Tổng số: ${total} | Điểm trung bình: ${avg}`;
}

searchInput.oninput = updateUI;
filterSelect.onchange = updateUI;
gradeInput.onkeypress = (e) => {
  if (e.key === "Enter") addBtn.click();
};

sortGradeBtn.onclick = function () {
  const icon = document.getElementById("sortIcon");
  if (sortDir === "none" || sortDir === "desc") {
    sortDir = "asc";
    icon.innerText = "▲";
  } else {
    sortDir = "desc";
    icon.innerText = "▼";
  }
  updateUI();
};

updateUI();
