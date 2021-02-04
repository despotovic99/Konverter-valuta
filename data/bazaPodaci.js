const zahtev = require("request");
const linkovi = require('../config/config');

const bazaPodaci=(baza,povratna)=>{
    const url = linkovi.linkBazaPodaci+baza;

    zahtev({url,json:true} , (error ,{body})=>{
        if(error){
            povratna("Ne mogu da dobijem podatke",undefined);
        }else{
            povratna(undefined,{
                vrednosti: body.rates,
                baza: body.base,
                datum: body.date
            });
        }

    });
}

module.exports=bazaPodaci;