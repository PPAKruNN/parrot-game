function virarCarta() {
    console.log("virar carta.")
    const frente = document.querySelector(".frente")
    const atras = document.querySelector(".atras")

    if(atras.style.transform == "rotateY(0deg)"){
        virarParaFrente(frente, atras)
    } else {
        virarParaTras(frente,atras)
    }
    

}

function virarParaTras(frente, atras) {
    frente.style.transform = "rotateY(-180deg)"    
    atras.style.transform = "rotateY(0deg)"
}

function virarParaFrente(frente, atras) {
    frente.style.transform = "rotateY(0deg)"    
    atras.style.transform = "rotateY(180deg)"
}