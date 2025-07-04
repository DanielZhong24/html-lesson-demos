
const apiKEY = "AIzaSyBLO2QqmJMbaUwXlLX6PhaWpUoXQHhUOks";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKEY}`;
let currentQuestion = 1;
let allMultipleChoice = "";
let practiceQuestions = {};
function insertCharacter(char){
    const textarea = document.getElementById("question");
    const start = textarea.selectionStart;
    const end  = textarea.selectionEnd;
    const text = textarea.value;

    textarea.value = text.substring(0,start) + char + text.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start+char.length, start + char.length);

}

async function askGemini(prompt) {
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

async function askQuestion(){
    const question = document.getElementById("question").value;
    let response = await askGemini(question + " do not add any styling to the text response.");

    const answer = document.getElementById("answer");
    answer.innerText = response;

    const praticeChoice = document.getElementsByClassName("practice-prompt")[0];
    praticeChoice.classList.remove("hidden");

}

async function generateQuestion(){
    const question = document.getElementById("question").value;

    const prompt = `${question} List 5 multiple-choice practice questions about this topic. The response should be a JSON object with the following schema and no extra text or styling outside of the JSON:

    {
      "1": {
        "question": "the practice question 1",
        "A": "choice A for question 1",
        "B": "choice B for question 1",
        "C": "choice C for question 1",
        "correct_answer": "the correct answer letter (A, B, or C) for question 1"
      },
    "2": {
        "question": "the practice question 2",
        "A": "choice A for question 2",
        "B": "choice B for question 2",
        "C": "choice C for question 2",
        "correct_answer": "the correct answer letter (A, B, or C) for question 2"
      },
      "3": {
        "question": "the practice question 3",
        "A": "choice A for question 3",
        "B": "choice B for question 3",
        "C": "choice C for question 3",
        "correct_answer": "the correct answer letter (A, B, or C) for question 3"
      },
      "4": {
        "question": "the practice question 4",
        "A": "choice A for question 4",
        "B": "choice B for question 4",
        "C": "choice C for question 4",
        "correct_answer": "the correct answer letter (A, B, or C) for question 4"
      },
      "5": {
        "question": "the practice question 5",
        "A": "choice A for question 5",
        "B": "choice B for question 5",
        "C": "choice C for question 5",
        "correct_answer": "the correct answer letter (A, B, or C) for question 5"
      },
    }`;    
    
    let response = await askGemini(prompt);
    response = response.substring(8,response.length-4);
    console.log(response);
    try{
        practiceQuestions = JSON.parse(response);
        createMultipleChoice(practiceQuestions[currentQuestion]);
    }catch(error){
        console.error("Error:", error);
    }

}

function no(){
    const praticeChoice = document.getElementsByClassName("practice-prompt")[0];
    praticeChoice.classList.add("hidden");
}


function createMultipleChoice(practiceQuestion){
    let practiceSection = document.getElementById("practice-section");
    practiceQuestion.innerHTML = "";
    let paragraph = document.createElement("p");
    paragraph.innerText = "QUESTION: " + practiceQuestion["question"];
    let optionA = document.createElement("input");
    optionA.value = "A";
    optionA.type = "radio";
    optionA.name = "x"
    let optionB = document.createElement("input");
    optionB.value = "B";
    optionB.type = "radio"
    optionB.name = "x"
    let optionC = document.createElement("input");
    optionC.value = "C";
    optionC.type = "radio"
    optionC.name = "x"
    
    let labelA = document.createElement("label");
    labelA.innerText = practiceQuestion["A"];
       
    let labelB = document.createElement("label");
    labelB.innerText = practiceQuestion["B"];
       
    let labelC = document.createElement("label");
    labelC.innerText = practiceQuestion["C"];

    let submit = document.createElement("button");
    submit.innerText = "Submit answer";
    submit.classList.add("primary-button");

    submit.addEventListener("click",()=>{
        nextQuestion.classList.remove("hidden");
        const radioButtons = document.getElementsByName("x");
        for(let i = 0; i <radioButtons.length;i++){
            if(radioButtons[i].checked){
                checkAnswer(radioButtons[i].value,practiceQuestion["correct_answer"]);

            }
        } 
    });
    nextQuestion=document.createElement("button");
    nextQuestion.innerHTML="Next";
    nextQuestion.classList.add("primary-button");
    nextQuestion.classList.add("hidden");
    // add an event listner to the next question button so that we can move the next question
    nextQuestion.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion <= 5) {
            const practiceSection = document.getElementById("practice-section");
            practiceSection.innerHTML = "";
            createMultipleChoice(practiceQuestions[currentQuestion]);
        } else {
            const practiceSection = document.getElementById("practice-section");
            practiceSection.innerHTML = "<p>You have finished all practice questions.</p>";
        }
    });

    practiceSection.appendChild(paragraph);
    practiceSection.appendChild(optionA);
    practiceSection.appendChild(labelA);
    practiceSection.appendChild(document.createElement("br"));
    practiceSection.appendChild(optionB);
    practiceSection.appendChild(labelB);
    practiceSection.appendChild(document.createElement("br"));
    practiceSection.appendChild(optionC);
    practiceSection.appendChild(labelC);
    practiceSection.appendChild(document.createElement("br"));
    practiceSection.appendChild(submit);
    practiceSection.appendChild(nextQuestion);
    let p=document.createElement("p");
    p.setAttribute("id","result");
    practiceSection.appendChild(p); 
}

function checkAnswer(selectedAnswer, correctAnswer){
    let p= document.getElementById("result");
    if(selectedAnswer===correctAnswer){
        p.style.color="green";   
        p.innerHTML="You got it right!";
    }else{
        p.style.color="red";   
        p.innerHTML="You got it wrong, the correct answer was: "+correctAnswer;
    }
}