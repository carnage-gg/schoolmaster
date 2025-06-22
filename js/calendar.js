const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const today = new Date();
let year = today.getFullYear(), month = today.getMonth();

const monthText = document.querySelector('.calendar-month');
const tableBody = document.getElementById('calendar-table-body');

let notes = JSON.parse(localStorage.getItem('schoolmaster-tablecal-notes') || '{}');

function saveNotes() {
    localStorage.setItem('schoolmaster-tablecal-notes', JSON.stringify(notes));
}

function getDaysInMonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
}

function renderCalendar() {
    monthText.textContent = `${months[month]} ${year}`;
    tableBody.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const numDays = getDaysInMonth(year, month);

    let dayCount = 1;
    for (let week = 0; week < 6; week++) {
        let tr = document.createElement('tr');
        for (let d = 0; d < 7; d++) {
            let td = document.createElement('td');
            td.className = "calendar-cell";
            if (week === 0 && d < firstDay || dayCount > numDays) {
                td.classList.add("calendar-cell-empty");
                tr.appendChild(td);
                continue;
            }

            const key = `${year}-${month}-${dayCount}`;
            td.innerHTML = `
        <div class="cell-daynum">${dayCount}</div>
        <div class="cell-editable" contenteditable="true" spellcheck="true" data-key="${key}"></div>
      `;
            if (notes[key]) {
                td.querySelector('.cell-editable').innerText = notes[key];
            }

            // Highlight today
            if (
                dayCount === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                td.classList.add("today");
            }

            // Save on blur
            td.querySelector('.cell-editable').addEventListener('blur', function () {
                notes[key] = this.innerText.trim();
                saveNotes();
            });

            tr.appendChild(td);
            dayCount++;
        }
        tableBody.appendChild(tr);
        if (dayCount > numDays) break;
    }
}

document.querySelector('.calendar-prev').onclick = () => {
    if (month === 0) { month = 11; year--; }
    else month--;
    renderCalendar();
};
document.querySelector('.calendar-next').onclick = () => {
    if (month === 11) { month = 0; year++; }
    else month++;
    renderCalendar();
};

renderCalendar();