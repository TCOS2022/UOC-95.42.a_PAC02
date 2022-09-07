/* ************************************************************** */
/*             Funcions per gestionar el localStorage */
/* ************************************************************** */

/* ************************************************************** */
/*             Funcions basiques del LocalStorage */
/* ************************************************************** */
function LS_activated(){
    /* Funcio que mira si el localStorage funciona / esta activat */
}

function LS_Clear(){
    /* Funcio que ESBORRA TOT el localStorge */
    localStorage.clear();
}

function LS_Check(lskey){
    /* Funcio qeu comprova si tenim una determinada key a LS */
    // Nota podem fer servir: window.localStorage.getItem('Sidebar') !== undefined
    // console.log("Valor checkejat:" +  window.localStorage.getItem(lskey))
    if (
        (localStorage.getItem(lskey) !== undefined) &&
        (localStorage.getItem(lskey) !== null)
       )
        {return true}else{return false}
}

function LS_View(){
    for (let i=0; i< localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage[key];
        console.log(`localStorage ${key}:  ${value}`);
    }
}

/* ************************************************************** */
/*        Funcions CRUD (Create / Read / Edit / Delete) */
/* ************************************************************** */

function LS_Create(lskey){
    /* Funcio que crea una variable de nom lskey al localStorage */
    // NOTA: No hi ha una funcio especifica per fer-ho fem servir directament la de UPDATE
}
function LS_Read(lskey){
    /* Funcio que retorna el valor de una key del localStorage */
    // NOTA: Per emprar objectes o arrays, cal que els convertim PRIMER de text.
    //       Podem fer servir JSON.parse(window.localStorage.getItem('user')); per convertir de JSON A Objecte de nou
    let resultat = localStorage.getItem(lskey);
    return resultat
}
function LS_Update(lskey, lsvalue){
    /* Funcio que CREA i GUARDA un valor en una key al localSotorage */
    // NOTA: Per guardar objectes o arrays, cal que els convertim PRIMER en text.
    //       Podem fer servir JSON.stringify(objecte) per convertir de OBJECTE a JSON
    localStorage.setItem(lskey, lsvalue);
}
function LS_Delete(lskey){
    /* Funcio que elimina una key del localStorage */
    localStorage.removeItem(lskey);

    /* comprovem que realment esta eliminada intentat de rellegirla */
    console.log(`Verifiquem que la key [${lskey}] ha estat eliminada pq el valor es: ${LS_Read(lskey)}`)
}