function virarCarta(el) {
    const frente = el.childNodes[0]
    const atras = el.childNodes[1]

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

    while (true) {
        qtdCartas = prompt("Com quantas cartas você quer jogar?: ")
        if(qtdCartas % 2 == 0 && qtdCartas >= 4 && qtdCartas <= 14) {
            break;
        }
    }

    cartasRestantes = qtdCartas

    // Repopula o array "parrotsLeft" usando o array parrotsTypes
    parrotsLeft = Array.from(parrotsTypes);
    
    while (qtdCartas != 0) {
        generateCardPair()
        qtdCartas -= 2;
    }

    // Embaralha as cartas.
    const nodes = Array.from(cardsbox.childNodes);
    nodes.sort(comparador)
    
    nodes.forEach(node => {
       cardsbox.appendChild(node); 
    });

    // reseta o número de jogadas e cartas selecionadas;
    jogadas = 0;
    selectedCards = []
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

function chooseCard(el) {
    if(selectedCards.length  == 2) return; // Caso já existam duas cartas selecionadas, faça nada.

    virarCarta(el);
    selectedCards.push(el)
    jogadas++;
    //console.log("Lenght selectedCards: " + selectedCards.length);
    //console.log("Selected cards: " + selectedCards)
    //console.log("Jogadas: " + jogadas);


    if(selectedCards.length == 2) { // Caso, depois de selecionar a carta nova, tenha 2 cartas selecionadas, faça os cálculos lógicos:
        const cardSrc1 = selectedCards[0].childNodes[1].childNodes[0].src
        const cardSrc2 = selectedCards[1].childNodes[1].childNodes[0].src
        
        if(cardSrc1 == cardSrc2) 
        {
            if(selectedCards[1] != selectedCards[0]) { // Apenas remove os listeners se o jogador clicou em 2 cartas distintas (Resolve o bug de clicar na mesma carta 2 vezes.)
                selectedCards[0].removeAttribute("onclick");
                selectedCards[1].removeAttribute("onclick");
                cartasRestantes -= 2;

                if(cartasRestantes == 0)
                {
                    console.log("Você ganhou!")
                    // vencer jogo!
                }
            }
            selectedCards = []

        } else {
            setTimeout( () => {
                virarCarta(selectedCards[0])
                virarCarta(selectedCards[1])
                selectedCards = [];
            }, 1000)
        }

        // Se for diferente, colocar um set-timeout para desvirar as duas e resetar o selected cards.

    }

}

// Project variables
let selectedCards = [];
let jogadas = 0;
let qtdCartas = 0;
let cartasRestantes = 0;

const parrotsTypes = ["unicornparrot", "tripletsparrot", "revertitparrot", "metalparrot", "fiestaparrot", "explodyparrot", "bobrossparrot"]
let parrotsLeft = []

const element = '<div class="card" onclick="chooseCard(this)"><div class="frente face"><img src="src/parrot.png" alt="parrot"></div><div class="atras face"><img src="src/metalparrot.gif" alt="metalparrot""></div></div>'