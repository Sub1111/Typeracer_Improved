function playSound(soundName) {
    const audio = new Audio(chrome.runtime.getURL(`sounds/${soundName}.mp3`));
    audio.play();
}

function checkTimer(mutations) {
    const el = document.querySelector("body > div.countdownPopup.horizontalCountdownPopup > div > table > tbody > tr > td > table > tbody > tr > td:nth-child(3) > div > span");

    if (!el) return;
    
    mutations.forEach(m => {
        if (!(el === m.target || el.contains(m.target))) return;
        
        const txt = el.textContent;
        if (txt === ':03' || txt === ':02' || txt === ':01') playSound('ready');
        else if(txt === ':00') playSound('go');
    });
}


const observer = new MutationObserver(checkTimer);
observer.observe(document.body, {
    childList: true,
    subtree: true
})
// input pass document.querySelector("#gwt-uid-60 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > input")
// txtInput-error
