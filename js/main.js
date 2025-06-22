const nav = document.getElementById('navbar');
if (nav) {
    const links = [
        { href: 'index.html', label: 'Home' },
        { href: 'study-links.html', label: 'Study Links' },
        { href: 'assignments.html', label: 'Assignments' },
        { href: 'calendar.html', label: 'Calendar' },
        { href: 'notes.html', label: 'Notes' },
        { href: 'timetable.html', label: 'Timetable' },
        { href: 'timer.html', label: 'Timer' },
        { href: 'grades.html', label: 'Grades' }
    ];
    let cur = window.location.pathname.split('/').pop();
    nav.innerHTML = links.map(l =>
        `<a href="../pages/${l.href}"${cur === l.href ? ' class="active"' : ''}>${l.label}</a>`
    ).join('');
}

// Secret page shortcut
document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'h') {
        const pw = prompt('Enter the secret password:');
        if (pw === 'abbas786') window.location = 'secret.html';
        else alert('Wrong password!');
    }
});