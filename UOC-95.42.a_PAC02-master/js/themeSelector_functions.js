/* ************************************************************** */
/*             Funcions per gestionar el Theme */
/* ************************************************************** */

/* url de consulta: https://web.dev/prefers-color-scheme/ */

/* ************************************************************** */
/*                    Funcions auxiliars */
/* ************************************************************** */

function themeSelector_activateConfig(){
    /* Funcio qeu activa el tema indicat */

    /* Definim variables per fer cosetes .... */
    let lsKey = "UOCPACK02POKEDEX_TEMA"

    /* Definim operacions */
    // Llegir del LS
    let tema_actual = LS_Read(lsKey)

    // Modificar el HTML: es a dir, asignem la clase de theme_selected a qui li toqui
    let themeSelector_Controls = document.querySelectorAll("li.li_theme ul li")
    let clase_activa = "theme_selected"
    themeSelector_Controls.forEach(control => {
        // Es el tema actiu actual?
        if((control.innerHTML).trim() == tema_actual){
            // Te la clase activa asignada?
            if(control.classList.contains(clase_activa)){
                // Val!! ja esta be!, no cal fer res mes
            }else{
                // Ahh!!! li afegirem doncs la clase que li toca per ser el element actiu ....
                control.classList.add(clase_activa)
            }
        }else{
            // Te la clase activa asignada?
            if(control.classList.contains(clase_activa)){
                // arghh!!! se la treurem!!!!
                control.classList.remove(clase_activa)
            }else{
                // Val!! ja esta be!, no cal fer res mes
            }
        }
    })

    // Modificar el CSS: canviem el axiu de CSS de la pagina
    // NOTA: una manera facil es canviar el href del link al css.
    document.getElementById("css_Theme").href = "css/general_" + tema_actual.toUpperCase() + ".css"
}

function themeSelector_ActivateConfigV2(tema_actual){
    /* funcio qeu carrega el thema actiu indicat */

    // Guardem el valor al localStorage ....
    let lsKey = "UOCPACK02POKEDEX_TEMA"
    let clase_activa = "theme_selected"
    console.log("Guardant tema:" + tema_actual + " a la key:" + lsKey)
    LS_Update(lsKey,tema_actual)

    // Actualitzem la clase activa als items del html pq qeudi marcat el bo
    let items = document.querySelectorAll("li.li_theme ul li")
    //  Esborrem la clase activa de tots el items i afegim la clase activa al tema actual
    items.forEach(item => {
        valorItem = item.innerHTML
        valorItem = valorItem.trim()
        valorItem = valorItem.toUpperCase()
        if(item.innerHTML == tema_actual){
            // Si el valor del item es el de l tema actual
            console.log("Afegint clase activa al item ",valorItem)
            item.classList.add(clase_activa)
        }else{
            // Si es qualsevol altre
            console.log("Eliminant clase activa del item ", valorItem)
            item.classList.remove(clase_activa)
        }   
    });

    // Modificar el CSS: canviem el axiu de CSS de la pagina
    // NOTA: una manera facil es canviar el href del link al css.
    document.getElementById("css_Theme").href = "css/general_" + tema_actual.toUpperCase() + ".css"
    console.log("Actualitzat CSS a: ", document.getElementById("css_Theme").href)
}

/* ************************************************************** */
/*                    Funcions Principals */
/* ************************************************************** */

