const classeVal=["l2 glrs a","l2 glrs b","l2 etse","l1 a", "iage b","l2 cdsd",];
const salleVal=["101","102","103","104","201","incub",];
const enseignantVal=["aly","baila","ndoye","mbaye","djiby","seckouba",];
const moduleVal=["algo","php","python", "lc", "javascript", "java",];
const horaire=[
    // {salle:"201",module:"php",classe:"iage b",ens:"",jour:0,deb:9,fin:12,},
    {salle:"incub",module:"lc",classe:"l2 cdsd",ens:"mbaye",jour:3,deb:8,fin:10,},
    {salle:"102",module:"php",classe:"l2 cdsd",ens:"baila",jour:0,deb:14,fin:17,},
    {salle:"102",module:"javascript",classe:"l2 cdsd",ens:"aly",jour:2,deb:16,fin:17,},
    {salle:"201",module:"python",classe:"l2 cdsd",ens:"aly",jour:0,deb:9,fin:11,},
];
const classe= new Set(classeVal);
const salle= new Set(salleVal);
const enseignant= new Set(enseignantVal);
const module= new Set(moduleVal);

const Data={classe,salle, enseignant, module,horaire};
function searchByName(name) {
    let tabRes=[];
    const lName=name.toLowerCase();
    Data["horaire"].forEach(item=>{
        const copyItem={...item};
        for (const key in copyItem) {
            const element = copyItem[key];
            if (element==lName) {
                for (const ide in copyItem) {
                    const el = copyItem[ide];
                    if(el==lName)
                        delete copyItem[ide] 
                }
                tabRes.push(copyItem);
            }
        }
    });
    
    return tabRes;
}

// let tableau=searchByName('iage B') 
// console.log(tableau);

function addElement(name, where) {
    const low=where.toLowerCase();
    const element=Data[low];
    if (element) {
        if (!element[0]) {//element est un set
            const lname=name.toLowerCase();
            element.add(name)
        }
        else{ //element est un objet
            let result=element.reduce((acc, item)=>acc || JSON.stringify(item)===JSON.stringify(name),false);//recherche si l'element existe ou pas
            let found=undefined;
            if(element[0].deb)
            {
                found=element.find(item=>{
                    const {deb,fin,jour,salle}=item;
                    const {deb:deb1,fin:fin1,jour:jour1,salle:salle1}=name;
                    if (jour==jour1 && salle==salle1) {
                        const log1=deb<=deb1 && deb1<fin;
                        const log2=log1 || (deb<fin1 && fin1<=fin);
                        const log3=log2 || (deb1<deb && fin1>fin);
                        return log3;
                    }
                })
            }
            if (!result && !found) {
                element.push(name);
            }
        }
    }
}

function dataToTab(champs) {
    const lowerChamps=champs.toLowerCase();
    const element=Data[lowerChamps];
    if (element) {
        if (!element[0]) {
            return Array.from(element)
        }
        // else
        // {
        //     let tabModule=[];
        //     element.forEach(item=>{
        //         tabModule.push(item.nomMod)
        //     });
        //     return tabModule;
        // }
    }
}

function allDataTotab(Data) {
    let tab=[];
   for (const key in Data) {
        if (key!="horaire")
            tab.push(...dataToTab(key));
   }
    return tab;
}

// addElement( {
//     salle: '102',
//     module: 'php',
//     classe: 'L2 CDSD',
//     jour: 3,
//     deb: 8,
//     fin: 10
//   },
// "horaire");

export {Data, dataToTab, allDataTotab,searchByName};