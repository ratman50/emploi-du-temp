import { dataToTab,searchByName} from "./data.js";

function createAnElement(bloc,inner) {
    let bl=document.createElement(bloc);
    bl.innerText=inner;
    return bl;
}

function upDateLength(tab, Data) {
    tab.forEach(item=>{
        let val=item.className.slice(4).replace(" active",'');
        const element=Data[val];
        if (element) {
            const number=item.querySelector(".number");
            if (element[0])
                number.innerHTML=element.length;
            else
                number.innerHTML=element.size;
        }
    })
}
function createDropDownItem(itemName) {
    const li=`<li class="dropdown_item">${itemName}</li>`;
    return li;
}
function createDropDownItems(items,container) {
    let tab="";
    items.forEach(item=>{
        tab+=createDropDownItem(item);
    })
    container.innerHTML=tab;
}
function attachItems(title, containerTitle, container, containerItems,activities__title) {
    containerTitle.innerHTML=title;
    createDropDownItems(dataToTab(title), container);
    [...containerItems].forEach((item, pos)=>{
        item.style.cssText=`
        transform-origin: top center;
        animation: translateX 300ms ${(pos+1) * 60}ms ease-in-out forwards
        `;
        item.addEventListener("click",()=>{
            containerTitle.innerHTML=item.textContent;
            activities__title.innerHTML=item.textContent;
            createPlannings(searchByName(item.textContent));
        })
    })
}
function generateColor() {
    const r=Math.floor(Math.random()*255);
    const g=Math.floor(Math.random()*255);
    const b=Math.floor(Math.random()*255);
    return `rgb(${r}, ${g}, ${b})`;
}

function createPlanning(result) {
    let tabPlan="";
    for (const key in result) {
            const element = result[key];
            if(key!="deb" && key!="fin" && key!="jour")
            tabPlan+=`<p>${element}</p>\n`
        }
    return tabPlan.split("\n").reverse().join("");
}
function createPlannings(tabRes) {
    let container;
    const matchings=document.querySelectorAll(".matching");
    matchings.forEach(item=>item.innerHTML="")
    tabRes.forEach(item=>{
        const {jour,deb,fin}=item;
        const int=fin-deb;
        const val=deb-8;
        container=`
        <div style="width:calc((8.4% + 1em) * ${int+1});left:calc(${8.8*val}% + ${val*1}em) ;background-color:${generateColor()} ;" class="plan">
        ${createPlanning(item)}
        </div>
        `;
        matchings[jour].insertAdjacentHTML("beforeend",container);
    })
}


export {upDateLength,attachItems,createPlannings};