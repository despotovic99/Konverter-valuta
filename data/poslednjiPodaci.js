const zahtev = require("request");
const linkovi = require('../config/config');

const poslednjiPodaci = (povratna)=>{

    const url = linkovi.default;

    zahtev({url,json:true} , (error ,{body})=>{
        if(error){
            povratna("Ne mogu da izvucem podatke",undefined);
        }else{
            povratna(undefined,{
                vrednosti: body.rates,
                baza: body.base,
                datum: body.date
            });
        }

    });

};

module.exports=poslednjiPodaci;
