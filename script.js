import { Data, allDataTotab, searchByName} from "./data.js";
import { upDateLength, attachItems,createPlannings} from "./composant.js";

const allData=allDataTotab(Data);
const box=document.getElementsByClassName("box");
const dropdown_title=document.querySelector(".dropdown_title");
const dropdown_menu=document.querySelector(".dropdown_menu");
const dropDownItems=document.getElementsByClassName("dropdown_item");
const boxResultSearch=document.querySelector(".box-result-search");
const boxSearch=document.getElementsByClassName("box-search")[0];
const searchBar=document.getElementsByClassName("search-bar")[0];
const container_result=document.querySelector(".container-result");
const circle=document.querySelector(".circle");
const actvities__title=document.querySelector(".actvities__title>span");

actvities__title.innerHTML="l2 cdsd";
let resultSearch=searchByName("l2 cdsd");
createPlannings(resultSearch);

circle.addEventListener("click",()=>{
    circle.classList.toggle("active");
})


searchBar.addEventListener("input",(e)=>{
    const value=e.target.value;
    let tabRes="";
    if (value!="") {
        boxResultSearch.classList.add("active");
        let result=allData.filter(item=>item.includes(value));
        result.forEach(item=>{
            tabRes+=`<p class="result-item" >${item}</p>`;
        })
    }
    else
        boxResultSearch.classList.remove("active");
    container_result.innerHTML=tabRes;
    container_result.querySelectorAll(".result-item").forEach(item=>{
        item.addEventListener("click",(e)=>{
            searchBar.value=item.textContent;
            boxResultSearch.classList.remove("active");

        })
    })
})

// searchBar.addEventListener("focusout",()=>{
//     boxResultSearch.classList.remove('active');
// })
searchBar.addEventListener("focus",()=>{
    boxResultSearch.classList.add('active');
})

boxSearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log(searchBar.value);
})

upDateLength([...box], Data);

attachItems("enseignant", dropdown_title, dropdown_menu,dropDownItems,actvities__title);



[...box].forEach(item=>{
    item.addEventListener("click",()=>{
        [...box].forEach(item=>item.classList.remove("active"));
        let champs=item.className.slice(4);
        attachItems(champs, dropdown_title,dropdown_menu,dropDownItems,actvities__title);
        item.classList.add("active");
    })
});

