const message = document.querySelector("#text");
const speed = document.querySelector("#speed__num");
const readBtn = document.querySelector(".read");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");

// ---------------------------- initial obj ----------------------------
const utterance = new SpeechSynthesisUtterance();

// ---------------------------- read message function ----------------------------
readBtn.addEventListener("click", function () {
  readMessage(message.value);
});
function readMessage(para) {
  if (speechSynthesis.paused) {
    return speechSynthesis.resume();
  }
  utterance.text = para;
  utterance.rate = speed.value;
  speechSynthesis.speak(utterance);
  text.disabled = true;
}

// ---------------------------- pause read message function ----------------------------
pauseBtn.addEventListener("click", function () {
  if (speechSynthesis.speaking) speechSynthesis.pause();
});
// ---------------------------- stop read message function ----------------------------
stopBtn.addEventListener("click", stopRead);
function stopRead() {
  speechSynthesis.cancel();
}

// ----------------------------disable text function ----------------------------
utterance.addEventListener("end", function () {
  text.disabled = false;
});

// ---------------------------- change speed function ----------------------------
utterance.addEventListener("boundary", function (e) {
  currentChar = e.charIndex;
});
speed.addEventListener("change", function () {
  stopRead();
  readMessage(utterance.text.substring(currentChar));
});
