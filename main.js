// text to audio 

const textarea=document.querySelector("textarea"),
voiceList=document.querySelector("select"),
speechBtn=document.querySelector("button");
let synth=speechSynthesis,
isSpeaking=true;
 
function voices(){
  for (let voice of synth.getVoices()){
    let selected=voice.name==="Google US English"?"selected":"";
    let option=`<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend",option);
  }
}
 
synth.addEventListener("voiceschanged",voices);
 
function textTospeech(text){
  let utterance=new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()){
    if (voice.name===voiceList.value){
      utterance.voice=voice;
    }
  }
  synth.speak(utterance);
}
 
speechBtn.addEventListener("click",e=>{
  e.preventDefault();
  if (textarea.value!=="") {
    if (!synth.speaking) {
      textTospeech(textarea.value);
    }
 
    speechBtn.innerText = !isSpeaking ? "pause speech" : "resume speech";
 
    if (textarea.value.length > 80 && synth.speaking) {
      synth.pause();
      isSpeaking=false;
    } else if (!synth.speaking && isSpeaking) {
      synth.resume();
      isSpeaking=true;
    }
  }
});
