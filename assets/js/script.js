window.onload = function(){
    var lokacija = window.location.pathname;
    console.log(lokacija)
    if(lokacija=="/sajtWP2/index.html" || lokacija=="/sajtWP2/favorites.html"){
        $(".sakrij").hide();
    $.ajax({
        url:"assets/data/meni.json",
        method:"GET",
        type:"json",
        success:function(meni){
            ispisMenija(meni)
            ispisMenijaFuter(meni)
            ispisHamburgerMenija(meni)
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

    function ispisMenija(meni){
        let ispis=`<ul id="meni">`;
        meni.forEach(m=>{
            ispis+=`<li><a href="${m.href}">${m.naziv}</a></li>`
        })
        ispis+=`</ul>`
        document.getElementById("menu").innerHTML = ispis;
    }
    function ispisHamburgerMenija(meni){
        let ispis=`<ul id="meni sakrij1">`;
        meni.forEach(m=>{
            ispis+=`<li><a href="${m.href}">${m.naziv}</a></li>`
        })
        ispis+=`</ul>`
        document.getElementById("menuSkriven").innerHTML = ispis;
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
    $(document).ready(function(){
        $(".sakrij").hide();
        $("#meniUl li").click(function(){
            $(this).find("ul").stop(true, true).slideToggle();
        })
        $("#meniUl1 li").click(function(){
            $(this).find("ul").stop(true, true).slideToggle();
        })
        $('.burgercic').click(function(){
            $('#meniSakriven').toggleClass('meniSakriven1')
            
    
        }) 
            
        })
        $('.idiGore').hide();
        $('.idiGore').on('click',function() {
        $('html').animate({scrollTop: 0}, 100);
        });
        $(window).scroll(function(){
            const scroll = $(this).scrollTop();
            if(scroll > 150) {
                $('.idiGore').fadeIn();
                } else $('.idiGore').fadeOut(0);
        })
    }

    if(lokacija=="/sajtWP2/favorites.html"){
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
        // function prikaziIzabrane(){
        //     var gradovi = JSON.parse(localStorage.getItem("gradovi"));
        //     $.ajax({
        //         url:"assets/data/gradovi.json",
        //         method:"GET",
        //         type:"json",
        //         success:function(data){
        //             data=data.filter(g=>{
        //                 for(let grad of gradovi){
        //                     if(g.id==grad.id){
        //                         return true;
        //                     }
        //                 }
        //             })
        //             tabela(data)
        //         },
        //         error:function(xhr, error, status){
        //             console.log(error)
        //         }
        //     })
        // }
        // function tabela(data){
        //     let i=0;
        //     let ispis=` <table id="table">
        //     <thead id="naziviKolona">
        //         <tr>
        //             <th>Number</th>
        //             <th>City</th>
        //             <th>Picture of City</th>
        //             <th class="populacija">Population</th>
        //             <th id="opis">Description</th>
        //             <th>Remove</th>
        //         </tr>
        //     </thead>
        //     <tbody>`
        //     console.log(data);
        //     while(i<data.length){
        //         ispis+= `<tr class="redVrednosti">
        //         <td>${data[i].id}</td>
        //         <td>${data[i].imeGrada}</td>
        //         <td><img src="${data[i].img}" alt="${data[i].imeGrada}" style='height:100px;width:100px;'</td>
        //         <td class="populacijaRed">${data[i].populacija}</td>
        //         <td class="opisTD">${data[i].opis}</td>
        //         <td>
        //         <div class=""><button onclick='skloni(${data[i].id})' class="dugmence">Remove</button> </div>
        //         </td>
        //         </tr>`
        //         console.log(ispis);
        //         i++;
        //     }
        //     ispis+=`</tbody></table>`;
        //     document.getElementById("tabela").innerHTML=ispis;
        // }
        // function omiljeniGradovi(){
        //     return JSON.parse(localStorage.getItem("gradovi"))
        // }
    }
    if(lokacija=="/sajtWP2/index.html"){
        document.getElementById("search").addEventListener("keyup", traziGrad);
        document.getElementById("izborSort").addEventListener("change", sortiraj);
        
        $(".sakrij").hide();
        $.ajax({
            url:"assets/data/gradovi.json",
            method:"GET",
            type:"json",
            success:function(gradovi){
                ispisGradova(gradovi)
                console.log(gradovi)
            },
            error:function(xhr, error, status){
                console.log(error)
            }
        })
        $.ajax({
            url:"assets/data/methodology.json",
            method:"GET",
            type:"json",
            success:function(methodology){
                ispisMetodologije(methodology)
                ispisMetodaUSelect(methodology)
            },
            error:function(xhr, error, status){
                console.log(error)
            }
        })

        var nizSlika=["assets/images/slajder0.jfif","assets/images/slajder1.jpg", "assets/images/slajder2.jpg","assets/images/slajder3.jpg","assets/images/slajder4.jpg"]
        function promenaSlika(){
            for (var i=0; i < nizSlika.length; i++) {
            (function(slika) {
             setTimeout(function(){
            
            document.getElementById('slajder').style.backgroundImage="url('" + nizSlika[slika] + "')"
            }, 3000*slika);
             })(i);
            }
        }
        promenaSlika()
        setInterval(function(){
        promenaSlika()
        },3000*nizSlika.length) 
    
        var forma=document.createElement("form");
        forma.setAttribute('action',"#");
        forma.setAttribute('method',"get");
    
        var imePolje = document.createElement("input");
        imePolje.setAttribute('type',"text");
        imePolje.setAttribute('id',"ime");
        imePolje.setAttribute('placeholder',"First Name(required field)");
        imePolje.setAttribute('class',"polje");
        var imeSpan = document.createElement("span");
        imeSpan.setAttribute('id',"greskaIme");
        imeSpan.setAttribute('class',"greska");
    
        var prezimePolje = document.createElement("input");
        prezimePolje.setAttribute('type',"text");
        prezimePolje.setAttribute('id',"prezime");
        prezimePolje.setAttribute('placeholder',"Last Name(required field)");
        prezimePolje.setAttribute('class',"polje");
        var prezimeSpan = document.createElement("span");
        prezimeSpan.setAttribute('id',"greskaPrezime");
        prezimeSpan.setAttribute('class',"greska");
    
        var email = document.createElement("input");
        email.setAttribute('type',"text");
        email.setAttribute('id',"email");
        email.setAttribute('placeholder',"Email(required field)");
        email.setAttribute('class',"polje");
        var emailSpan = document.createElement("span");
        emailSpan.setAttribute('id',"greskaEmail");
        emailSpan.setAttribute('class',"greska");
    
        // var sifra = document.createElement("input");
        // sifra.setAttribute('type',"text");
        // sifra.setAttribute('id',"sifra");
        // sifra.setAttribute('placeholder',"Password(required field)");
        // sifra.setAttribute('class',"polje");
        // var sifraSpan = document.createElement("span");
        // sifraSpan.setAttribute('id',"greskaSifra");
        // sifraSpan.setAttribute('class',"greska");
    
        var textArea=document.createElement("textarea");
        textArea.setAttribute('id', "textArea");
        textArea.setAttribute('placeholder', "Do you have any question?");
        textArea.setAttribute('class', "polje");
        var textAreaSpan= document.createElement("span");
        textAreaSpan.setAttribute('id',"textAreaGreska");
        textAreaSpan.setAttribute('class',"greska");
    
    
        var dugme = document.createElement("input");
        dugme.setAttribute('type',"button");
        dugme.setAttribute('id',"dugme");
        dugme.setAttribute('value',"Send");
    
    
        document.getElementById('forma').appendChild(forma);
        document.getElementById('forma').appendChild(imePolje);
        document.getElementById('forma').appendChild(imeSpan);
        document.getElementById('forma').appendChild(prezimePolje);
        document.getElementById('forma').appendChild(prezimeSpan);
        document.getElementById('forma').appendChild(email);
        document.getElementById('forma').appendChild(emailSpan);
        // document.getElementById('forma').appendChild(sifra);
        // document.getElementById('forma').appendChild(sifraSpan);
        document.getElementById('forma').appendChild(textArea);
        document.getElementById('forma').appendChild(textAreaSpan);
        document.getElementById('forma').appendChild(dugme);
        document.getElementById('dugme').addEventListener('click',proveraForme);
    
      
       
    
        function proveraForme(){
            var ime=document.getElementById("ime").value;
            var uslovIme= /^([A-ZŠĐČĆŽ][a-zšđčćž]{2,9}\s?)+$/;
            if(uslovIme.test(ime)){
                document.getElementById("greskaIme").innerHTML="";
                document.getElementById("ime").style.border= "2px solid#6B996A";
            }
            else if(ime.length==0){
                document.getElementById("greskaIme").innerHTML="You didn't enter your name!";
                document.getElementById("ime").style.border= "2px solid #E85D41";
            }
            else{
                document.getElementById("greskaIme").innerHTML="You didn't enter your name correctly!";
                document.getElementById("ime").style.border= "2px solid #E85D41";
            }
        
            var prezime=document.getElementById("prezime").value;
            var uslovPrezime= /^([A-ZŠĐČĆŽ][a-zšđčćž]{2,30}\s?)+$/;
            if(uslovPrezime.test(prezime)){
                document.getElementById("greskaPrezime").innerHTML="";
                document.getElementById("prezime").style.border= "2px solid#6B996A";
            }
            else if(prezime.length==0){
                document.getElementById("greskaPrezime").innerHTML="You didn't enter your last name!";
                document.getElementById("prezime").style.border= "2px solid #E85D41";
            }
            else{
                document.getElementById("greskaPrezime").innerHTML="You didn't enter your last name correctly!";
                document.getElementById("prezime").style.border= "2px solid #E85D41";
            }
        
            var email=document.getElementById("email").value;
            var uslovEmail= /^[a-z][a-z\-\d-\.\_]+\@[a-z]+(\.[a-z]{2,11}){1,2}$/;
            if(uslovEmail.test(email)){
                document.getElementById("greskaEmail").innerHTML="";
                document.getElementById("email").style.border= "2px solid#6B996A";
            }
            else if(email.length==0){
                document.getElementById("greskaEmail").innerHTML="You didn't enter your email!";
                document.getElementById("email").style.border= "2px solid #E85D41";
            }
            else{
                document.getElementById("greskaEmail").innerHTML="You didn't enter your email correctly!";
                document.getElementById("email").style.border= "2px solid #E85D41";
            }
            var textArea=document.getElementById("textArea").value;
            if(textArea=="" || textArea==" "){
                document.getElementById("textAreaGreska").innerHTML="You didn't enter anything!";
                document.getElementById("textArea").style.border= "2px solid #E85D41";
            }
            else{
                document.getElementById("textAreaGreska").innerHTML="";
                document.getElementById("textArea").style.border= "2px solid#6B996A";
            }
        }
        function ispisMetodologije(methodology){
            let ispis="<h1>Methodology</h1>";
            methodology.forEach(m=>{
                ispis+=`<div class="blok2">
                <div class="opis">
                    <span class="maliBlok2" style="background-color:${m.pozadinskaBoja} ;">${m.skracenica}</span><h2>${m.ime}</h2>
                </div>
               
                <div class="daljiOpis">
                    <p>${m.opis}</p>
                </div>
            </div>`
            
            })
            document.getElementById("methodology").innerHTML=ispis;
        }


        function ispisMetodaUSelect(methodology){
            let ispis="";
            methodology.forEach(m=>{
                ispis+=`
                     <li><input type="checkbox" name="${m.skracenica}" value="${m.ime}" id="${m.skracenica}" class="chb sakrij"/>${m.ime}</li>
                
                `
            })
            document.getElementById("pF").innerHTML=ispis;
            $(" #meniUl li input").change(filtrirajPoMetodologiji);
        
        }
        
        var nizIzabranihMetodologija=[];
        var izabranoFilter=[];
        
        function filtrirajPoMetodologiji(e){
            e.preventDefault();
            var nazivMetodologije= this.value;
            if(!nizIzabranihMetodologija.includes(nazivMetodologije)){
                nizIzabranihMetodologija.push(nazivMetodologije);
            }
            else{
                const nijeIzabrano= nizIzabranihMetodologija.filter(met=>{
                    return met!=nazivMetodologije;
                })
                nizIzabranihMetodologija=nijeIzabrano;
            }
            $.ajax({
                url:"assets/data/gradovi.json",
                method:"GET",
                type:"json",
                success:function(gradovi){
                    if(nizIzabranihMetodologija!=0){
                        const filtrirano=gradovi.filter(grad=>{
                            return grad.methodology.some(ime=>{
                                for(let m of nizIzabranihMetodologija){
                                    if(ime.naziv==m){
                                        return true;
                                    }
                                }
                            })
                        })
                        ispisGradova(filtrirano);
                        izabranoFilter.push(filtrirano);
                    }
                    else{
                        ispisGradova(gradovi);
                    }
        
                    
                },
                error:function(xhr, error, status){
                    console.log(error)
                }
            })
        }
        function ispisGradova(gradovi){
            let ispis="";
            gradovi.forEach(grad=>{
                // let regExp=/^\w{0,5}\.\w{1,10}mil$/
                // console.log(grad.populacija);
                // if(regExp.test(grad.populacija))
                // {
                //     console.log("vezivanje")
                //     grad.populacija.concat("ions");
                
                ispis+=`<div class="blok">
                <h1>${grad.id}. ${grad.imeGrada}</h1>
                <img src="${grad.img}" alt="${grad.imeGrada}"/>
                <h2>${grad.opis}</h2>
                <h3>Population:${grad.populacija}</h3>
                <h4>Highlighted rankings:</h4>
                <div class="methodology">
        
                   ${obradaMetodologije(grad.methodology)}
                <a href="#methodology" id="seeM">See Methodology</a>
                </div>
                
                <a href="#!" class="srce"> I love this city<i class="fas fa-heart srce2" data-id=${grad.id}></i></a><span class="izabran"></span>
                <p>${grad.daljiOpis}</p>
                
        </div>`
            })
            document.getElementById("sadrzaj").innerHTML=ispis;
            $(".srce2").on("click", dodajUOmiljene);
            // document.getElementById("srce").addEventListener("click", dodajUOmiljene);
        }
        
        function dodajUOmiljene(){
            
            let id= this.dataset.id;
            var gradovi= JSON.parse(localStorage.getItem("gradovi"));
            var svi = $(".izabran");
            if(gradovi){
                if(gradJeVecIzabran()){
                    
                    for(let i=1; i<=svi.length;i++){
                        if(i==id){
                            svi[i-1].innerHTML = "This city is already in your favorites!";
                        }
                    }
                }
                else {
                    console.log("Ubacili ste grad u listu favorita")
                    gradovi.push({
                        id:id
                    });
                    localStorage.setItem("gradovi", JSON.stringify(gradovi));
                    
                    for(let i=1; i<=svi.length;i++){
                        if(i==id){
                            svi[i-1].innerHTML = "City successfully added to your favorites!";
                        }
                    }
        
                    }
            }
            else{
                let gradovi=[];
                gradovi[0]={
                    id:id
                };
                localStorage.setItem("gradovi", JSON.stringify(gradovi));
            }
            function gradJeVecIzabran(){
                return gradovi.filter(g => g.id == id).length;
            }
        }
       
        function obradaMetodologije(metodologija){
            let ispis="";
            for(var m of metodologija){
                ispis+=`<div class="skracenica"> <span class="maliBlok" style="background-color:${m.bgColor}"${m.bgColor}">${m.skracenica}</span><p>${m.naziv}</p></div>`
            }
            return ispis
        }
        function traziGrad(){
            const izabrano = this.value;
            $.ajax({
                url:"assets/data/gradovi.json",
                method:"GET",
                type:"json",
                success:function(gradovi){
                    gradovi=gradovi.filter(function(grad){
                        if(grad.imeGrada.toLowerCase().indexOf(izabrano.toLowerCase())!==-1){
                            return true;
                        }
                        if(grad.opis.toLowerCase().indexOf(izabrano.toLowerCase())!==-1){
                            return true;
                        }
                        if(grad.daljiOpis.toLowerCase().indexOf(izabrano.toLowerCase())!==-1){
                            return true;
                        }
                       else{
                            document.getElementById("sadrzaj").innerHTML="<h2>Sorry we don't have anything that you search.</h1>"
                        }
        
                    })
                    ispisGradova(gradovi);
                },
                error:function(xhr, error, status){
                    console.log(status);
                }
            })
        }
        function sortiraj(){
            const izabrano = this.value;
            $.ajax({
                url:"assets/data/gradovi.json",
                method:"GET",
                type:"json",
                success:function(gradovi){
                    if(izabranoFilter.length>0){
                        izabranoFilter.forEach(f=>{
                            if(izabrano==1){
                                f.sort(function(a,b){
                                    if(a.prioritet==b.prioritet){
                                        return 0;
                                    }
                                    else if(a.prioritet>b.prioritet){
                                        return 1;
                                    }
                                    else{
                                        return -1;
                                    }
                                })
                                ispisGradova(f);
                        
                    }
                  else  if(izabrano==2){
                        f.sort(function(a,b){
                            if(a.imeGrada==b.imeGrada){
                                return 0;
                            }
                            else if(a.imeGrada>b.imeGrada){
                                return 1;
                            }
                            else{
                                return -1;
                            }
                        })
                        ispisGradova(f);
                    }
                   else if(izabrano==3){
                        f.sort(function(a,b){
                            if(a.imeGrada==b.imeGrada){
                                return 0;
                            }
                            else if(a.imeGrada>b.imeGrada){
                                return -1;
                            }
                            else{
                                return 1;
                            }
                        })
                        ispisGradova(f);
                    }
                    if(izabrano==4){
                        f.sort(function(a,b){
                            if(a.cena==b.cena){
                                return 0;
                            }
                            else if(a.cena>b.cena){
                                return 1;
                            }
                            else{
                                return -1;
                            }
                        })
                        ispisGradova(f);
                    }
                    else if(izabrano==5){
                        f.sort(function(a,b){
                            if(a.cena==b.cena){
                                return 0;
                            }
                            else if(a.cena>b.cena){
                                return -1;
                            }
                            else{
                                return 1;
                            }
                        })
                        ispisGradova(f);
                    }
                    
                    else{
                        ispisGradova(f);
                    }
        
                }
                        )}
                
                else{
                            if(izabrano==1){
                                gradovi.sort(function(a,b){
                                    if(a.prioritet==b.prioritet){
                                        return 0;
                                    }
                                    else if(a.prioritet>b.prioritet){
                                        return 1;
                                    }
                                    else{
                                        return -1;
                                    }
                                })
                                ispisGradova(gradovi);
                        
                    }
                  else  if(izabrano==2){
                    gradovi.sort(function(a,b){
                            if(a.imeGrada==b.imeGrada){
                                return 0;
                            }
                            else if(a.imeGrada>b.imeGrada){
                                return 1;
                            }
                            else{
                                return -1;
                            }
                        })
                        ispisGradova(gradovi);
                    }
                   else if(izabrano==3){
                    gradovi.sort(function(a,b){
                            if(a.imeGrada==b.imeGrada){
                                return 0;
                            }
                            else if(a.imeGrada>b.imeGrada){
                                return -1;
                            }
                            else{
                                return 1;
                            }
                        })
                        ispisGradova(gradovi);
                    }
                    if(izabrano==4){
                        gradovi.sort(function(a,b){
                            if(a.cena==b.cena){
                                return 0;
                            }
                            else if(a.cena>b.cena){
                                return 1;
                            }
                            else{
                                return -1;
                            }
                        })
                        ispisGradova(gradovi);
                    }
                    else if(izabrano==5){
                        gradovi.sort(function(a,b){
                            if(a.cena==b.cena){
                                return 0;
                            }
                            else if(a.cena>b.cena){
                                return -1;
                            }
                            else{
                                return 1;
                            }
                        })
                        ispisGradova(gradovi);
                    }
                   else if(izabrano==0){
                        dohvatiGradove();
                    }
                 }
                    
            },      
                error:function(xhr, error, status){
                    console.log(error);
                }
            })
        }
        
        function dohvatiGradove(){
            $.ajax({
                url:"assets/data/gradovi.json",
                method:"GET",
                type:"json",
                success:function(gradovi){
                    ispisGradova(gradovi);
                },
                error:function(xhr, error, status){
                    console.log(error);
                }
            })
        }
    }
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
                }
            })
            tabela(data)
        },
        error:function(xhr, error, status){
            console.log(error)
        }
    })
}
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
function ocistiLS(){
    localStorage.removeItem("gradovi");
}
function omiljeniGradovi(){
    return JSON.parse(localStorage.getItem("gradovi"))
}