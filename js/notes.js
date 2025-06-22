const textarea = document.getElementById('notes-box');
textarea.value = localStorage.getItem('schoolmaster-quicknotes') || '';
textarea.oninput = () => {
    localStorage.setItem('schoolmaster-quicknotes', textarea.value);
};