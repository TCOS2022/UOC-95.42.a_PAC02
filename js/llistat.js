/* ARXIU ESPECIFIC PER LA PAGINA LLISTAT.HTML */

/* Definim funcions especifiques per aquesta pagina */
function llistat_randomizer(max,min){
    /* Funcio qeu en genera un nº enter aleatori entre dos limits inclosos. */

    /* NOTA: .floor determina el numero enter proxim mes baix al valor presentat.
    /* NOTA: Com la funcio definida a sota no te en compte el limit superior, li afegim +1 pq si qeu quedi inclos. */
    max = max+1
    let resultat = Math.floor((Math.random() * (max+1-min)) +min);
    /* i finalment retornem el valor demanat */
    return resultat
}

function llistat_valorEnArray(valor,array){
    /* Funcio qeu reb un array i un valor, i comprova si el valor esta ja al array */

    /* Obtenim la longitud del array */
    const nvalors=array.length
    let resultat=false
    /* Recorrem tot el array */
    for (let x=0; x<nvalors; x++){
        if(valor == array[x]){
            /* Si el valor ja esta al array, acabem amb un FALSE */
            /* NOTA: De fet, seria mes optim 'return true' i acabar el bucle */
            resultat = true
        }else{
            /* Si el valor NO esta al array ... seguim */
            resultat = false
        }
    }
    /* retornem el resultat */
    return resultat
}

/* FUNCIONS PER LA SECTION BUSCADOR */
async function llistat_buscadorInitializer(){
    /* funcio que prepara to el qeu li cal al buscador */

    /* Afegim els events al input */
    /* 
    1 pulsacio = keydown + keyup
    El evento onKeyDown sucede cuando el usuario pulsa una tecla. 
    El evento onKeyUp tiene lugar cuando el usuario deja de pulsar una tecla. 
    El evento onKeyPress se genera cuando se mantiene pulsada una tecla (= keydown + keydown + ...). 
    */

     /* Event KEYDOWN -> al premer la tecla registrem el caracter nou */
    document.getElementById("llistat_buscadorInput").addEventListener('keydown', function(e){
        let novacadena = document.getElementById("llistat_buscadorInput").value ;
    })
    /* Event KEYUP   -> al deixar anar, fem la busqueda */
    document.getElementById("llistat_buscadorInput").addEventListener("keyup",function(e){

        // Indicarem en quina funcio anem funcionant ...
        console.log("Funcio actual: llistat buscador Initializer --> KEYUP")

        // Recuperem la cadena del input
        let cadena1 = document.getElementById("llistat_buscadorInput").value;
        // cadena1 = String(cadena1)

        // Recuperem el array amb els noms dels pokemons -> array_nomsPokemons
        // let array_nomsPokemons=["a","aa","aaa","b","ab","c","abc"]
        let array_nomsPokemons=[]
        // NOTA: Em de recuperar de alguna banda els noms dels pokemons actualment llistats, ho podem
        //       fer del codi HTML, per exemple ....
        //          class="pokeName1"
        let apuntadors = document.querySelectorAll("span.pokeName1")

        apuntadors.forEach(poke_spanNom => {
            // Recuperem el valor del span
            let nompoke = poke_spanNom.innerHTML
            // Eliminem els espais en blanc devant i darrera
            nompoke = nompoke.trim()
            // El guardem al array
            array_nomsPokemons.push(nompoke)
        });

        // comprovem si la cadena entrada es part de alguna entrada del array i crearem un array nou
        let array_nomspokemonsVisibles=[]
        array_nomsPokemons.forEach(nomPokemon => {
            // Mirem si el nom del pokemon comença igual que la cadena buscada i l afegim al nou llistat si ho es.
            let llargNom = nomPokemon.length;
            let llargFiltre = cadena1.length;
            let nomValidat = false
            // console.log("llarg nom:" + llargNom + " llarg filtre: " + llargFiltre)
            // Asumim quants caracters maxims podem mirar
            if(llargNom<llargFiltre){
                // Si el nom < filtre, llavors no ensenyem res
            }else{
                // Si el nom >= filtre mirem caracter a caracter 
                tope=llargFiltre;
                // Comprovem caracter a caracter el nom i la cadena
                for(let i=0; i<tope; i++){
                    if(nomPokemon[i]==cadena1[i]){
                        // Si el caracter esta al nom, seguim
                        nomValidat=true
                    }else{
                        // Si no esta a la cadena, sortim del bucle
                        nomValidat=false
                        break
                    }
                }
            }

            // Si validat=true vol dir que el nom del pokemon conte la cadena buscada i l afegim al llistat
            if(nomValidat){array_nomspokemonsVisibles.push(nomPokemon)} 
        });

        // imprimim la nova llista
        console.log("Els noms dels pokemons son:", array_nomsPokemons)
        console.log("El filtre es: ", cadena1)
        console.log("Els noms de pokemons que estan a la llista filtrada son:")
        console.log(array_nomspokemonsVisibles)
        
        // Posem display:none de TOTS els pokemons de la llista
        //let elements = document.querySelectorAll("article.card")
        //elements.forEach(element => {element.style.display=none})
        // NOTA: per optimitzar una mica el codi, ho posem tot en un sol bucle, veure mes abaix

        // Afegim display:block als pokemons seleccionats
        // NOTA: com el numero de articles i el numero de nom ses el mateix podem fer servir el 
        //       mateix numero de index, per tant el index del nom es el index del article que
        //       posarem visible/invisible
        // NOTA: Fem un bucle tal qeu mira cada nom en cada element i el compara recorrent un segon
        //       bucle amb els noms triats de la llista, si coincideix, icom el index del nom es el 
        //       mateix que el de la card, posem el element sencer visible o invisible class="pokeName1"
        let elements            = document.querySelectorAll("article")
        let elementsNames       = document.querySelectorAll("span.pokeName1")
        let elementsNumber      = elements.length-1
        let pokesVisiblesNumber = array_nomspokemonsVisibles.length

        console.log("Total articles a la llista: " + elementsNumber)
        console.log("Total pokes visibles: " + pokesVisiblesNumber)

        // Valeeee .... pero em de fer SEMPRE RESET de la posible configuracio anterior, per tant:
        elements.forEach(element => {element.style.display="block"});

        // Recorrem els array de elements ....
        let status1=""
        for(let z=0; z<elementsNumber; z++){
            // Comprovem si el nom esta a la llista de pokemons visibles
            let nomPokeHTML = (elementsNames[z].innerHTML).trim()
            for (let w=0; w<pokesVisiblesNumber; w++){
                let nomPokeVisible = array_nomspokemonsVisibles[w]
                if( nomPokeHTML == nomPokeVisible){
                    // Si el nom del article coincideix amb un nom de la llista, el posem VISIBLE
                    status1="block"
                    // SI el trobem un cop, ja sortim de la comprovacio, pq si no, el posara a false
                    break
                }else{
                    // Si el nom del article NO coincideix amb un nom de la llista, el posem INVISIBLE
                    status1="none"
                }
                //console.log("VALIDACIO DE LA LLISTA")
                //console.log("ARTICLE [" + nomPokeHTML + "] - LLISTA [" + nomPokeVisible + "]")
            }
            elements[z].style.display=status1
            //console.log(`[${nomPokeHTML}] posat [${status1}]`)
        }
    });
}

