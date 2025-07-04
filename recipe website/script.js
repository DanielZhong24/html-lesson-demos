const portionList = document.getElementById("portion-list");
const portion1x = document.getElementById("serving-1x");
const portion2x = document.getElementById("serving-2x");
const portion4x = document.getElementById("serving-4x");
const madeItbtn = document.getElementById("madeIt");
const strongElement = document.querySelector("#success strong");
const savedNumber =  localStorage.getItem("homeCooks") || 0;
strongElement.innerText = savedNumber;
madeItbtn.addEventListener("click", ()=>{
    madeItbtn.innerText= "I Made It ✓";
    
    let currentNumber = parseInt(strongElement.innerText);
    if (isNaN(currentNumber)) {
        currentNumber = savedNumber;
    }
    currentNumber++;
    strongElement.innerText = currentNumber;
    localStorage.setItem("homeCooks",currentNumber);
});

function clearActive(){
    portion1x.classList.remove("active");
    portion2x.classList.remove("active");
    portion4x.classList.remove("active");

}
portion1x.addEventListener("click",()=>{
    clearActive();
    portion1x.classList.add("active");
    portionList.innerHTML=`
                <li>½ cup unsalted butter</li>
                <li>1 cups packed brown sugar</li>
                <li>3 tablespoons white sugar</li>
                <li>1 egg</li>
                <li>2 teaspoons vanilla extract</li>
                <li>1 ¾ cups all-purpose flour</li>
                <li>½ teaspoon baking soda</li>
                <li>½  teaspoon baking powder</li>
                <li>½  teaspoon salt</li>
                <li>1 ½  teaspoons instant espresso coffee powder</li>
                <li>1 ½  cups semisweet chocolate chips</li>
    `;
});

portion2x.addEventListener("click",()=>{
    clearActive();
    portion2x.classList.add("active");

    portionList.innerHTML=`
                <li>1 cup unsalted butter</li>
                <li>2 cups packed brown sugar</li>
                <li>6 tablespoons white sugar</li>
                <li>2 egg</li>
                <li>4 teaspoons vanilla extract</li>
                <li>3 ½ cups all-purpose flour</li>
                <li>1 teaspoon baking soda</li>
                <li>1  teaspoon baking powder</li>
                <li>1  teaspoon salt</li>
                <li>1 tablespoon instant espresso coffee powder</li>
                <li>3 cups semisweet chocolate chips</li>
    `;
});

portion4x.addEventListener("click",()=>{
    clearActive();
    portion4x.classList.add("active");

    portionList.innerHTML=`
                <li>2 cup unsalted butter</li>
                <li>4 cups packed brown sugar</li>
                <li>12 tablespoons white sugar</li>
                <li>4 egg</li>
                <li>8 teaspoons vanilla extract</li>
                <li>7  cups all-purpose flour</li>
                <li>2 teaspoon baking soda</li>
                <li>2  teaspoon baking powder</li>
                <li>2  teaspoon salt</li>
                <li>2 tablespoon instant espresso coffee powder</li>
                <li>6 cups semisweet chocolate chips</li>
    `;
});


