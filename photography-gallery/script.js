//variables
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;


function showLightBox(index){
    lightbox.style.display = 'flex';
    lightboxImg.src = galleryItems[index].src;
    currentIndex = index;
}
galleryItems.forEach((item,index)=>{
    item.addEventListener("click",()=>{
        showLightBox(index);
    });
});

//make it so that when the user clicks on the x, it will exit the current dark screen
closeBtn.addEventListener("click",()=>{
    lightbox.style.display = 'none';
});

prevBtn.addEventListener("click",()=>{
    currentIndex = (currentIndex-1+galleryItems.length)%galleryItems.length;
    showLightBox(currentIndex);
});

//next image button


function addPhoto(){
    const input = document.getElementById("photoInput");
    const gallery = document.getElementById("gallery");

    if(input.files && input.files[0]){
        const reader = new FileReader();

        reader.onload = function(e){
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("gallery-item");
            img.addEventListener("click", ()=>{
                showLightBox(galleryItems.length);
            });
            gallery.appendChild(img);
        };

        reader.readAsDataURL(input.files[0]);
        
    }
}