/* FUNCIONS SENSE RETORN AL MATEIX LLISTAT */
async function llistat_configuracioURLSenseParametres(){
    /* Funcio que presenta la pagina web normal amb un llistat de 10 targetes de pokemons aleatoris */
    /* Tambe em de posar sections en visible i invisible */

    /* 
    PASOS PREVISTOS:
        Demanarem el nombre maxim de pokemons que te la API 
        Crearem un array de 10 valors aleatoris SENSE repeticio entre 1 i el maxim recuperat
        Preparem la peticio de les dades dels 10 pokemons
        Presentem les dades
        Gestions de la visibilitat de les seccions
            Activem    section LLISTAT
            Desactivem section DETALL
            Desactivem section LOADING
    */

    /* Definim algunes variables que podem necessitar */
    const urlAPI         = "https://pokeapi.co/api/v2/"
    const pokemonspecies = "pokemon-species/"
    const pokemondata    = "pokemon/"

    let lsKey = "UOCPACK02POKEDEX_ARRAYRND"  // Definim la key que farem servir guardar/llegir per el arrayRND
   

    // Indicarem en quina funcio anem funcionant ...
    console.log("Funcio actual: llistat configuracio URL Sense Parametres")

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
    for(let x=0; x<10; x++){
        nouvalor = llistat_randomizer(maxpokes,1);
        // TO-DO ==>> Queda per verificar que els valors no estarien repetits 
        arrayRND.push(nouvalor)  
    }

    /* Ensenyem el array que em generat */
    console.log("Array random generat: " + arrayRND)
    
    /* Preparem i recuperem les dades de les peticions asincrones amb les id aleatories creades */
    let array_pokemons=[]
    let noupokemon=""
    for(let x=0; x<10;x++){
        // Recuperem les dades de cada pokemon a traves de la seva ID
        noupokemon = await fetch(urlAPI + pokemondata + arrayRND[x])
        // Reconvertim a JSON
        noupokemon = await noupokemon.json()
        // i l afegim al array ....
        array_pokemons.push(noupokemon)
    }

    // Mostrem el array de Pokemons a la consola
    console.log(array_pokemons)

    /* 
    Preparem el HTML de les 10 targetes dels pokemons, repetint la seguent estructura
    
        <article class="card">
            <img src="" alt="imatge del pokemon presentat" class="poke_img">
            <div class="dades">
                ID  <span class="poke_id" > ID DEL POKEMON  </span></br>
                NOM <span class="poke_nom"> NOM DEL POKEMON </span></br>
                ATK <span class="poke_atk"> ATACK VALUE     </span></br>
                DEF <span class="poke_def"> DEFENSE VALUE   </span>
            </div>
        </article>
    */
    let pokecards=[]
    for(let x=0; x<10; x++){
        // recuperem els valors qeu ens calen del array ....
        let poke_img   = array_pokemons[x].sprites.front_default
        if((poke_img === null)&&(typeof(poke_img)=="object")){poke_img="media/imatges/fails/imatgeNoDisponible_rodona.png"}
        let poke_id    = array_pokemons[x].id
        let poke_nom   = array_pokemons[x].name
        let poke_atk   = array_pokemons[x].stats[1].base_stat
        let poke_def   = array_pokemons[x].stats[2].base_stat

        /*
        // Recrearem la estructura HTML linia a linia ...
        linia01    = '<article class="card">'
        linia02    = `     <img src="${poke_img}" alt="imatge del pokemon presentat" class="poke_img">`
        linia03    = '     <div class="dades">'        
        linia04    = `           ID:  <span class="poke_id">  ${poke_id}  </span></br>`        
        linia05    = `           NOM: <span class="poke_nom"> ${poke_nom} </span></br>`        
        linia06    = `           ATK: <span class="poke_atk"> ${poke_atk} </span></br>`       
        linia07    = `           DEF: <span class="poke_def"> ${poke_def} </span>`
        linia08    = '      </div>'
        // ******************************************
        // ******************************************
        linia08a   = `      <a href="llistat.html?pokeID=${poke_id}" class="poke_btnDetalls">VEURE MES DETALLS</a>`
        // ******************************************
        // ******************************************
        linia09    = '</article>'

        // Ho afegim tot a un array ....
        pokecards.push(linia01 + linia02 + linia03 + linia04 + linia05 + linia06 + linia07 + linia08 + linia08a + linia09)
        */

        /* ******************* MODIFICACIO ESTRUCTURA DE LA CARD PER ADAPTAR A CANVIS DESDE 20220906 ***************** */
        linia = ""
        linies = ""
        // Fem les linies del codi nou de HTML ....
        linia  = '<div classs="pokeContainer">'
        linies = linies + linia

        linia  = '  <article class="pokeCard">'
        linies = linies + linia

        /*
        linia  = '      <div class="poke_tapa">'
        linies = linies + linia
        linia  = '      </div>'
        linies = linies + linia
        */

        linia  = '      <div class="poke_contingut">'
        linies = linies + linia
        linia  = `          <div class="pokeImg">`
        linies = linies + linia
        linia  = `              <div class="pID">`
        linies = linies + linia
        linia  = `                  <span class="pokeId0">ID</span>`
        linies = linies + linia
        linia  = `                  <span class="pokeId1">${poke_id} </span>`
        linies = linies + linia
        linia  = `              </div>`
        linies = linies + linia
        linia  = `              <div class="pImg">`
        linies = linies + linia
        linia  = `                  <img src="${poke_img}" alt="">`
        linies = linies + linia
        linia  = `              </div>`
        linies = linies + linia
        linia  = `              <div class="pName">`
        linies = linies + linia
        linia  = `                  <span class="pokeName0">NOM:</span>`
        linies = linies + linia
        linia  = `                  <span class="pokeName1">${poke_nom}</span>`
        linies = linies + linia
        linia  = `              </div>`
        linies = linies + linia
        linia  = `          </div>`
        linies = linies + linia
        linia  = `          <div class="pokeData">`
        linies = linies + linia
        linia  = `              <div class="pAtk">`
        linies = linies + linia
        linia  = `                  <span class="pokeAtk0">Atac</span><br>`
        linies = linies + linia
        linia  = `                  <span class="pokeAtk1">[${poke_atk}]</span>`
        linies = linies + linia
        linia  = `              </div>`
        linies = linies + linia
        
        linia  = `              <!--`
        linia  = `              <div class="pCuadrat"></div>`
        linia  = `              -->`
        
        linia  = `              <div class="pDef">`
        linies = linies + linia
        linia  = `                  <span class="pokeDef0">Defensa</span><br>`
        linies = linies + linia
        linia  = `                  <span class="pokeDef1">[${poke_def}]</span>`
        linies = linies + linia
        linia  = `              </div>`
        linies = linies + linia
        linia  = `          </div>`
        linies = linies + linia
        linia  = `          <div class="pokeBtn">`
        linies = linies + linia
        linia  = `              <div class="pBtn">`
        linies = linies + linia
        linia  = `                  <span class="pokeBtn0"><a class="pokeBtn1" href="llistat.html?pokeID=${poke_id}">MES DADES</a></span>`
        linies = linies + linia
        linia  = `              </div>`
        linies = linies + linia
        linia  = `          </div>`
        linies = linies + linia
        linia  = `      </div>` // /div .poke_contingut
        linies = linies + linia
        linia  = `  </article>`
        linies = linies + linia
        linia  = `</div>` // /div .pokeContainer
        linies = linies + linia
        
        //  i les afegim al array de articles ....
        pokecards.push(linies)
        /* ************************************************************************************************************ */

    }

    // Afegim el codi HTML creat a la pagina web ....
    const DOM_llistat = document.querySelector("main section.llistat");
    let codiHTML = ""
    for(let x=0;x<10;x++){
        codiHTML = codiHTML + pokecards[x] 
    }
    DOM_llistat.innerHTML = codiHTML
            
    /* Visibilitzem i amaguem segons convingui les diferents sections del html */
    // exple: document.getElementsByClassName("input-blue-border")[0].style.borderColor = "red";
    // Esperem 5 sg pq es pugui contemplar el GIF ....
    // La funcio setTimeOut para el programa durant x milisegons
    console.log("Esperem 2 segons mes per canviar la visibilitat de les sections ....")
    setTimeout(function(){
        console.log("i ara canviem els displays ...")
        // Activem    section FILTRE
        document.querySelector("section.buscador").style.display="flex";
        // Activem    section LLISTAT
        document.querySelector("section.llistat").style.display="flex";
        // Desactivem section DETALL
        document.querySelector("section.detall").style.display="none";
        // Desactivem section LOADING 
        document.querySelector("section.loading").style.display="none";;
    }, 2000);

    // Afegirem tambe el event click per anar al detall ... a cada pokemon
    // NOTA: canviem el event click del div al buto de detall !!!!!
    const targetes = document.querySelectorAll("article a")
    const targetesmax = targetes.length

    for(let x=0; x<targetesmax; x++){
        targetes[x].addEventListener("click",function(event){
            /* El qeu volem es que al fer click pasi el seguent: 
                    Obtenim el id del pokemon de la card
                    Construim la URL tal qeu inclogui el pokeID
                    Carreguem la pagina amb la nova URL, com que portara un pokeID ja ho gestiona l altre funcio 
            */

            event.preventDefault()

            // Obtenim la ID del pokemon, que esta al array_rnd ...
            let pokeID1 = arrayRND[x]
            // Obtenim la url a la que em de anar ....
            let urlPokeID1 = "llistat.html?pokeID=" + pokeID1

            // ***************************************************************************************
            // ***************************************************************************************
            // Aqui afegim la part del localStorage, tal qeu quant fem click es guardi el arrayRND i es pugui reuperar el llistat actual
            // LS_Create(lsKey) // NOTA: NO cal pq es fa directaemtn amb la funcio de UPDATE
            console.log(`Guardant al localStorage [${arrayRND}] => [${lsKey}`)
            LS_Update(lsKey,JSON.stringify(arrayRND))
            // ***************************************************************************************
            // ***************************************************************************************

            // Saltem a la pagina ... per fer aixo simplement canviem el href del document, aixo te l avantatge
            // de qeu podem tornar enrerre simplement amb el boto de "<-" del navegador.
            window.location.href = urlPokeID1
        })
    }
}

