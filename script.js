
// Speech synthesis object properties 
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const volume = document.querySelector('#volume');
const volumeValue = document.querySelector('#volume-value');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
const banner = document.querySelector('#first-img');

// Initialize list of voices to be populated 
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Iterate through voices and create an option for each voice
  voices.forEach(voice => {
    // Create option DOM element
    const option = document.createElement('option');
    // Set option to voice and language 
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
  // Check if already speaking
  if (synth.speaking) {
    return;
  }
  if (textInput.value !== '') {
    // Add sound wave animation to banner 
    banner.insertAdjacentHTML("beforeend", "<img src='https://res.cloudinary.com/dt45rb7rf/image/upload/v1631715269/giphy-3_gfvbo3.gif' id='secont-img'>");

    // Get the text to speak
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // When speak ends
    speakText.onend = e => {
      banner.removeChild(banner.lastChild);
    };

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    // Loop through voices and match it to voice option selected
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS

// Text form submit action
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Initialize volume label
volumeValue.textContent = Math.ceil((volume.value * 100)) + "%";

// Volume value change
volume.addEventListener("change", e => (volumeValue.textContent = Math.ceil((volume.value * 100)) + "%"));

// Initialize rate label text content
rateValue.textContent = rate.value + " X";

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value + " X"));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());