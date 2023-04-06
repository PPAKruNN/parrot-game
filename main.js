function virarCarta(el) {
    const frente = el.childNodes[0]
    const atras = el.childNodes[1]

    console.log(frente)
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

// Função para gerar os HTMLs dos pássaros e adicioná-los ao DOM.
// Função para embaralhar o DOM.
// Função para descobrir qual o parrot selecionado quando clicar na carta.

function createCard(parrotType) {
    const el = document.createElement('template');
    el.innerHTML = element

    // Essa linha muda a source da imagem da parte de trás
    el.content.children[0].childNodes[1].childNodes[0].src = `src/${parrotType}.gif`
    document.querySelector('.cards-box').appendChild(el.content.children[0])
}

function generateCard() {
    const index = Math.floor(Math.random() * parrotsLeft.length);
    createCard(parrotsLeft[index]);
    createCard(parrotsLeft[index]);
    
    console.log(parrotsLeft)
    parrotsLeft.splice(index, 1)
    console.log(parrotsLeft)
}

const parrotsLeft = ["unicornparrot", "tripletsparrot", "revertitparrot", "metalparrot", "fiestaparrot", "explodyparrot", "bobrossparrot"]

const element = '<div class="card" onclick="virarCarta(this)"><div class="frente face"><img src="src/parrot.png" alt="parrot"></div><div class="atras face"><img src="src/metalparrot.gif" alt="metalparrot""></div></div>'