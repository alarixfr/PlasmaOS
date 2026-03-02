const lockscreenContainer = document.getElementById('lockscreen-container');
const systemUI = document.getElementById('system-ui');
const time = document.getElementById("lockscreen-time");
const greet = document.getElementById("lockscreen-greet");
const passInput = document.getElementById('lockscreen-input');
const greetingList = ["Hello!", "Welcome Back!", "How's Today?"]
const passcode = 'plasmaos';

let unlocked = false;

function unlock() {
    setTimeout(() => {
        lockscreenContainer.remove();
        document.body.style.backdropFilter = 'none';
        unlocked = true;
        initUnlock();
    }, 500);
}

function setTime() {
    const now = new Date();
    const timeFormat = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });
    time.textContent = timeFormat;
}

function setGreeting() {
    const random = Math.floor(Math.random() * greetingList.length);
    greet.textContent = greetingList[random];
}

function init() {
    console.log(passcode);
    setTime();
    setGreeting();
    const setTimeInterval = setInterval(setTime, 1000 * 60);

    systemUI.style.display = 'none';

    passInput.addEventListener('input', () => {
        passInput.classList.remove('passcode-correct');
        passInput.classList.remove('passcode-error');
        if (passInput.value.length === 8) {
            if (passInput.value === passcode) {
                passInput.classList.add('passcode-correct');
                console.log('Correct!');
                unlock();
            } else {
                passInput.classList.add('passcode-error');
                console.log(`Wrong! Passcode: ${passcode}`);
            }
        }
    });
}

function initUnlock() {
    systemUI.style.display = 'flex';
}

init();