async function llistat_configuracioURLAmbParametres(){
    /* Funcio que presenta una carta de pokemon segons la pokeid rebuda a la URL
    /* exple: llistat.html?pokeID=234 */
    /* Tambe em de posar sections en visible i invisible */

    /*
    Em de mirar quin pokeID rebem
    Fer la peticio a la API
    Dibuixar la card amb les dades ampliades
    Dibuixar el boto per tornar al llistat -> tambe serveix el link del navegador
    */

    /* 
    Analitzem la URL .... 
    NOTA: A partir de una url tal que: ... llistat.html?pokeID=24 
    podem fer servir:   window.location.search i obtindrem: ?pokeID=34
    podem fer servir:   const urlSearchParams = new URLSearchParams(window.location.search);
                        const id = urlSearchParams.get("pokeID");
                        console.log("El id es:", id);
    */
    /* Definim algunes variables que podem necessitar */
    const urlAPI         = "https://pokeapi.co/api/v2/"
    const pokemonspecies = "pokemon-species/"
    const pokemondata    = "pokemon/"

    // Indicarem en quina funcio anem funcionant ...
    console.log("Funcio actual: llistat configuracio URL Amb Parametres")

    let urlRebuda = window.location.href
    let urlSearchParams = new URLSearchParams(window.location.search)
    let pokeID = urlSearchParams.get("pokeID")
    console.log("La URL de la pagina es: " + urlRebuda)
    console.log("El valor de pokeID es: " + pokeID)

    /* Demanem les dades a la API .... */
    // Recuperem les dades del pokemon demanat ...
    let dadesPokemon = await fetch(urlAPI + "pokemon/" + pokeID)
    // Convertim a format json ...
    dadesPokemon = await dadesPokemon.json()
    console.log(dadesPokemon)

    /* Pintem la card ampliada amb HTML */
    // recuperem els valors qeu ens calen del array ....
    let poke_img1  = dadesPokemon.sprites.front_default
    console.log("URL de imatge: ", poke_img1, typeof(poke_img1))
    if((poke_img1 === null)&&(typeof(poke_img1)=="object")){poke_img1="media/imatges/fails/imatgeNoDisponible_rodona.png"}
    console.log("URL de imatge tractada:", poke_img1, typeof(poke_img1))
    let poke_img2  = dadesPokemon.sprites.back_default
    //console.log("Valor de imatge:", poke_img2, typeof(poke_img2))
    if((poke_img2 === null)&&(typeof(poke_img2)=="object")){poke_img2="media/imatges/fails/imatgeNoDisponible_rodona.png"}
    //console.log("Valor de imatge pas2:", poke_img2, typeof(poke_img2))
    let poke_id    = dadesPokemon.id
    let poke_nom   = dadesPokemon.name
    let poke_atk   = dadesPokemon.stats[1].base_stat
    let poke_def   = dadesPokemon.stats[2].base_stat
    let poke_typ   = dadesPokemon.types
    // NOTA: types es un array, els noms el podem obtenir amb: .types[x].type.name

    // Obtenim les dades dels types per poder-los afegir ...
    let num_typs = poke_typ.length
    let pokecards=[]

    /*
    // Recrearem la estructura HTML linia a linia ...
    linia01    = '<article class="card">'
    
    linia02    = `     <img src="${poke_img1}" alt="imatge del pokemon presentat" class="poke_img">`
    linia03    = `     <img src="${poke_img2}" alt="imatge del pokemon presentat" class="poke_img">`

    linia2     = `     <img src="${poke_img1}" alt="imatge del pokemon presentat" class="poke_img">`
                 `     <img src="${poke_img2}" alt="imatge del pokemon presentat" class="poke_img">`

    linia04    = '     <div class="dades">'        
    linia05    = `           ID:  <span class="poke_id">  ${poke_id}  </span></br>`        
    linia06    = `           NOM: <span class="poke_nom"> ${poke_nom} </span></br>`        
    linia07    = `           ATK: <span class="poke_atk"> ${poke_atk} </span></br>`       
    linia08    = `           DEF: <span class="poke_def"> ${poke_def} </span></br>`
    // Com els types poden ser mes de 1, fem un bucles per tots ells i anem afegint linies 
    linia09    = ""
    for(let z=0;z<num_typs;z++){
        linia09 = linia09 + `TYP [${z}]: <span class="poke_def"> ${poke_typ[z].type.name} </span></br>`
    }
    linia10    = '      </div>'

    // Afegim el boto que ens demane per tornar al llista to i que es totalment reduntant ja que tenim el de la navegacio
    linia11    = ""
    linia11    = '      <a href="llistat.html">RETORNAR AL LLISTAT</a>'

    linia12    = '</article>'

    // Ho posem tot en una sola variable ....
    let codiHTML = ""
    codiHTML = linia01+linia02+linia03+linia04+linia05+linia06+linia07+linia08+linia09+linia10+linia11+linia12
    */

    /* ******************* MODIFICACIO ESTRUCTURA DE LA CARD PER ADAPTAR A CANVIS DESDE 20220906 ***************** */
    linia = ""
    linies = ""
    // Fem les linies del codi nou de HTML ....
    linia  = '<article class="pokeCard">'
    linies = linies + linia
    linia  = `  <div class="pokeImg">`
    linies = linies + linia
    linia  = `    <div class="pID">`
    linies = linies + linia
    linia  = `        <span class="pokeId0">ID</span>`
    linies = linies + linia
    linia  = `        <span class="pokeId1">${poke_id} </span>`
    linies = linies + linia
    linia  = `    </div>`
    linies = linies + linia
    linia  = `    <div class="pImg">`
    linies = linies + linia
    linia  = `        <img class="parella" src="${poke_img1}" alt="">`
    linies = linies + linia
    linia  = `        <img class="parella" src="${poke_img2}" alt="">`
    linies = linies + linia
    linia  = `    </div>`
    linies = linies + linia
    linia  = `    <div class="pName">`
    linies = linies + linia
    linia  = `        <span class="pokeName0">NOM:</span>`
    linies = linies + linia
    linia  = `        <span class="pokeName1">${poke_nom}</span>`
    linies = linies + linia
    linia  = `    </div>`
    linies = linies + linia
    linia  = `  </div>`
    linies = linies + linia
    linia  = `  <div class="pokeData">`
    linies = linies + linia
    linia  = `    <div class="pAtk">`
    linies = linies + linia
    linia  = `        <span class="pokeAtk0">Atac</span><br>`
    linies = linies + linia
    linia  = `        <span class="pokeAtk1">[${poke_atk}]</span>`
    linies = linies + linia
    linia  = `    </div>`
    linies = linies + linia

    linia  = `    <!--`
    linia  = `    <div class="pCuadrat"></div>`
    linia  = `    -->`

    linia  = `    <div class="pDef">`
    linies = linies + linia
    linia  = `        <span class="pokeDef0">Defensa</span><br>`
    linies = linies + linia
    linia  = `        <span class="pokeDef1">[${poke_def}]</span>`
    linies = linies + linia
    linia  = `    </div>`
    linies = linies + linia
    linia  = `  </div>`
    linies = linies + linia

    linia  = `  <div class="pokeTypes">`
    linies = linies + linia
    linia  = `      <p><span class="pokeType0">Tipologies disponibles</span></p>`
    linies = linies + linia
    // Mirem quants types tenim i reperitem la seccio per cadascun
    for(let z=0;z<num_typs;z++){
        // codi antic linia09 = linia09 + `TYP [${z}]: <span class="poke_def"> ${poke_typ[z].type.name} </span></br>`
        linia  = `      <div class="pTypes">`
        linies = linies + linia
        linia  = `          <span class="pokeType1"> ${poke_typ[z].type.name} </span>`
        linies = linies + linia
        linia  = `      </div>`
        linies = linies + linia
    }
    linia  = `  </div>`
    linies = linies + linia

    linia  = `  <div class="pokeBtn">`
    linies = linies + linia
    linia  = `    <div class="pBtn">`
    linies = linies + linia
    linia  = `        <span class="pokeBtn0"><a href="llistat.html">RETORNAR AL LLISTAT</a></span>`
    linies = linies + linia
    linia  = `  </div>`
    linies = linies + linia

       linia  = `</article>`
    linies = linies + linia

    let codiHTML = ""
    codiHTML = linies
    /* ************************************************************************************************************ */

    /* Afegim el codi HTML creat a la pagina web .... */
    const DOM_llistat = document.querySelector("main section.detall");
    DOM_llistat.innerHTML = codiHTML

    /* Pintem el boto de retorn */

    /* Visibilitzem i amaguem segons convingui les diferents sections del html */
    // exple: document.getElementsByClassName("input-blue-border")[0].style.borderColor = "red";
    // Esperem 5 sg pq es pugui contemplar el GIF ....
    // La funcio setTimeOut para el programa durant x milisegons
    console.log("Esperem 2 segons mes per canviar la visibilitat de les sections ....")
    setTimeout(function(){
        console.log("i ara canviem els displays ...")
        // Activem    section LLISTAT
        document.querySelector("section.llistat").style.display="none";
        // Desactivem section DETALL
        document.querySelector("section.detall").style.display="block";
        // Desactivem section LOADING 
        document.querySelector("section.loading").style.display="none";
        // Desactivem section FILTER
        // document.querySelector("section.filter").style.display="none"
    }, 2000);
}

