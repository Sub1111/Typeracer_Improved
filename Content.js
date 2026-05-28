function timerFunction(timerElement){
    const txt = timerElement.textContent;
    if (txt === ':03' || txt === ':02' || txt === ':01') playSound('ready');
    else if(txt === ':00') playSound('go');
}

function playSound(soundName) {
    const audio = new Audio(chrome.runtime.getURL(`sounds/${soundName}.mp3`));
    audio.play();
}

function checkTimer(mutations) {
    const timerElement = document.querySelector("body > div.countdownPopup.horizontalCountdownPopup > div > table > tbody > tr > td > table > tbody > tr > td:nth-child(3) > div > span");

    if (!timerElement) return;
    
    mutations.forEach(m => {
        if (timerElement === m.target || timerElement.contains(m.target))
            timerFunction(timerElement);
        
    });
}


const observer = new MutationObserver(checkTimer);
observer.observe(document.body, {
    childList: true,
    subtree: true
})
// input pass document.querySelector("#gwt-uid-60 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > input")
// txtInput-error
