function timerFunction(timerElement){
    const txt = timerElement.textContent;
    if (txt === ':03' || txt === ':02' || txt === ':01') playSound('ready');
    else if(txt === ':00') playSound('go');
}

function inputFunction(inputElement, m){
    console.log(m);
    if (inputElement.classList.contains("txtInput-error")){
        playSound("missed-punch");
    }
}

function playSound(soundName) {
    const audio = new Audio(chrome.runtime.getURL(`sounds/${soundName}.mp3`));
    audio.play();
}

function checkTimer(mutations) {
    const timerElement = document.querySelector("body > div.countdownPopup.horizontalCountdownPopup > div > table > tbody > tr > td > table > tbody > tr > td:nth-child(3) > div > span");
    const inputElement = document.querySelector("#dUI > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > div.mainViewport > div > table > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > input")

    
    mutations.forEach(m => {
        if (timerElement && (timerElement === m.target || timerElement.contains(m.target)))
            timerFunction(timerElement);
        if (inputElement && (inputElement === m.target || inputElement.contains(m.target)))
            inputFunction(inputElement, m);
    });
}


const observer = new MutationObserver(checkTimer);
observer.observe(document.body, {
    childList: true,
    subtree: true
})
// input pass 
// 