/* FUNCIONS AMB RETORN AL MATEIX LLISTAT */
async function llistat_configuracioURLSenseParametresAmbRetorn(){
    /* Funcio que mostra un llistat aleatori de 10 pokesmons o be, si esta al localStorage, recupera un array de valors ID per fer-la */
    /* Tambe em de posar sections en visible i invisible */  
    
    /* 
    PASOS PREVISTOS:
        
    Mirem si tenim una clau al localStorage que tingui un array de 10 valors, que serien el llistat que em de recuperar
        NO, no tenim cap llistat ->
            Si no tenim cap llistat, procedim com en el cas antic, i podem cridar directament a la solucio antiga -> llistat_configuracioURLSenseParametres()
        
        SI, tenim ja un llistat al localStorage ->
            Recuperem el llistat de IDs que em de mostrar del localStorage. 
            ELIMINEM la clau del localStorage!!!!
                NOTA: Eliminar la clau en permet qeu si recarreguem la pagina, aqeusat es carregui ja sense mantenir cap llistat,
                recordem qeu la clau SOLS es guarda si fem click a sobre de un element de la llista, no passa si sols recarreguem la pagina

            Preparem la peticio de les dades dels 10 pokemons
            Presentem les dades
            Gestions de la visibilitat de les seccions
                Activem    section LLISTAT
                Desactivem section DETALL
                Desactivem section LOADING
            
            NOTA: de fet, si aquesta funcio, i tambe les altres!, estes dividida en funcions mes petitetes, les podriem aprofitar perfectament
            i el codi no seria tant redundant. Pero no pasa res, pq la idea es veure com es fan les coses, no obtenir un codi
            altament optimitzat.

            NOTA: Com ja em comentat, alguns dels pasos simples actuals es podrien optimitzar agrupant-los en altres

            NOTA: Tampoc estem gestionant els posibles errors.
    */ 

    /* Definim les variables locals */
        let lsKey = "UOCPACK02POKEDEX_ARRAYRND"  // Definim la key que farem servir guardar/llegir per el arrayRND
    
        // mirem quin valor te actualment la key:
        console.log("Check si tenim alguna cosa al localStorage amb la clau [" + lsKey +"]")
        console.log(LS_Read(lsKey))

    /* Definim calculs i processos */
        // Mirem si tenim aquesta key al LS ... 
        // NOTA: posem el valor amb ! pq la instruccio del cas 'NO' es mes curta i no caldra anar a buscarla al final de tot el codi
        if(!LS_Check(lsKey)){
            /* NO, no hi ha pas key i procedim com em decidit .... executem la versio simplificada */
            console.log(`NO tenim key [${lsKey}] al localStorage`)
            console.log("Funcio actual: llistat configuracio URL Sense Parametres")
            llistat_configuracioURLSenseParametres()
        }else{
            /* SI, tenim la key i procedim doncs... */
            // Indicarem en quina funcio anem funcionant ...
            console.log(`SI tenim key [${lsKey}] al localStorage`)
            console.log("Funcio actual: llistat configuracio URL Sense Parametres Amb Retorn")
            
            // ***************************************************************************************
            // ***************************************************************************************
            // recuperem el arrayRND del localStorage i ESBORREM la clau
            let arrayRND = await JSON.parse(LS_Read(lsKey))
            console.log(`Recuperant del localStorage la clau [${lsKey}] => [${arrayRND}]`)
            LS_Delete(lsKey)
            // ***************************************************************************************
            // ***************************************************************************************

            // Demanem els 10 pokes de la llista (fem copy&paste de llistat_configuracioURLSenseParametres()
            const urlAPI         = "https://pokeapi.co/api/v2/"
            const pokemondata    = "pokemon/"

            let array_pokemons = []
            let noupokemon = ""
            for(let x=0; x<10; x++){
                // Recuperem les dades de cada pokemon a traves de la seva ID
                noupokemon = await fetch(urlAPI + pokemondata + arrayRND[x])
                // Reconvertim a JSON
                noupokemon = await noupokemon.json()
                // i l afegim al array ....
                array_pokemons.push(noupokemon)
            }

            // Construim el codi HTML per representar els pokemons
            let pokecards=[]
            for(let x=0; x<10; x++){
                
                // recuperem els valors qeu ens calen del array ....
                let poke_img   = array_pokemons[x].sprites.front_default
                console.log("Valor de imatge:", poke_img)
                if((poke_img === null)&&(typeof(poke_img)=="object")){poke_img="media/imatges/fails/imatgeNoDisponible_rodona.png"}
                let poke_id    = array_pokemons[x].id
                let poke_nom   = array_pokemons[x].name
                let poke_atk   = array_pokemons[x].stats[1].base_stat
                let poke_def   = array_pokemons[x].stats[2].base_stat
            
                /* ANULEM; AQUEST CODI PE EM POSAREM UN DE MES COMPLERT .....
                // Recrearem la estructura HTML linia a linia ...
                // NOTA: Afegim la linia 08a!!!!
                linia01    = '<article class="card">'
                linia02    = `     <img src="${poke_img}" alt="imatge del pokemon presentat" class="poke_img">`
                linia03    = '     <div class="dades">'        
                linia04    = `           ID:  <span class="poke_id">  ${poke_id}  </span></br>`        
                linia05    = `           NOM: <span class="poke_nom"> ${poke_nom} </span></br>`        
                linia06    = `           ATK: <span class="poke_atk"> ${poke_atk} </span></br>`       
                linia07    = `           DEF: <span class="poke_def"> ${poke_def} </span>`
                linia08    = '      </div>'
                // ****************************************** 
                // ******************************************
                linia08a   = `      <a href="llistat.html?pokeID=${poke_id}" class="poke_btnDetalls">VEURE MES DETALLS</a>`
                // ******************************************
                // ******************************************
                linia09    = '</article>'
            
                // Ho afegim tot a un array ....
                pokecards.push(linia01 + linia02 + linia03 + linia04 + linia05 + linia06 + linia07 + linia08 + linia08a + linia09)
                */

                /* ******************* MODIFICACIO ESTRUCTURA DE LA CARD PER ADAPTAR A CANVIS DESDE 20220906 ***************** */
                linia = ""
                linies = ""
                // Fem les linies del codi nou de HTML ....
                linia  = '<div class="pokeContainer">'
                linies = linies + linia
        
                linia  = '  <article class="pokeCard">'
                linies = linies + linia
        
                /*
                linia  = '      <div class="poke_tapa">'
                linies = linies + linia
                linia  = '      </div>'
                linies = linies + linia
                */
        
                linia  = '      <div class="poke_contingut">'
                linies = linies + linia
                linia  = `          <div class="pokeImg">`
                linies = linies + linia
                linia  = `              <div class="pID">`
                linies = linies + linia
                linia  = `                  <span class="pokeId0">ID</span>`
                linies = linies + linia
                linia  = `                  <span class="pokeId1">${poke_id} </span>`
                linies = linies + linia
                linia  = `              </div>`
                linies = linies + linia
                linia  = `              <div class="pImg">`
                linies = linies + linia
                linia  = `                  <img src="${poke_img}" alt="">`
                linies = linies + linia
                linia  = `              </div>`
                linies = linies + linia
                linia  = `              <div class="pName">`
                linies = linies + linia
                linia  = `                  <span class="pokeName0">NOM:</span>`
                linies = linies + linia
                linia  = `                  <span class="pokeName1">${poke_nom}</span>`
                linies = linies + linia
                linia  = `              </div>`
                linies = linies + linia
                linia  = `          </div>`
                linies = linies + linia
                linia  = `          <div class="pokeData">`
                linies = linies + linia
                linia  = `              <div class="pAtk">`
                linies = linies + linia
                linia  = `                  <span class="pokeAtk0">Atac</span><br>`
                linies = linies + linia
                linia  = `                  <span class="pokeAtk1">[${poke_atk}]</span>`
                linies = linies + linia
                linia  = `              </div>`
                linies = linies + linia
                
                linia  = `              <!--`
                linia  = `              <div class="pCuadrat"></div>`
                linia  = `              -->`
                
                linia  = `              <div class="pDef">`
                linies = linies + linia
                linia  = `                  <span class="pokeDef0">Defensa</span><br>`
                linies = linies + linia
                linia  = `                  <span class="pokeDef1">[${poke_def}]</span>`
                linies = linies + linia
                linia  = `              </div>`
                linies = linies + linia
                linia  = `          </div>`
                linies = linies + linia
                linia  = `          <div class="pokeBtn">`
                linies = linies + linia
                linia  = `              <div class="pBtn">`
                linies = linies + linia
                linia  = `                  <span class="pokeBtn0"><a class="pokeBtn1" href="llistat.html?pokeID=${poke_id}">MES DADES</a></span>`
                linies = linies + linia
                linia  = `              </div>`
                linies = linies + linia
                linia  = `          </div>`
                linies = linies + linia
                linia  = `      </div>` // /div .poke_contingut
                linies = linies + linia
                linia  = `  </article>`
                linies = linies + linia
                linia  = `</div>` // /div .pokeContainer
                linies = linies + linia

                //  i les afegim al array de articles ....
                pokecards.push(linies)
                /* ************************************************************************************************************ */
            }
            
            // Afegim el codi HTML creat a la pagina web ....
            const DOM_llistat = document.querySelector("main section.llistat");
            let codiHTML = ""
            for(let x=0;x<10;x++){
                codiHTML = codiHTML + pokecards[x] 
            }
            DOM_llistat.innerHTML = codiHTML
            
            // Afegirem tambe el event click per anar al detall ... a cada pokemon
            // NOTA: canviem el event click del div al buto de detall !!!!!
            // codi vell const targetes = document.querySelectorAll(".card a.poke_btnDetalls")
            const targetes = document.querySelectorAll("article a")
            const targetesmax = targetes.length

            for(let x=0; x<targetesmax; x++){
                targetes[x].addEventListener("click",function(e){
                    /* El qeu volem es que al fer click pasi el seguent: 
                            Obtenim el id del pokemon de la card
                            Construim la URL tal qeu inclogui el pokeID
                            Carreguem la pagina amb la nova URL, com que portara un pokeID ja ho gestiona l altre funcio 
                    */
                    // Obtenim la ID del pokemon, que esta al array_rnd ...
                    let pokeID1 = arrayRND[x]
                    // Obtenim la url a la que em de anar ....
                    let urlPokeID1 = "llistat.html?pokeID=" + pokeID1

                    // ***************************************************************************************
                    // ***************************************************************************************
                    // Aqui afegim la part del localStorage, tal que quant fem click es guardi el arrayRND i es pugui reuperar el llistat actual
                    // LS_Create(lsKey) // NOTA: NO cal pq es fa directaemtn amb la funcio de UPDATE
                    console.log(`Guardant al localStorage [${arrayRND}] => [${lsKey}`)
                    LS_Update(lsKey,JSON.stringify(arrayRND))
                    // ***************************************************************************************
                    // ***************************************************************************************

                    // Saltem a nova la pagina (que es la mateixa pero amb el pokeID com a variable)... 
                    // per fer aixo simplement canviem el href del document a la nova url
                    window.location.href = urlPokeID1
                })
            }
            
            // Finalment, canviem la visibilitat dels 3 elements ...
            console.log("Esperem 2 segons mes per canviar la visibilitat de les sections ....")
            setTimeout(function(){
                console.log("i ara canviem els displays ...")
                // Activem    section FILTRE
                document.querySelector("section.buscador").style.display="none";
                // Activem    section LLISTAT
                document.querySelector("section.llistat").style.display="flex";
                // Desactivem section DETALL
                document.querySelector("section.detall").style.display="none";
                // Desactivem section LOADING 
                document.querySelector("section.loading").style.display="none";
            }, 2000);
        }
}

