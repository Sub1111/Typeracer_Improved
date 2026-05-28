function playSound() {
    const audio = new Audio(chrome.runtime.getURL("sounds/go.wav"));
    audio.play();
}


document.getElementById("play").addEventListener("click", playSound);