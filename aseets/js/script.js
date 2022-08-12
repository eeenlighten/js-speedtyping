const typingText = document.querySelector(".typing-text p"),
inpFeild = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");


let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    
    let randInex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    
    paragraphs[randInex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active")
  
    document.addEventListener("keydown", () => inpFeild.focus());
    typingText.addEventListener("click", () => inpFeild.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpFeild.value.split("")[charIndex];
    if(charIndex < characters.length -1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);    
            isTyping = true;
        }
    
        if(typedChar == null) {
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect")
        } else {
            if(characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        inpFeild.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft)* 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    randomParagraph();
    inpFeild.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = 0;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpFeild.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);