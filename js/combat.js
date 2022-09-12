/* ARXIU ESPECIFIC PER LA PAGINA COMBAT.HTML */

/* ************************************************ */
/* Definim funcions especifiques per aquesta pagina */
/* ************************************************ */
function combat_cardVoltejar(idvalue){
    /* Funcio que canvia la visibilitat de la tapa de la carta amb id indicat */
    /* Comprovem si te la clase "activada"
            SI! -> la treiem
            NO! -> la posem
       API CLASSLIST: https://lenguajejs.com/javascript/dom/manipular-clases-css/#:~:text=La%20API%20classList%20de%20Javascript%201%20La%20propiedad,...%204%20Otros%20m%C3%A9todos%20de%20clases%20CSS.%20 
    */

    /* Seleccionem totes les cards */
    console.log("Function: combat cardVoltejar ",idvalue)
    let cartes = document.querySelectorAll("section.combat_llistat article.pokeCard")
    let cartesTope = cartes.length
    console.log("Cartes triades: ", cartes)

    // NOTA canvio el foreach per un for pq el foreach NO TE BREAK i no volem que CADA cop es repasi TOTA la llista
    for(let contador=0; contador<cartesTope;contador++){
        // Busquem la que te el id que volem activar 
        // console.log(`La card amb id [${}] te les clases [${}]`)
        console.log("La carta estudiada ara es: ",cartes[contador])
        let valorIDdemanat = parseInt(idvalue)
        let valorIDcarta = parseInt(cartes[contador].getAttribute("id"))

        console.log(`ID buscat [${valorIDdemanat}], id trobat [${valorIDcarta}]`)
        console.log(`1 Carta: [${valorIDcarta}] amb classes [${cartes[contador].classList.value}]`)

        if(valorIDcarta == valorIDdemanat){
            
            // Si la card te el id que nosaltre volem ....
            // Comprovem si te la clase "activada"
            if(cartes[contador].classList.contains("activada")){
                // SI la calse ESTA present, la treiem
                cartes[contador].classList.remove("activada")
            }else{
                // Si la clase NO ESTA present, la afegim
                cartes[contador].classList.add("activada")
            }
            console.log(`2a Carta: [${valorIDcarta}] amb classes [${cartes[contador].classList.value}]`);
            console.log("i sortim del bucle")
            break
        }else{
            // Si la card NO te el id que nosaltres volem ....
            // no cal fer res
        }
        console.log(`2b Carta: [${valorIDcarta}] amb classes [${cartes[contador].classList.value}]`);
    };
    /* Esborrem area de resultats */
    document.querySelector("section.combat_resultat").innerHTML=""
}