async function llistat_configuracioURLAmbParametresAmbRetorn(){}

/* FUNCIO DE INICIALITZACIO DE LA PAGINA WEB */
function llistat_initialize(){
    /* Funcio que inicialitza la pagina web */

    /* 
    Cosetes qeu em de fer al iniciar la pagina:
        Comprovar URL si te o no parametres, 
            SENSE PARAMETRES -> llistat_configuracioURLSenseParametres
            AMB PARAMETRES   -> llistat_configuracioURLAmbParametres

    llistat_configuracioURLSenseParametres v2: 
        em de mostrar un llistat de 10 cartes de pokemon.
        Validem si estem retornant de un "detall" i recuperem el llistat anterior que tenim al localstorage
        amaguem la part de detall.

    llistat_configuracioURLAmbParametres v2:
        em de mostrar el detall del pokemon rebut per url.
        amaguem la part del llistat.
    */

    /* recuperem la url de la pagina */
    let url_llistat = window.location.href;
    console.log("La URL de la pagina actual es: " + url_llistat);

    /* extreiem els parametres */
    /* 
    NOTA: A partir de una url tal que: ... llistat.html?pokeID=24 
        podem fer servir:   window.location.search i obtindrem: ?pokeID=34
        podem fer servir:   const urlSearchParams = new URLSearchParams(window.location.search);
                            const id = urlSearchParams.get("pokeID");
                            console.log("El id es:", id);
    */
   if(window.location.search != ""){
    /* Si tenim alguna coseta despres de la url, apareixeria com una cadena de text .... */
    // Tenim 2 versions:
        llistat_configuracioURLAmbParametres()             // V1.0 Sols mostra el detall del pokemon indicat
        // llistat_configuracioURLAmbParametresAmbRetorn() // V2.0 Te un btn per retornar explicitament al llistat de origen
    
   }else{
    /* Si NO tenim res de res a la url .... */
    // Tenim 2 versions:
        // llistat_configuracioURLSenseParametres();            // V1.0 Sols mostra el llistat de 10 pokes aleatoris
        llistat_configuracioURLSenseParametresAmbRetorn()       // V2.0 Recorda de quin llistat ve i te un btn pel detall
   }
}

/* Carreguem les funcions al event DOMLoaded */
document.addEventListener("DOMContentLoaded",()=>{
    console.log("Inicialitzant codi JS de la pagina");
    // Activant gestio del tema ....
    themeSelector_initializerV2()
    // Activant gestio de llistats ....
    llistat_initialize();
    // Activant section buscador .....
    llistat_buscadorInitializer()
})