const display = document.getElementById('pomodoro-timer');
const btnStart = document.getElementById('pomodoro-start');
const btnStop = document.getElementById('pomodoro-stop');
const btnReset = document.getElementById('pomodoro-reset');
let duration = 15 * 60, timer = duration, interval = null;
function updateDisplay() {
    let m = Math.floor(timer / 60), s = timer % 60;
    display.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
function start() {
    if (interval) return;
    interval = setInterval(() => {
        if (timer > 0) { timer--; updateDisplay(); }
        else { clearInterval(interval); interval = null; }
    }, 1000);
}
function stop() { clearInterval(interval); interval = null; }
function reset() { stop(); timer = duration; updateDisplay(); }
btnStart.onclick = start; btnStop.onclick = stop; btnReset.onclick = reset;
updateDisplay();