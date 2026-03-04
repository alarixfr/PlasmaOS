const appDisplay = document.getElementById('appdisplay');
const aboutApp = document.getElementById('system-app');
const terminalApp = document.getElementById('terminal-app');
const noteApp = document.getElementById('note-app');
const pomodoroApp = document.getElementById('pomodoro-app');

let activeWindow = '';

let savedNote = '';

aboutApp.addEventListener('click', () => {
    if (activeWindow) {
        appDisplay.querySelector('.window').remove();
    }

    const aboutAppWindowElement = document.createElement('about-app');
    appDisplay.append(aboutAppWindowElement);
    activeWindow = 'about';

    const aboutAppWindowDiv = aboutAppWindowElement.querySelector('div');
    aboutAppWindowDiv.classList.add('window-animation');

    aboutAppWindowDiv.addEventListener('animationend', () => {
        aboutAppWindowDiv.classList.remove('window-animation');
    }, { once: true });
});

terminalApp.addEventListener('click', () => {
    if (activeWindow) {
        appDisplay.querySelector('.window').remove();
    }

    const terminalAppWindowElement = document.createElement('terminal-app');
    appDisplay.append(terminalAppWindowElement);
    activeWindow = 'terminal';

    const terminalAppWindowDiv = terminalAppWindowElement.querySelector('div');
    terminalAppWindowDiv.classList.add('window-animation');

    terminalAppWindowDiv.addEventListener('animationend', () => {
        terminalAppWindowDiv.classList.remove('window-animation');
    }, { once: true });
});

noteApp.addEventListener('click', () => {
    if (activeWindow) {
        appDisplay.querySelector('.window').remove();
    }

    const noteAppWindowElement = document.createElement('note-app');
    appDisplay.append(noteAppWindowElement);
    activeWindow = 'note';

    const noteAppWindowDiv = noteAppWindowElement.querySelector('div');
    noteAppWindowDiv.classList.add('window-animation');

    noteAppWindowDiv.addEventListener('animationend', () => {
        noteAppWindowDiv.classList.remove('window-animation');
    }, { once: true });
});

pomodoroApp.addEventListener('click', () => {
    if (activeWindow) {
        appDisplay.querySelector('.window').remove();
    }

    const pomodoroAppWindowElement = document.createElement('pomodoro-app');
    appDisplay.append(pomodoroAppWindowElement);
    activeWindow = 'pomodoro';

    const pomodoroAppWindowDiv = pomodoroAppWindowElement.querySelector('div');
    pomodoroAppWindowDiv.classList.add('window-animation');

    pomodoroAppWindowDiv.addEventListener('animationend', () => {
        pomodoroAppWindowDiv.classList.remove('window-animation');
    }, { once: true });
});

