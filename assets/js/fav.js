window.onload=function(){
    $("#tekst").hide();
    let gradovi = JSON.parse(localStorage.getItem("gradovi"));
    console.log(gradovi)
    if(!gradovi || gradovi.length == 0){
        $("#tabela").hide();
        $("#tekst").show();
    }
    else {
        prikaziIzabrane();
    }
    $.ajax({
        url:"assets/data/meni.json",
        method:"GET",
        type:"json",
        success:function(meni){
            ispisMenija(meni)
            ispisMenijaFuter(meni)
            ispisSkrivenogMenija(meni)
        },
        error:function(xhr, error, status){
            console.log(error)
        }
    })
    $.ajax({
        url:"assets/data/futerIkone.json",
        method:"GET",
        type:"json",
        success:function(ikone){
            ispisFuterIkona(ikone)
            console.log(ikone)
        },
        error:function(xhr, error, status){
            console.log(error)
        }
    })
}
 function ispisSkrivenogMenija(meni){
     let ispis=`<ul id="meni sakrij1">`;
    meni.forEach(m=>{
        ispis+=`<li><a href="${m.href}">${m.naziv}</a></li>`
    })
    ispis+=`</ul>`
    document.getElementById("menuSkriven").innerHTML = ispis;
}
function ispisMenija(meni){
    let ispis=`<ul id="meni">`;
    meni.forEach(m=>{
        ispis+=`<li><a href="${m.href}">${m.naziv}</a></li>`
    })
    ispis+=`</ul>`
    document.getElementById("menu").innerHTML = ispis;
}
function ispisMenijaFuter(meni){
    let ispis=`<ul id="meniFuterUl">`;
    meni.forEach(m=>{
        ispis+=`<li><a href="${m.href}">${m.naziv}</a></li>`
    })
    ispis+=`</ul>`
    document.getElementById("meniFuter").innerHTML = ispis;
}
function ispisFuterIkona(ikone){
    let ispis="";
    ikone.forEach(i=>{
        ispis+=` <a href='${i.href}' target="blank"><i class="${i.iClass}"></i>${i.ime}</a>`
    })
    document.getElementById("drustveneMreze").innerHTML=ispis;
}
function prikaziIzabrane(){
    var gradovi = JSON.parse(localStorage.getItem("gradovi"));
    $.ajax({
        url:"assets/data/gradovi.json",
        method:"GET",
        type:"json",
        success:function(data){
            data=data.filter(g=>{
                for(let grad of gradovi){
                    if(g.id==grad.id){
                        return true;
                    }
                    //return false;
                }
            })
            tabela(data)
        },
        error:function(xhr, error, status){
            console.log(error)
        }
    })
}
function tabela(data){
    let i=0;
    let ispis=` <table id="table">
    <thead id="naziviKolona">
        <tr>
            <th>Number</th>
            <th>City</th>
            <th>Picture of City</th>
            <th class="populacija">Population</th>
            <th id="opis">Description</th>
            <th>Remove</th>
        </tr>
    </thead>
    <tbody>`
    console.log(data);
    while(i<data.length){
        ispis+= `<tr class="redVrednosti">
        <td>${data[i].id}</td>
        <td>${data[i].imeGrada}</td>
        <td><img src="${data[i].img}" alt="${data[i].imeGrada}" style='height:100px;width:100px;'</td>
        <td class="populacijaRed">${data[i].populacija}</td>
        <td class="opisTD">${data[i].opis}</td>
        <td>
        <div class=""><button onclick='skloni(${data[i].id})' class="dugmence">Remove</button> </div>
        </td>
        </tr>`
        console.log(ispis);
        i++;
    }
    ispis+=`</tbody></table>`;
    document.getElementById("tabela").innerHTML=ispis;
}
// function omiljeniGradovi(){
//     return JSON.parse(localStorage.getItem("gradovi"))
// }
function skloni(id){
    let gradovi = JSON.parse(localStorage.getItem("gradovi"));
    let obrisano=gradovi.filter(g=>g.id!=id);
    localStorage.setItem("gradovi", JSON.stringify(obrisano));
    if(obrisano.length == 0){
        $("#tabela").hide();
        $("#tekst").show();
    }
    prikaziIzabrane();
    
}
$(document).ready(function(){

    $("#meniUl li").hover(function(){
        $(this).find("ul").stop(true, true).slideToggle();
    })
    $("#meniUl1 li").hover(function(){
        $(this).find("ul").stop(true, true).slideToggle();
    })
    $('.burgercic').click(function(){
        $('#meniSakriven').toggleClass('meniSakriven1')
        

    }) 
        
    })   