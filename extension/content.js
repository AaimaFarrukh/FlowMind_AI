const style = document.createElement("link");
style.rel = "stylesheet";
style.href = chrome.runtime.getURL("style.css");
document.head.appendChild(style);

function removePopup() {
    const popup = document.getElementById("ai-popup");
    if (popup) popup.remove();
}

document.addEventListener("mousedown", function(event) {
    const popup = document.getElementById("ai-popup");
    if (!popup) return;

    if (!event.target.closest("#ai-popup")) {
        removePopup();
    }
});

document.addEventListener("mouseup", function(event){
      // If click happened inside popup → do nothing
    if (event.target.closest("#ai-popup")) {
        return;
        }
    const selectedText = window.getSelection().toString().trim();

    if (selectedText.length>0){
        console.log("Selected Text:", selectedText);
        createPopup(selectedText,event);
    } else {
        removePopup();
    }
});
function createPopup(text,event){
    //Remove existing popup if alr there
    removePopup();

    // Create a new popup div
    const popup = document.createElement("div");
    popup.id = "ai-popup";
    popup.innerHTML = `
    <div id="ai-header-row">
        <div id="ai-header">FlowMind AI</div>
        <button id="ai-close" aria-label="Close popup">&times;</button>
    </div>
    <div class="language-selector">
        <label for="lang-select">Select Language:</label>
        <select id="lang-select">
            <option value="english">English</option>
            <option value="urdu">Urdu</option>
            <option value="roman-urdu">Roman Urdu</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="arabic">Arabic</option>
        </select>
    </div>
    <button id="summarize"> Summarize </button>
    <button id="translate"> Translate </button>
    <button id="simplify"> Simplify </button>
    <button id="eli5">Explain Like I'm 5</button>
    <button id="bullets">Bullet Points</button>
    <button id="copy">Copy</button>
    <div id="ai-result"> </div>
    `

    // Popup position
    popup.style.top = (event.pageY + 10)+ "px";
    popup.style.left = (event.pageX + 10) + "px";
    
    document.body.appendChild(popup);
    document.getElementById("ai-close").onclick = () => removePopup();

    // Adding click events. Send to the backend
    document.getElementById("summarize").onclick = () => sendToBackend(text,"summarize");
    //document.getElementById("summarize").onclick = () => {console.log("Summarize clicked");}
    document.getElementById("translate").onclick = () => sendToBackend(text,"translate");
    document.getElementById("simplify").onclick = () => sendToBackend(text,"simplify");
    document.getElementById("eli5").onclick = () => sendToBackend(text,"eli5")
    document.getElementById("bullets").onclick = () => sendToBackend(text,"bullets")
    document.getElementById("copy").onclick = ()=>{
        navigator.clipboard.writeText(
        document.getElementById("ai-result").innerText
        )}
}

function sendToBackend(text, action){

    // Show loading 
    const resultDiv = document.getElementById("ai-result")
    resultDiv.innerHTML = "🤖 AI is thinking...";

    const selectedLanguage = document.getElementById("lang-select").value;

    // Send data to backend
    fetch("http://localhost:8000/process",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            text:text,
            action: action,
            language: selectedLanguage})
    })

    // then is used to wait in js
    .then(res => {
    if (!res.ok) throw new Error("Server error");
    return res.json();})
    .then(data=>
    {
        resultDiv.innerText = data.result
    }
    )

    .catch(err =>
    {
        console.error(err);
        resultDiv.innerText = "Error connecting to AI backend";
    }
    );
}
