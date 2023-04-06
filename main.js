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
// Criar lógica para ganhar pontos ao acertar os pares ou desvirar as cartas se errado. 

function startGame() {
    //Limpar cards-box
    const cardsbox = document.querySelector(".cards-box");
    while (cardsbox.firstChild) {
        cardsbox.removeChild(cardsbox.lastChild);
    }

    let res

    while (true) {
        res = prompt("Com quantas cartas você quer jogar?: ")
        if(res % 2 == 0 && res >= 4 && res <= 14) {
            break;
        }
    }

    // Repopula o array "parrotsLeft" usando o array parrotsTypes
    parrotsLeft = Array.from(parrotsTypes);
    
    while (res != 0) {
        generateCardPair()
        res -= 2;
    }

    const nodes = Array.from(cardsbox.childNodes);
    console.log(nodes)
    nodes.sort(comparador)
    
    nodes.forEach(node => {
       cardsbox.appendChild(node); 
    });
}

function comparador() { 
	return Math.random() - 0.5; 
}


function createCard(parrotType) {
    const el = document.createElement('template');
    el.innerHTML = element

    // Essa linha muda a source da imagem da parte de trás
    el.content.children[0].childNodes[1].childNodes[0].src = `src/${parrotType}.gif`
    document.querySelector('.cards-box').appendChild(el.content.children[0])
}

function generateCardPair() {
    // Sorteia um tipo de carta, cria um par e remove a opção do array parrotsLeft (onde estão as tipos de parrots disponiveis). 
    const index = Math.floor(Math.random() * parrotsLeft.length);
    createCard(parrotsLeft[index]);
    createCard(parrotsLeft[index]);

    parrotsLeft.splice(index, 1)
}


const parrotsTypes = ["unicornparrot", "tripletsparrot", "revertitparrot", "metalparrot", "fiestaparrot", "explodyparrot", "bobrossparrot"]
let parrotsLeft = []
const element = '<div class="card" onclick="virarCarta(this)"><div class="frente face"><img src="src/parrot.png" alt="parrot"></div><div class="atras face"><img src="src/metalparrot.gif" alt="metalparrot""></div></div>'