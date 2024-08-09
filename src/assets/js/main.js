let cover=document.querySelector(".cover");
window.addEventListener("load" , ()=>{
    cover.style.opacity = 0;
    setTimeout(()=>{
        cover.style.display ="none";
    },2000)
})