function combat_combat(id_defensor,arrayPokemons){
    /* Funcio qeu presenta el resultat del combat entre les cartes selecionades */
    /* 
        Busquem quines cartes estan seleccionades
        Recuperem els valors de les selecionades i asignem defensor i atacant
        Calculem el resultat del combat
        Mostrem el resultat 
    */

    /* Avidem de quina funcio esta corrent ara .... */
    console.log(" FUNCIO: combat combat ", id_defensor)

    /* Definim variables lcoals */
    let cartes_visibles =""
    let cartes_combat=[]

    /* Busquem quines cartes estan seleccionades */
    cartes_visibles = document.querySelectorAll("section.combat_llistat .pokeCard.activada")
    console.log("tenim [" + cartes_visibles.length + "] cartes visibles")

    /* Definim qui ataca i qui defen */
    // Val, el id del defensor es el ultim voltejat, i ens ve donat com a parametre.....
    // El poke atacant sera el id DIFERENT al del defensor que tinguem a "cartes_visibles"
    // NOTA: ES SUPOSA QUE SOLS TENIM UN MAXIM DE 2 CARTES VOLTEJADES, PODEM TAMBE FER UNA COMPROVACIO AMB LENGHT
    if(cartes_visibles[0].id == id_defensor){
        // SI la primera carta voltejada es la del defesor ....
        defensor_ID = parseInt(cartes_visibles[0].id)
        atacant_ID  = parseInt(cartes_visibles[1].id)
    }else{
        // SI no, lalvors es la del atacant .....
        atacant_ID = parseInt(cartes_visibles[0].id)
        defensor_ID = parseInt(cartes_visibles[1].id)
    }

    /* Recuperem els valors */
    // Els podem recuperar del array de pokemons o be del codi html ....
    // CAS 1: Recuperant del array de pokemons rebut com a parametre
    console.log("Array de pokemons:",arrayPokemons)
    console.log("Pokes buscats (DEF, ATK): ",defensor_ID,atacant_ID)
    // POKE ATACANT
    console.log("Buscant dades poke atacant ...")
    for(let p=0; p<arrayPokemons.length; p++){
        if(parseInt(arrayPokemons[p].id) == atacant_ID){
            // Tenim el ATACANT .....
            console.log("Em trobat el pokemon atacant",arrayPokemons[p])
            pokeATK_id =arrayPokemons[p].id
            pokeATK_nom=arrayPokemons[p].name
            pokeATK_power =parseInt(arrayPokemons[p].stats[1].base_stat)
        }
    }
    // POKE DEFENSOR
    console.log("Buscant dades poke defensor ...")
    for(let p=0; p<arrayPokemons.length; p++){
        if(arrayPokemons[p].id == defensor_ID){
            // Tenim el ATACANT .....
            console.log("Em trobat el pokemon defensor",arrayPokemons[p])
            pokeDEF_id =arrayPokemons[p].id
            pokeDEF_nom=arrayPokemons[p].name
            pokeDEF_power =parseInt(arrayPokemons[p].stats[2].base_stat)
        }
    }

    /* Calculem el resultat del combat */
    if(pokeATK_power == pokeDEF_power){
        // EMPAT !!!!!
        resultatCombat = `[${pokeATK_id}]-[${pokeATK_nom}] ATACA i *EMPATA* AMB [${pokeDEF_id}]-[${pokeDEF_nom}]`

    }else{
        // Si NO es igual mirem quin guanya
        if(pokeATK_power > pokeDEF_power){
            // Guanya el ATACANT
            resultatCombat = `[${pokeATK_id}]-[${pokeATK_nom}] ATACA i *GUANYA* A [${pokeDEF_id}]-[${pokeDEF_nom}]`
        }else{
            // Guanya el DEFENSOR
            resultatCombat = `[${pokeATK_id}]-[${pokeATK_nom}] ATACA i *PERD* AMB [${pokeDEF_id}]-[${pokeDEF_nom}]`
        }
    }
    console.log(`ATK:${pokeATK_id} [${pokeATK_power}] i DEF:${pokeDEF_id} [${pokeDEF_power}]`)

    /* Ho posem una mica mes mono */
    resultatCombat="<span id='resultatCombat'>" + resultatCombat + "</span>"
    /* Pintem el resultat en codi HTML .... */
    /* Mostrem el resultat */
    console.log("El resultat del combat es: ",resultatCombat)
    document.querySelector("section.combat_resultat").style.display = "block"
    document.querySelector("section.combat_resultat").innerHTML=resultatCombat
}

