const table = document.getElementById('timetable');
const defaultTimetable = [
    { day: "Monday", periods: ["1", "2", "3", "4", "5", "6"] },
    { day: "Tuesday", periods: ["1", "2", "3", "4", "5", "6"] },
    { day: "Wednesday", periods: ["1", "2", "3", "4", "5", "6"] },
    { day: "Thursday", periods: ["1", "2", "3", "4", "5", "6"] },
    { day: "Friday", periods: ["1", "2", "3", "4", "5", "6"] }
];
let timetable = JSON.parse(localStorage.getItem('schoolmaster-timetable') || 'null') || defaultTimetable;
function saveTable() { localStorage.setItem('schoolmaster-timetable', JSON.stringify(timetable)); }
function renderTable() {
    table.innerHTML = `<tr><th>Day / Period</th>${[1, 2, 3, 4, 5, 6].map(i => `<th>Period ${i}</th>`).join('')}</tr>`;
    timetable.forEach((row, dayIdx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<th>${row.day}</th>` + row.periods.map((period, periodIdx) =>
            `<td><input value="${period}" /></td>`).join('');
        let inputs = tr.querySelectorAll('input');
        inputs.forEach((inp, periodIdx) => {
            inp.oninput = () => {
                timetable[dayIdx].periods[periodIdx] = inp.value;
                saveTable();
            };
        });
        table.appendChild(tr);
    });
}
renderTable();