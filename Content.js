function timerFunction(timerElement){
    const txt = timerElement.textContent;
    if (txt === ':03' || txt === ':02' || txt === ':01') playSound('ready');
    else if(txt === ':00') {
        playSound('go');
    }
}

function resetMistakes(){
    const mistakes = {};
    chrome.storage.local.set({mistakes})
}

async function saveMistake(wrongLetter){
    console.log(wrongLetter);
    const data = await chrome.storage.local.get("mistakes");

    const mistakes = data.mistakes || {};
    if (!mistakes[wrongLetter])
        mistakes[wrongLetter] = 0;

    mistakes[wrongLetter] += 1;

    console.log(mistakes);
    chrome.storage.local.set({ mistakes });
}

function inputFunction(inputElement, m){
    if (inputElement.classList.contains("txtInput-error")){
        playSound("missed-punch");
        const textElement = document.querySelector("#dUI > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > div.mainViewport > div > table > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div");
        
        console.log('===============================================================');
        for (const child of textElement.children) {
            if (getComputedStyle(child).color === "rgb(128, 51, 51)"){
                const wrongLetter = child.textContent;
                saveMistake(wrongLetter);
            }
        }
        console.log('===============================================================');
    }
}

function playSound(soundName) {
    const audio = new Audio(chrome.runtime.getURL(`sounds/${soundName}.mp3`));
    audio.play();
}

function mutationFunctions(mutations) {
    const timerElement = document.querySelector("body > div.countdownPopup.horizontalCountdownPopup > div > table > tbody > tr > td > table > tbody > tr > td:nth-child(3) > div > span");
    const inputElement = document.querySelector("#dUI > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > div.mainViewport > div > table > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > input");

    
    mutations.forEach(m => {
        if (timerElement && (timerElement === m.target || timerElement.contains(m.target)))
            timerFunction(timerElement);
        if (inputElement && (inputElement === m.target || inputElement.contains(m.target)))
            inputFunction(inputElement, m);
    });
}


const observer = new MutationObserver(mutationFunctions);
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
})
// document.querySelector("#gwt-uid-44 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div")
// Для замены #gwt-uid-номер document.querySelector("#dUI > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > div.mainViewport > div > table > tbody > tr:nth-child(2) > td:nth-child(3)")

// rgb(128, 51, 51) - цвет ошибки
//
