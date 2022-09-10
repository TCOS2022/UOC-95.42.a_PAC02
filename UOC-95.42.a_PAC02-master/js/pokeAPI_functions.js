

function randomizer(max,min){
    /* Funcio qeu retorna un valor pseudoaleatori que pertany al domini [max,min] */
    // Per fer que el valor maxim pertanyi al domini, li afegim +1
    max = max+1
    let resultat = Math.floor((Math.random() * (max-min)) +min);
    return resultat
}

function checkNumberInArray(numero, array1){
    /* Funcio qeu retrona TRUE si el valor numeric esta dintre del array, en cas contrari retorna FALSE */

    // Definim variables locals 
    let llargArray=0
    let status = false
    
    // Obtenim el llarg del array
    llargArray = array1.length
    
    // Recorrem el array buscant coincidencies 
    for (let x=0; x<llargArray; x++){
        if(numero == array1[x]){
            // Si trobem la cioncidencia, posem el resultat a FALSE i sortim del bucle
            status=true
            break
        }else{
            // Si no trobem la cioncidencia, doncs seguim .....
        }
    }

    // retornem el resultat obtingut
    return status
}
function checkStringInArrayfromBeginning(cadena,array1,check="partial"){}

function checkStringInArray(cadena,array1,check="partial"){
    /* Funcio qeu retrona TRUE si la cadena esta dintre dels valors del array, en cas contrari retorna FALSE */
    /* Definim check=total/partial per fer que la validacio sigui per tota la cadena o sols per una part */
    /* 
        NOTA: segons el numero de elements, es mes eficient o no posar la validacio del check a fora o a dintre
    */

    // Definim variables locals 
    let llargArray=0
    let status = false
    
    // Obtenim el llarg del array
    llargArray = array1.length
    
    // Recorrem el array buscant coincidencies 
    for (let x=0; x<llargArray; x++){
        // Em de comparar cadenas de manera total o parcial
        if(check=="partial"){
            // Fem la comparacio parcial
        }else{}
    }

    // retornem el resultat obtingut
    return status
}

function sortArrayNumeric(array1){}
