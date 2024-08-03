let a=document.querySelectorAll(".box")
let btn=document.querySelector("#btn")
let newBtn=document.querySelector(".newBtn")
let Newgame=document.querySelector(".fullhide")
let winner=document.querySelector(".para")
let container=document.querySelector(".container")
 
 let turnO=true;
 let count = 0;
 const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


  for(let i=0;i<a.length;i++){
   a[i].addEventListener("click",()=>{
   if(turnO){
     a[i].innerText="O"
     turnO=false;
   }else{
     a[i].innerText="X"
     turnO=true;  
   }
   a[i].disabled=true;
   count++; 
    
   let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      draw();
    }
    
   })
   
 }
  
 const draw=()=>{   
       winner.innerText="Match Draw !"  
       Newgame.classList.remove("fullhide");
       container.classList.add("mainhide");
       btn.classList.add("fullhide");
       disable()   
   }
 const disable=()=>{
   for(let box of a){
     box.disabled=true;
   }
 }
 const enable=()=>{
   for(let box of a){
     box.disabled=false;
     box.innerText="";  
   }
 }
 
 const showWinner=(box1val)=>{
   winner.innerHTML=`Winner is "${box1val}"`
   Newgame.classList.remove("fullhide");
   btn.classList.add("fullhide");
   disable()
 }
 
 const checkWinner=()=>{
   for(pattern of winPatterns){
     let box1val=a[pattern[0]].innerText
     let box2val=a[pattern[1]].innerText
     let box3val=a[pattern[2]].innerText
     
     if(box1val!="" && box2val!="" && box3val!=""){
       if(box1val==box2val && box2val==box3val){
       showWinner(box1val);
       return true;
        }
     }
   }
 }

  const reset= ()=>{ 
    count=0; 
    
    Newgame.classList.add("fullhide");
    btn.classList.remove("fullhide");
   enable(); 
  }
  newBtn.addEventListener("click",reset)
  btn.addEventListener("click",reset)
