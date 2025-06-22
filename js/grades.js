// Multi-class grade tracker with per-class assignments
const classesDiv = document.getElementById('grades-classes');
const addClassForm = document.getElementById('add-class-form');
const addClassInput = document.getElementById('add-class-name');
let gradeData = JSON.parse(localStorage.getItem('schoolmaster-multigrades') || '[]');

function saveGrades() {
    localStorage.setItem('schoolmaster-multigrades', JSON.stringify(gradeData));
}

function calcClassGrade(items) {
    let total = 0, weight = 0;
    for (let i of items) {
        let g = parseFloat(i.grade), w = parseFloat(i.weight);
        if (!isNaN(g) && !isNaN(w)) {
            total += g * w;
            weight += w;
        }
    }
    return weight > 0 ? (total / weight).toFixed(2) : "N/A";
}

function renderGrades() {
    classesDiv.innerHTML = '';
    if (gradeData.length === 0) {
        classesDiv.innerHTML = `<div style="color:var(--accent-light);font-size:1.2em;opacity:.8;margin-top:18px;">No classes yet. Add your first class!</div>`;
        return;
    }
    gradeData.forEach((cls, clsIdx) => {
        const card = document.createElement('div');
        card.className = 'grade-class-card';
        // Header
        const head = document.createElement('div');
        head.className = 'class-head';
        head.innerHTML = `
      <div>
        <span class="class-name">${cls.name}</span>
        <span class="class-grade">Grade: <b>${calcClassGrade(cls.items)}</b>%</span>
      </div>
      <button class="del-class" title="Delete class">&#128465;</button>
    `;
        head.querySelector('.del-class').onclick = () => {
            gradeData.splice(clsIdx, 1); saveGrades(); renderGrades();
        };
        card.appendChild(head);
        // Table
        const table = document.createElement('table');
        table.innerHTML = `<tr><th>Name</th><th>Grade (%)</th><th>Weight</th><th></th></tr>`;
        cls.items.forEach((item, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td><input value="${item.name}" /></td>
        <td><input type="number" value="${item.grade}" min="0" max="100" /></td>
        <td><input type="number" value="${item.weight}" min="0" /></td>
        <td><button title="Delete">✕</button></td>
      `;
            let [name, grade, weight] = tr.querySelectorAll('input');
            name.oninput = () => { gradeData[clsIdx].items[idx].name = name.value; saveGrades(); };
            grade.oninput = () => { gradeData[clsIdx].items[idx].grade = grade.value; saveGrades(); renderGrades(); };
            weight.oninput = () => { gradeData[clsIdx].items[idx].weight = weight.value; saveGrades(); renderGrades(); };
            tr.querySelector('button').onclick = () => { gradeData[clsIdx].items.splice(idx, 1); saveGrades(); renderGrades(); };
            table.appendChild(tr);
        });
        card.appendChild(table);
        // Add row
        const addRow = document.createElement('div');
        addRow.className = 'add-grade-row';
        addRow.innerHTML = `
      <input type="text" placeholder="Assignment/Test" />
      <input type="number" placeholder="Grade (%)" min="0" max="100" />
      <input type="number" placeholder="Weight" min="0" />
      <button>Add</button>
    `;
        addRow.querySelector('button').onclick = () => {
            let [name, grade, weight] = Array.from(addRow.querySelectorAll('input')).map(i => i.value);
            if (!name.trim() || !grade || !weight) return;
            gradeData[clsIdx].items.push({ name, grade, weight });
            saveGrades(); renderGrades();
        };
        card.appendChild(addRow);
        classesDiv.appendChild(card);
    });
}

addClassForm.onsubmit = e => {
    e.preventDefault();
    const name = addClassInput.value.trim();
    if (!name) return;
    gradeData.push({ name, items: [] });
    saveGrades(); renderGrades();
    addClassInput.value = '';
};

renderGrades();