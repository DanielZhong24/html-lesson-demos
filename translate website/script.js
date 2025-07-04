const apiKEY = "AIzaSyBqfHVLbDmfRLBtC-GMazKlr3-vJ_azG2c";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKEY}`;
async function askGemini(textToTranslate,language) {

    const prompt = `Translate the following text to ${language}: ${textToTranslate}. I only need the translation itself.`;
    const payload = {
        contents: [
            {
                parts: [{text:prompt}]
            }
        ]
    };
    try {
        let response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        let data = await response.json();
        let aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
        console.log(aiResponse);
        return aiResponse;
    } catch (error) {
        console.error("Error:", error);
        return "Error fetching response.";
    }
}

async function translateText(){
    const textarea = document.getElementById("userInput");
    const text = textarea.value;

    const option = document.getElementById("language");
    const language = option.value;

    const result = await askGemini(text,language);
    console.log(result);
    document.getElementById("translatedText").innerText = result;

}

let timer;
document.getElementById("userInput").addEventListener("input",()=>{

    clearTimeout(timer);
    timer = setTimeout(function(){
        translateText();
    },1000);
});