async function combat_initialize(){
    /* Funcio que inicialitza la pagina combat.html */

    /* 
    PASSOS A REALITZAR:
    
        Definir varaibles locals
        Demanar valor maxim de pokemons existents a la API
        Crear array de 10 valors aleatoris entre 1 i el maxim anterior
        Demanar info dels 10 IDS a la api
        Construir les cartes a presentar, afegir cara superior i inferior
        Afegir events a les cartes
        Mostrar section amb les cartes tapades
    */

    /* Definim algunes variables que podem necessitar */
    const urlAPI         = "https://pokeapi.co/api/v2/"
    const pokemonspecies = "pokemon-species/"
    const pokemondata    = "pokemon/"

    // Indicarem en quina funcio anem funcionant ...
    console.log("Funcio actual: combat Initializer")

    /* Demanem el numero maxim de Pokemons a la API */
    let pokedata = await fetch(urlAPI + pokemonspecies + "?limit=0") // com retorna una promesa, esperem a rebre el resultat
        pokedata = await pokedata.json()                             // Convertim el resultat a json tambe en forma de promesa
    let maxpokes = pokedata.count                                    // Recuperem el count total 
    console.log(`El nombre de pokemons disponibles es: ${maxpokes}`)

    /* 
    Crearem un array de 10 valors aleatoris SENSE repetir, per aixo farem un bucle que faci
        generar valor
        comprovar valor
            afegir valor
    */
    let arrayRND=[]
    let nouvalor=0
    let minim = 1
    for(let x=0; x<10; x++){
        // NOTA Afegim +1 al maxim pq si no, el maxim no es genera mai(el floor redondeja cap aball), el minim =1
        nouvalor = Math.floor((Math.random() * (maxpokes+1-minim)) +minim);
        // TO-DO ==>> Queda per verificar que els valors no estarien repetits 
        arrayRND.push(nouvalor)  
    }
    // Ensenyem el array que em generat
    console.log("Array random generat: " + arrayRND)

    /* Preparem i recuperem les dades de les peticions asincrones amb les id aleatories creades */
    let array_pokemons=[]
    let array_peticions=[]
    let peticio=""
    for(let x=0; x<10;x++){
        // Recuperem les dades de cada pokemon a traves de la seva ID
        peticio = fetch(urlAPI + pokemondata + arrayRND[x]).then((res)=>res.json())
        // i l afegim al array ....
        array_peticions.push(peticio)
    }
    // Fem totes les peticions de cop i en paralel
    console.log("Preparant peticio de promeses ....")
    console.log(array_peticions)
    array_pokemons = await Promise.all(array_peticions)
    console.log("Promesa conjunta retornada!")
    // Mostrem el array de Pokemons a la consola
    console.log("Dades dels pokemons obtinguts:", array_pokemons)

    /* Prepararem ara el codi HTML de les cartes a presentar..... */
    /* Cosetes:
            De moment fem les carte "a pelo" i despres ja veurem com fem lo de "donar-li la volta"

       Estructura de la card:
            <article class="card">
                <div class="card_tapa">
                    <img src="" alt="">
                </div>
                <div class="card_imatge">
                    <img src="" alt=""><img src="" alt="">
                </div>
                <div class="card_dades">
                    <span class="card_id">  ID  </span></br>
                    <span class="card_nom"> NOM </span></br>
                    <span class="card_atk"> ATK </span></br>
                    <span class="card_def"> DEF </span>
                </div>
            </article>
    */
    let array_cards = []
    for(let y=0; y<10; y++){
        // Obtenim els valors que em de insertar al codi HTML
        let poke_URLimgTapa   = "media/imatges/cartes/pokemon_card_backside2.png"
        let poke_URLimgFront1 = array_pokemons[y].sprites.front_default
        if((poke_URLimgFront1 === null)&&(typeof(poke_URLimgFront1)=="object")){poke_URLimgFront1="media/imatges/fails/imatgeNoDisponible_rodona.png"}
        let poke_URLimgFront2 = array_pokemons[y].sprites.back_default
        if((poke_URLimgFront2 === null)&&(typeof(poke_URLimgFront2)=="object")){poke_URLimgFront2="media/imatges/fails/imatgeNoDisponible_rodona.png"}
        let poke_id           = array_pokemons[y].id
        let poke_nom          = array_pokemons[y].name
        let poke_atk          = array_pokemons[y].stats[1].base_stat
        let poke_def          = array_pokemons[y].stats[2].base_stat
        // Crearem el codi HTML
        // NOTA: Ho fem amb un array dinamic pq per anar fent poves treient i canviant linies el array dinamic
        //       i el push() ens permet de anar mes rapid que no fent un sumatori de linies
        // NOTA: el HTML te dos parts, la tapa i les dades que es superposen swegons la card tingui o no
        //       una clase determinada: "activada"
        /*
        let arrayLiniesHTML = []
        let linia = ""
        linia = `<div class="cardContainer">`                                       ; arrayLiniesHTML.push(linia);
        linia = `<article class='card' id='${poke_id}'>`                            ; arrayLiniesHTML.push(linia);
        linia = `   <div class='card_tapa'>`                                        ; arrayLiniesHTML.push(linia);
        linia = `       <img src='${poke_URLimgTapa}' alt=''>`                      ; arrayLiniesHTML.push(linia);
        linia = `   </div>`                                                         ; arrayLiniesHTML.push(linia);
        linia = `   <div class='card_dades'>`                                       ; arrayLiniesHTML.push(linia);
        linia = `       <div class='card_dades_imatge'>`                            ; arrayLiniesHTML.push(linia);
        linia = `           <img src='${poke_URLimgFront1}' alt=''>
                            <img src='${poke_URLimgFront2}' alt=''>`                ; arrayLiniesHTML.push(linia);
        linia = `       </div>`                                                     ; arrayLiniesHTML.push(linia);
        linia = `       <div class='card_dades_dades'>`                             ; arrayLiniesHTML.push(linia);
        linia = `           ID  <span class='card_id' >[  ${poke_id} ]</span></br>` ; arrayLiniesHTML.push(linia);
        linia = `           NOM <span class='card_nom'>[ ${poke_nom} ]</span></br>` ; arrayLiniesHTML.push(linia);
        linia = `           ATK <span class='card_atk'>[ ${poke_atk} ]</span></br>` ; arrayLiniesHTML.push(linia);
        linia = `           DEF <span class='card_def'>[ ${poke_def} ]</span>`      ; arrayLiniesHTML.push(linia);
        linia = `       </div>`                                                     ; arrayLiniesHTML.push(linia);
        linia = `   </div>`                                                         ; arrayLiniesHTML.push(linia);
        linia = `</article>`                                                        ; arrayLiniesHTML.push(linia);
        linia = `</div>`                                                            ; arrayLiniesHTML.push(linia);
        // Afegim la card al array de cards ....
        // console.log("card nº [" + y + "]")
        // console.log(arrayLiniesHTML)
        array_cards.push(arrayLiniesHTML)
        */

        /* ****************** MODIFICACIO 20220906 NOU CODI PER LES CARDS ******************************* */
        let arrayLiniesHTML = []
        let linia = ""

        linia  = `<div class="pokeContainer">`                          ; arrayLiniesHTML.push(linia);
        linia  = `<article class="pokeCard" id=${poke_id}>`             ; arrayLiniesHTML.push(linia);
        linia  = '  <div class="poke_tapa">'                            ; arrayLiniesHTML.push(linia);
        linia  = `      <img src='${poke_URLimgTapa}' alt=''>`          ; arrayLiniesHTML.push(linia);
        linia  = '  </div>'                                             ; arrayLiniesHTML.push(linia);
        linia  = '  <div class="poke_contingut">'                       ; arrayLiniesHTML.push(linia);
        linia  = `    <div class="pokeImg">`                            ; arrayLiniesHTML.push(linia);
        linia  = `      <div class="pID">`                              ; arrayLiniesHTML.push(linia);
        linia  = `        <span class="pokeId0">ID</span>`              ; arrayLiniesHTML.push(linia);
        linia  = `        <span class="pokeId1">${poke_id} </span>`     ; arrayLiniesHTML.push(linia);
        linia  = `      </div>`                                         ; arrayLiniesHTML.push(linia);
        linia  = `      <div class="pImg">`                             ; arrayLiniesHTML.push(linia);

        /*
        linia = `           <img src='${poke_URLimgFront1}' alt=''>
                            <img src='${poke_URLimgFront2}' alt=''>`    ; arrayLiniesHTML.push(linia);
        */

        linia = `           <img src='${poke_URLimgFront1}' alt=''>`    ; arrayLiniesHTML.push(linia);

        linia  = `      </div>`                                         ; arrayLiniesHTML.push(linia);
        linia  = `      <div class="pName">`                            ; arrayLiniesHTML.push(linia);
        linia  = `        <span class="pokeName0">NOM:</span>`          ; arrayLiniesHTML.push(linia);
        linia  = `        <span class="pokeName1">${poke_nom}</span>`   ; arrayLiniesHTML.push(linia);
        linia  = `      </div>`                                         ; arrayLiniesHTML.push(linia);
        linia  = `    </div>`                                           ; arrayLiniesHTML.push(linia);
        linia  = `  <div class="pokeData">`                             ; arrayLiniesHTML.push(linia);
        linia  = `    <div class="pAtk">`                               ; arrayLiniesHTML.push(linia);
        linia  = `        <span class="pokeAtk0">Atac</span><br>`       ; arrayLiniesHTML.push(linia);
        linia  = `        <span class="pokeAtk1">[${poke_atk}]</span>`  ; arrayLiniesHTML.push(linia);
        linia  = `    </div>`                                           ; arrayLiniesHTML.push(linia);
        /*
        linia  = `    <!--`
        linia  = `    <div class="pCuadrat"></div>`
        linia  = `    -->`
        */
        linia  = `    <div class="pDef">`                               ; arrayLiniesHTML.push(linia);
        linia  = `        <span class="pokeDef0">Defensa</span><br>`    ; arrayLiniesHTML.push(linia);
        linia  = `        <span class="pokeDef1">[${poke_def}]</span>`  ; arrayLiniesHTML.push(linia);
        linia  = `    </div>`                                           ; arrayLiniesHTML.push(linia);
        linia  = `  </div>`                                             ; arrayLiniesHTML.push(linia);
        /*                
        linia  = `  <!-- Anulem aixo pq el COMBAT no porta boto de DETALL / tambe val posar display:none al CSS / o simplent no afegir-lo al array`
        linia  = `  <div class="pokeBtn">`
        linia  = `    <div class="pBtn">`
        linia  = `        <span class="pokeBtn0"><a href="llistat.html?pokeID=${poke_id}">MES DADES</a></span>`
        linia  = `    </div>`
        linia  = '  </div>'
        linia  = '  -->'
        */
        linia  = `</article>`                                           ; arrayLiniesHTML.push(linia);
        linia  = '</div>'                                               ; arrayLiniesHTML.push(linia);

        array_cards.push(arrayLiniesHTML)
        /* ********************************************************************************************** */
    }

    // ja podem pintar el codi al html ....
    let ancla = document.querySelector(".combat_llistat")
    let codiHTML = ""
    let cardHTML = ""
    // Extreiem el codi html de cada targeta i el posem correctament en una variable de text
    array_cards.forEach(card => {
        cardHTML = ""
        let linies = card.length
        for (let h=0; h<linies; h++){
            cardHTML = cardHTML + card[h]
        }
        codiHTML = codiHTML + cardHTML
    });
    // I pasem el codi HTML al section on el volem ensenyar ....
    ancla.innerHTML = codiHTML

    /* Afegir events a les cartes */
    let ancla1 = document.querySelectorAll("section.combat_llistat article.pokeCard")
    ancla1.forEach(carta => {
        carta.addEventListener("click", function(e){
            // Al fer click a sobre de una determinada carta:
            //  Recuperem el id de la carta 
            //  NOTA: this fa referencia al objecte carta(un article) sobre el qeu em fet click
            //  NOTA: this.id fa referencia al id del article -> <article id="pepe">
            let pokeID = this.id
            console.log(pokeID)
            //  Voltegem la carta canviant si te o no la clase "activada"
            console.log("voltejant carta: ", pokeID)
            combat_cardVoltejar(pokeID);
            //  Mirem si ja en tenim mes de 1 voltejada
            let cartes_visibles = document.querySelectorAll("section.combat_llistat article.activada")
            console.log("ara tenim activades: ",cartes_visibles.length)
            if(cartes_visibles.length>2){
                // Si ja tenim 2 cartes voltejades, reset!!!!
                // Eliminem clase "activada"
                cartes_visibles.forEach(carta => {
                    carta.classList.remove("activada")
                });
                console.log("Eliminant clase 'activada' dels articles")
                console.log("Cartes actives actualment: ",document.querySelectorAll("section.combat_llistat article.activada").length)
            }else{
                if(cartes_visibles.length==2){
                    //  SI! -> anem a COMBAT, indicant qeu la actual es la que defensa
                    combat_combat(pokeID,array_pokemons)
                } else {
                    //  NO! -> doncs no fem res mes...
                    
                }
            }
        })
    });

    /* Apaguem el loading .... */
    console.log("Apagant LOADING...")
    document.querySelector("section.loading").style.display="none";

    /* Mostrar SOLS section amb les cartes tapades */
    console.log("Encenent LLISTAT...")
    document.querySelector("section.combat_llistat").style.display="flex";
    console.log("Apagant RESULTAT...")
    document.querySelector("section.combat_resultat").style.display="none"
}




/* ************************************************ */
/*     Carreguem les funcions al event DOMLoaded    */
/* ************************************************ */
document.addEventListener("DOMContentLoaded",()=>{
    console.log("Inicialitzant codi JS de la pagina");
    // Activant gestio del tema ....
    themeSelector_initializerV2()
    // Activant gestio de llistats ....
    combat_initialize();
})