function themeSelector_initialize(){
    /* funcio que inicialitza el control de temas de colors, fonts i el que calgui */

    /* Cosetes que farem .... 
        
            NOTA: Podem carregar el bootStrap i fer un menu desplegable, llavors es mes facil
            afegir clasificacions per colors i altres com "+/- contrast" o "+/- font"
            sobretot si em de fer una web adaptada.

            Comprovem qeu tenim una estructura del tipus:
                <li class="li_theme">
                    <h3>SELECCIO TEMA</h3>
                        <ul>
                            <li class="selected">SYSTEM</li>
                            <li>DARK</li>
                            <li>LIGHT</li>
                            ...
                        </ul>
                    </li>

            Obtenim els valors dels li -> SYSTEM, DARK, LIGHT ...
            NOTA: SYSTEM ES OBLIGATORI, encara que estigui ocult, carregara el tema preferit pel navegador

            Comprovem si TENIM aquests valors al nostre selector i els guardem
                NO -> Desactivem el selector de thema
                SI ->
                    Comprovem si algun te la clase "selected", asignada per defecte al CSS inicial
                        NO -> Asignarem SELECTED a SYSTEM.
                        SI -> Asignarem a la seleccionada: SYSTEM, DARK, LIGHT o les que tinguem

            Comprovem si tenim la key de TEMA al localStorage
                NO -> la crearem i li posem el valor actual
                SI -> la llegim, la validem, i la posem com la actual

            Afegim els events corresponents als controls
                event CLICK -> carrega el tema 
                event HOVER -> mostra temporalment el tema

            Carreguem el tema actual seleccionat, que ja actualitza el valor al localStorge i l HTML
    */
    
    /* Definim les variables que farem servir per treballar */
    // PENDENT !!! --> Comprovem qeu realment tenim una area de seleccio de thema
    // PENDENT !!! --> Comprovem qeu tenim al menys algun selector de thema

    // El valor de la key pel localStorage
    let lsKey = "UOCPACK02POKEDEX_TEMA"
    console.log("La key per la gestio del tema es [", lsKey, "]")
    console.log("El valor de la key es: ", LS_Read(lsKey))

    // El valor del tema actual
    let tema_actual = ""
        
    // El bloc contenidor de la llista ....
    let themeSelector_block = document.querySelector("li.li_theme")

    // Els butons de les opcions 
    let themeSelector_Controls = document.querySelectorAll("li.li_theme ul li")

    // Els valors dels botons de les opcions ....
    let themeSelector_options = []
    themeSelector_Controls.forEach(control => {
        valorControl = control.innerHTML
        themeSelector_options.push(valorControl)
     });
    console.log("Em detectat [" + themeSelector_options.length + "] valors de seleccio de Thema")
    console.log(themeSelector_options)
    
    /* Comprovem si algun te la clase "selected" .... */
    /* NOTA: Podem fer servir al menys dos metodes:
            1) indexOf()
            2) element.classlist.contains() 
    */
    themeSelector_Controls.forEach(control => {
        // Mirem si te la clase ="theme_selected"
        let clase_buscada = "theme_selected"
        if (control.classList.contains(clase_buscada)){
            // El element TE la clase buscada, l asignem a la clase actual
            tema_actual = (control.innerHTML).trim()
            // El convertim a majuscules ....
            tema_actual = tema_actual.toUpperCase()
            console.log("El tema detectat es: ",tema_actual)
        }
     });
     // Si resulta que cap te la clase buscada, llavors se la posem a SYSTEM
     if (tema_actual==""){tema_actual="SYSTEM"}
     console.log("El valor del tema actual es: ", tema_actual)

    /* Comprovem si tenim alguna cosa ja guardada al localStorage, que es prioritaria sobe el actual .... */
    tema_localStorage = LS_Read(lsKey)
    console.log("El valor de [" + lsKey + "] es [" + tema_localStorage + "]" )
        if(tema_localStorage != undefined){
        // si en tenim una, la posem com a tema_actual
        tema_actual = tema_localStorage
    }else{
        //si no, la posem amb el tema que ja teniem ....
        LS_Update(lsKey,tema_actual)
    }
    console.log("El valor del tema actual es 2: ", tema_actual)

    /* Actualitzar codi HTML de les opcions del navegador */
    // themeSelector_updateHTML()
    // NOTA: Aixo ja no cal pq em traslaldat aquesta funcionalitat a la funcio de activateConfig

    /* actualitzar configuracio al localStorage */
    // themeSelector_saveConfig(lsKey,tema_actual)
    // NOTA: Ja ho em fet al validar el contingut del LS ....

    /* Afegir events als controls */
    themeSelector_Controls.forEach(control => {
        // Recuperem el valor/nom del tema seleccionat
        // NOTA: de moment ho fem amb el text que te al html, pero no es pas la millor opcio!!!!
        // afegim event CLICK
        let tema = control.innerHTML;
        control.addEventListener("click",function(){
            LS_Update(lsKey,tema);
            themeSelector_activateConfig()
        })
        // afegim event HOVER que es mouseover+mouseout
        //control.addEventListener("mouseover",function(){})
        //control.addEventListener("mouseout", function(){})
    });

    /* Carregar el tema seleccionat actualment */
    console.log("Carregant tema actual ....")
    themeSelector_activateConfig()
}