class aboutAppWindow extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="window">
                <div class="window-control">
                    <h1>PlasmaOS About</h1>
                    <button class="window-close">X</button>
                </div
                <div class="window-content">
                    <p>PlasmaOS is an OS concept built in the web with html and css. PlasmaOS is open source and made for Hackclub Flavortown project.</p>
                    <p>PlasmaOS V1<p>
                    <br>
                    <p><a class="windowbutton" href="https://github.com/alarixfr/plasmaOS" target="_blank" rel="noopener noreferrer">VIEW GITHUB REPO</a><p>
                <div>
            </div>
        `;

        this.querySelector('.window-close').addEventListener('click', () => {
            activeWindow = '';
            this.remove();
        });
    }
}

class terminalAppWindow extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="window">
                <div class="window-control">
                    <h1>Terminal</h1>
                    <button class="window-close">X</button>
                </div>
                <div class="window-content">
                    <p>[PlasmaOS][Terminal] Admin Access.</p>
                    <p>type 'help' to list all commands.</p>
                    <div class="terminal-content">
                        <div class="terminal-line">
                            <p>[PLASMA ADMIN] ></p>
                            <input class="terminal-input" type="text" maxlength="10" autocomplete="off">
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.querySelector('.window-close').addEventListener('click', () => {
            activeWindow = '';
            this.remove();
        });

        this.querySelector('.terminal-content').addEventListener('keypress', (e) => {
            if (!e.target.classList.contains('terminal-input')) return;
            if (e.key !== "Enter") return;

            const terminalContentContainer = this.querySelector('.terminal-content');
            const latestCmd = e.target;
            const terminalLineElement = latestCmd.closest('.terminal-line');
            const copiedTerminalLine = terminalLineElement.cloneNode(true);
            copiedTerminalLine.querySelector('.terminal-input').value = '';

            let resultText;
            if (latestCmd.value === "help") {
                resultText = 'CMD: os | dev | random';
            } else if (latestCmd.value === "os") {
                resultText = 'PlasmaOS v1';
            } else if (latestCmd.value === "dev") {
                resultText = 'Alaric Abyasa aka Alarixfr';
            } else if (latestCmd.value === "random") {
                resultText = `${Math.floor((Math.random() * 100) + 1)}`;
            } else {
                resultText = 'Command not recognized as an internal or external command.';
            }

            const resultElement = document.createElement('p');
            resultElement.textContent = resultText;

            terminalContentContainer.append(resultElement);
            terminalContentContainer.append(copiedTerminalLine);
            terminalLineElement.remove();
            copiedTerminalLine.querySelector('.terminal-input').focus();
        });
    }
}

class noteAppWindow extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="window">
                <div class="window-control">
                    <h1>Note</h1>
                    <button class="window-close">X</button>
                </div>
                <div class="window-content">
                    <p>untitled.txt - editing</p>
                    <textarea class="note-textarea"></textarea>
                    <button class="note-savebtn">Save</button>
                </div>
            </div>
        `;

        this.querySelector('.note-textarea').value = savedNote;

        this.querySelector('.window-close').addEventListener('click', () => {
            activeWindow = '';
            this.remove();
        });

        this.querySelector('.note-savebtn').addEventListener('click', (e) => {
            savedNote = this.querySelector('.note-textarea').value;
            e.target.textContent = 'Saved';
            setTimeout(() => {
                e.target.textContent = 'Save';
            }, 300);
        });
    }
}

class pomodoroAppWindow extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="window">
                <div class="window-control">
                    <h1>Pomodoro Timer</h1>
                    <button class="window-close">X</button>
                </div>
                <div class="window-content pomodoro-window">
                    <p class="pomodoro-phase">Work - 1</p>
                    <p>Time remaining:</p>
                    <p class="pomodoro-time">25:00</p>
                    <button class="pomodoro-button">Start</button>
                </div>
            </div>
        `;

        this.querySelector('.window-close').addEventListener('click', () => {
            activeWindow = '';
            clearInterval(timerInterval);
            this.remove();
        });

        const phases = [
            { label: 'Work - 1',      duration: 25 * 60 },
            { label: 'Short Break - 1', duration: 5 * 60 },
            { label: 'Work - 2',      duration: 25 * 60 },
            { label: 'Short Break - 2', duration: 5 * 60 },
            { label: 'Work - 3',      duration: 25 * 60 },
            { label: 'Short Break - 3', duration: 5 * 60 },
            { label: 'Work - 4',      duration: 25 * 60 },
            { label: 'Long Break',    duration: 15 * 60 },
        ];

        let phaseIndex = 0;
        let timeRemaining = phases[0].duration;
        let timerInterval = null;
        let running = false;

        const phaseEl = this.querySelector('.pomodoro-phase');
        const timeEl = this.querySelector('.pomodoro-time');
        const buttonEl = this.querySelector('.pomodoro-button');

        const formatTime = (seconds) => {
            const m = String(Math.floor(seconds / 60)).padStart(2, '0');
            const s = String(seconds % 60).padStart(2, '0');
            return `${m}:${s}`;
        };

        buttonEl.addEventListener('click', () => {
            if (!running) {
                running = true;
                buttonEl.textContent = 'Pause';
                timerInterval = setInterval(() => {
                    timeRemaining--;
                    timeEl.textContent = formatTime(timeRemaining);

                    if (timeRemaining <= 0) {
                        clearInterval(timerInterval);
                        phaseIndex = (phaseIndex + 1) % phases.length;
                        timeRemaining = phases[phaseIndex].duration;
                        phaseEl.textContent = phases[phaseIndex].label;
                        timeEl.textContent = formatTime(timeRemaining);
                        running = false;
                        buttonEl.textContent = 'Start';
                    }
                }, 1000);
            } else {
                running = false;
                clearInterval(timerInterval);
                buttonEl.textContent = 'Resume';
            }
        });
    }
}

customElements.define('about-app', aboutAppWindow);
customElements.define('terminal-app', terminalAppWindow);
customElements.define('note-app', noteAppWindow);
customElements.define('pomodoro-app', pomodoroAppWindow);