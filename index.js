const express = require("express");
const app = express();

const putanja = require('path');

const poslednjiPodaci= require("./data/poslednjiPodaci");
const bazaPodaci=require('./data/bazaPodaci')

const PORT = process.env.PORT || 3000;


app.use(express.static("public"));



app.get("/",(zahtev,odgovor)=>{

    odgovor.render('index');

});

app.get("/konvertor",(zahtev,odgovor)=>{

    odgovor.sendFile(putanja.join(__dirname+"/public/konvertor.html"));

});

app.get("/kurs",(zahtev,odgovor)=>{


    poslednjiPodaci((greska,{vrednosti,baza,datum}={})=>{

        if(greska){
            return odgovor.send("Greska");
        }

        console.log(vrednosti,baza,datum);

        odgovor.send({
            vrednosti,
            baza,
            datum
        });
        
    });

});

app.get("/kurs:baza",(zahtev,odgovor)=>{

    const parametar = zahtev.params;
    console.log(parametar.baza);

      bazaPodaci(parametar.baza,(greska,{vrednosti,baza,datum}={})=>{

        if(greska){
            return odgovor.send("Greska");
        }

        console.log(vrednosti,baza,datum);

        odgovor.send({
            vrednosti,
            baza,
            datum
        });
        
    });

});

app.get("*",(zahtev,odgovor)=>{

    odgovor.sendFile(putanja.join(__dirname+"/public/greska.html"));

});


app.listen(PORT,()=>{
    console.log(`Server je podignut i osluskuje na portu ${PORT}`);
});