function themeSelector_initializerV2(){
    /* Funcio qeu inicialitza el gestor de themes */

    /* 
    Pasos a seguir:
            Mirem si existeix/tenim la clau al LocalStorage i la recuperem, si no en tenim la posem a "-1"
            Mirem quin <li> te actualment asignada la clase "activat", per defecte ha de ser "SYSTEM"
            Decidim quein valor ha de tenir tema_actual segons els valors recuperats
            Cridem al activador del tema seleccionat
            Asignem els events als botons del thema
    */

    /* Definim varaibles locals */
    let lskey = "UOCPACK02POKEDEX_TEMA"
    let clase_activa = "theme_selected"
    let ts_container = document.querySelector("li.li_theme")
    let lsConfig =""
    let codiConfig = ""
    let tsConfig = "SYSTEM"
    let li_clases = ""
    let arrayTSvalors = []
    let tema_actual = ""

    /* Definim calculs auxiliars */
    // Indiquem a quina funcio estem ....
    console.log("FUNCIO: themeSelector_initializerV2()")
    // Obtenim clau LS
    // NOTA: SI no tenim clau o no te valor cal gestionar-lo tambe
    // NOTA: Suposarem qeu si No existeix la clau, o NO te valor, retorna "" o -1
    lsConfig = LS_Read(lskey)
    if((lsConfig == null)||(lsConfig == "")||(lsConfig == undefined)||(lsConfig == -1)){
        // SI estem aqui es que no esta definit ....
        lsConfig = -1;
        console.log("Dades recuperades del localStorage")
        console.log("la clau solicitada al LS no existeix o no te valor o no funciona")
    }else{
        // NO es null, es a dir suposarem qeu te alguna cosa bona per aprofitar ....
        lsConfig = lsConfig.trim()
        lsConfig = lsConfig.toUpperCase()
        console.log("Dades recuperades del localStorage")
        //console.log(`LOCALSTORAGE KEY:[${lskey}] VALUE:[${lsConfig}]`)
        console.log("KEYS DEL LOCAL STORAGE:")
        LS_View()
    }


    // Fem un array amb tots els valors existents al menu de seleccio de tema
    let ts_items = document.querySelectorAll("li.li_theme ul li")
    ts_items.forEach(li_item => {
        // posem el nom/valor del li al array de valors
        ts_dato = li_item.innerHTML
        // li treiem esl posibles espais devant i darrera
        ts_dato = ts_dato.trim()
        // ho passem a majuscules
        ts_dato = ts_dato.toUpperCase()
        // L afegim al array de valors
        arrayTSvalors.push(ts_dato)
    });
    console.log("Els valors posibles de thema detectats al HTML son:" , arrayTSvalors)

    // Mirem quin element del codi HTML te la clau activada
    console.log(" Mirem quines clases tenen els items del codi HTML")
    ts_items.forEach(li_item => {
        console.log("ITEM: " + li_item.innerHTML," CLASES: " + li_item.classList.value)
        if(li_item.classList.contains(clase_activa)){
            // SI, el item conte la clase activa, el guardem net, polit i en MAJUSCULES
            codiConfig = li_item.innerHTML
            codiConfig = codiConfig.trim()
            codiConfig = codiConfig.toUpperCase()
        }else{
            // NO, el item NO te la clase activa ...
        }
    })
    console.log("La opcio activa al HTML es: ", codiConfig)

    // Vale!, ara que sabem si tenim LS i quin valor te, i quin valor tenim seleccionat al codi html
    // El qeu toca es:
    //          Valor per defecte del tema_actual : SYSTEM
    //          Si tenim un altre seleccionat: tema_actual = valor_seleccionat
    //          Si tenim un valor de la clau del LS que coincideixi amb algun valor posible: tema_actual = valor recuperat

    // Validem seleccio local
    if(codiConfig==""){
        // Si No tenim cap item seleccionat, posarem el que es per defecte
        tema_actual = "SYSTEM"
    }else{
        // Si tenim algun activat, el posem com a tema actual
        tema_actual = codiConfig
    }
    console.log("El tema seleccionat al codi HTML es: ",codiConfig)

    // Validem seleccio del localStorage
    if((lsConfig=="") || (lsConfig==-1)){
        // Si no tenim res o no existeix clau de ls, deixarem el qeu ja tenim del selector
        console.log("Atencio, no tenim cap clau o valor al localStorage")
    }else{
        // Si tenim ja un tema guardat al localStorage
        // NOTA: De fet, aqui hauriem de comprovar que realment, el valor del ls esta a dintre del array
        //       de valors disponibles, pero no ho farem i suposarem que els usuaris no son tant maquiavelics ...
        tema_actual = lsConfig
    }
    console.log("El tema seleccionat del localStorage es: ", lsConfig)

    // Activem el tema seleccionat .....
    console.log("Activant el thema: ", tema_actual)
    themeSelector_ActivateConfigV2(tema_actual)

    // Vale!, i finalment asignem events al butons del menu
    ts_items.forEach(tsElement => {
        tsElement.addEventListener("click", function (e) {
            // Aqui explicarem el qeu es fara CADA cop qeu es faci CLICK a un item del theme selector
            // Agafem el valor del innerHTML que sera el valor de activacio
            tema_actual = tsElement.innerHTML
            tema_actual = tema_actual.trim() 
            tema_actual = tema_actual.toUpperCase()

            // I carreguem el nou tema ....
            themeSelector_ActivateConfigV2(tema_actual)
        })
    });
}