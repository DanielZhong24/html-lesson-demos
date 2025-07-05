const apiKEY = "AIzaSyBLO2QqmJMbaUwXlLX6PhaWpUoXQHhUOks";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKEY}`;

// Handle fetching AI response
async function askGemini(prompt) {
  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    return aiText;
  } catch (err) {
    console.error("API error:", err);
    return "Something went wrong.";
  }
}

async function getFact() {
  const prompt = "Tell me a random fun fact or cool idea in one paragraph. Keep it casual and interesting.";
  toggleLoading(true); 

  const fact = await askGemini(prompt);

  toggleLoading(false);  
  typeText(fact);  
}

function typeText(text) {
  const output = document.getElementById("output");
  output.innerText = "";
  let i = 0;
  const speed = 25;
  const rate = document.getElementById("rateSlider").value;  
  const pitch = document.getElementById("pitchSlider").value;  

  responsiveVoice.speak(text, "UK English Male", { rate: rate, pitch: pitch });

  const interval = setInterval(() => {
    if (i < text.length) {
      output.innerText += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

function toggleLoading(show) {
  const spinner = document.getElementById("loadingSpinner");
  spinner.style.display = show ? "block" : "none";
}

document.getElementById("getFactBtn").addEventListener("click", getFact);
