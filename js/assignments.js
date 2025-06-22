const list = document.getElementById('assignments-list');
const form = document.getElementById('assignment-form');
const nameInput = document.getElementById('asm-name');
const dateInput = document.getElementById('asm-date');
let assignments = JSON.parse(localStorage.getItem('schoolmaster-assignments') || '[]');

function saveAssignments() {
    localStorage.setItem('schoolmaster-assignments', JSON.stringify(assignments));
}
function renderAssignments() {
    list.innerHTML = '';
    if (assignments.length === 0) {
        list.innerHTML = `<li style="color:#fa2; margin-top:30px; font-size:20px; opacity:0.7;">🎉 No assignments yet!</li>`;
        return;
    }
    assignments.forEach((a, i) => {
        const li = document.createElement('li');
        if (a.done) li.classList.add('done');
        li.innerHTML = `
      <div>
        <div class="asm-name">${a.name}</div>
        <div class="asm-due">Due: ${a.due}</div>
      </div>
      <div class="asm-actions">
        <button class="mark">${a.done ? 'Mark Not Done' : 'Mark Done'}</button>
        <button class="del">Delete</button>
      </div>
    `;
        li.querySelector('.mark').onclick = () => {
            assignments[i].done = !assignments[i].done;
            saveAssignments(); renderAssignments();
        };
        li.querySelector('.del').onclick = () => {
            assignments.splice(i, 1); saveAssignments(); renderAssignments();
        };
        list.appendChild(li);
    });
}
form.onsubmit = e => {
    e.preventDefault();
    assignments.push({ name: nameInput.value, due: dateInput.value, done: false });
    saveAssignments(); renderAssignments();
    nameInput.value = ''; dateInput.value = '';
};
renderAssignments();