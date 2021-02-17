
let ikonica = document.getElementById("ikonica");
ikonica.addEventListener("click",getAmount);

let baza=getOption().valuta1.value;
let valuteVrednosti;
let bazaVrednost;
let drugaValuta = getOption().valuta2.value;
let datumPP;


posaljiZahtevZaVrednosti();




function getAmount(){

    let iznos = document.getElementById("iznos").value;
    console.log(iznos);

     if(iznos==""){
        alert("Morate uneti broj!");
        return;
    }

    let iznosBroj = parseFloat(iznos);

    

        let kursBroj=vratiKursValute(drugaValuta,valuteVrednosti);
        if(baza==drugaValuta){
            kursBroj=1;
        }



        console.log(kursBroj);

        let rez = iznosBroj*kursBroj;
        document.getElementById("rezultat").innerText=rez.toFixed(2);

}


function getOption(){

    let obj1=document.getElementById("valuta1");
    let izbor1 = obj1.options[obj1.selectedIndex];

    let izbor1Text=izbor1.text;

    let obj2 = document.getElementById("valuta2");
    let izbor2 = obj2.options[obj2.selectedIndex];

    let izbor2Text=izbor2.text;

   // console.log(izbor1.value+"   "+izbor1Text);

    return {valuta1:izbor1,
            valuta2:izbor2};

}

function promeniValutu1(meni){

       document.getElementById("iznosValutaText1").innerHTML=meni.value;

       baza=getOption().valuta1.value;

       posaljiZahtevZaVrednosti();

 
}

function promeniValutu2(meni){

    document.getElementById("iznosValutaText2").innerHTML=meni.value;

    drugaValuta=getOption().valuta2.value;

    popuniTabelu();
 
}

   



function vratiKursValute(kurs,valuteVrednosti){

    let kursBroj;

    switch(kurs){

        case "EUR": kursBroj=valuteVrednosti.EUR;
        break;
        case "CAD": kursBroj=valuteVrednosti.CAD;
        break;
        case "HKD": kursBroj=valuteVrednosti.HKD;
        break;
        case "ISK": kursBroj=valuteVrednosti.ISK;
        break;
        case "PHP": kursBroj=valuteVrednosti.PHP;
        break;
        case "DKK": kursBroj=valuteVrednosti.DKK;
        break;
        case "HUF": kursBroj=valuteVrednosti.HUF;
        break;
        case "CZK": kursBroj=valuteVrednosti.CZK;
        break;
        case "AUD": kursBroj=valuteVrednosti.AUD;
        break;
        case "RON": kursBroj=valuteVrednosti.RON;
        break;
        case "SEK": kursBroj=valuteVrednosti.SEK;
        break;
        case "IDR": kursBroj=valuteVrednosti.IDR;
        break;
        case "INR": kursBroj=valuteVrednosti.INR;
        break;
        case "BRL": kursBroj=valuteVrednosti.BRL;
        break;
        case "RUB": kursBroj=valuteVrednosti.RUB;
        break;
        case "HRK": kursBroj=valuteVrednosti.HRK;    
        break;
        case "JPY": kursBroj=valuteVrednosti.JPY;
        break;
        case "THB": kursBroj=valuteVrednosti.THB;
        break;
        case "CHF": kursBroj=valuteVrednosti.CHF;
        break;
        case "SGD": kursBroj=valuteVrednosti.SGD;
        break;
        case "PLN": kursBroj=valuteVrednosti.PLN;
        break;
        case "BGN": kursBroj=valuteVrednosti.BGN;
        break;
        case "TRY": kursBroj=valuteVrednosti.TRY;
        break;
        case "CNY": kursBroj=valuteVrednosti.CNY;
        break;
        case "NOK": kursBroj=valuteVrednosti.NOK;
        break;
        case "NZD": kursBroj=valuteVrednosti.NZD;
        break;
        case "ZAR": kursBroj=valuteVrednosti.ZAR;
        break;
        case "USD": kursBroj=valuteVrednosti.USD;
        break;
        case "MXN": kursBroj=valuteVrednosti.MXN;
        break;
        case "ILS": kursBroj=valuteVrednosti.ILS;
        break;
        case "GBP": kursBroj=valuteVrednosti.GBP;
        break;
        case "KRW": kursBroj=valuteVrednosti.KRW;
        break;
        case "MYR": kursBroj=valuteVrednosti.MYR;
        break;
        
    }

    return kursBroj;
}

function popuniTabelu(){

    document.getElementById("datumPoslednjePromene").innerHTML=datumPP;

    if(baza=="USD" || drugaValuta=="USD"){
        document.getElementById("prviS").innerHTML="";
        document.getElementById("prviBr").innerHTML="";
    }else{
    document.getElementById("prviS").innerHTML="USD";
    document.getElementById("prviBr").innerHTML=valuteVrednosti.USD;
    }
    
    if(baza=="CHF" || drugaValuta=="CHF"){
        document.getElementById("drugiS").innerHTML="";
        document.getElementById("drugiBr").innerHTML="";
    }else{
    document.getElementById("drugiS").innerHTML="CHF";
    document.getElementById("drugiBr").innerHTML=vratiKursValute("CHF",valuteVrednosti);
    }
    
    document.getElementById("treciS").innerHTML=drugaValuta;
    document.getElementById("treciBr").innerHTML=vratiKursValute(drugaValuta,valuteVrednosti);

}

function posaljiZahtevZaVrednosti(){

    fetch(`/kurs${baza}`).then(odgovor=>{
        odgovor.json().then(podaci=>{
            if(podaci.error){
                
                alert("Greska prilikom dobijanja vrednosti kursa!");
    
            }else{
                bazaVrednost=podaci.baza;
                valuteVrednosti=podaci.vrednosti;
                datumPP=podaci.datum;
    
                popuniTabelu();
             
            }
        });
    
        
        
    });

}