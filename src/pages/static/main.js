let scoreAtk = 0;
let scoreDef = 0;
const board = document.querySelector("#board");
let attempt = 0;

const game = document.querySelector("#game");
let ready = false;

for(let i = 0; i < 10;i++){
    const tr = document.createElement("tr");
    for(let j = 0; j < 10; j++){
        const td = document.createElement("td");
        td.setAttribute("onclick", `tryCell(this)`);
        td.textContent = `${i}, ${j}`
        td.dataset.row = i; 
        td.dataset.col = j; 
        tr.appendChild(td);
    }

    board.appendChild(tr);
}


game.addEventListener("click", () => {
    const type = document.querySelector("#typeBattle");
    const battleShips = document.querySelectorAll(".marked");
    place(battleShips, type.value);
});

function resetBoard() {
    const cells = document.querySelectorAll('#board td');
    cells.forEach(cell => {
        cell.className = ''; 
    });
}

function tryCell(cell, e){
    if(cell.classList.contains("marked")){
        cell.classList.remove("marked");
    }else {
        cell.classList.add("marked");
    }

    if(ready){
        if(attempt < 3){
            if(cell.dataset.here){
                cell.classList.add("hit");
                cell.dataset.here = false;
                scoreAtk++;
            }else {
                alert(`Você errou, você tem ${3 - attempt} tentativas restantes`);
                scoreDef++;
            }
            attempt++;
        }else {
            ready = false;
            shipsIngame = [0, 0, 0, 0, 0];
            resetBoard();
            document.querySelectorAll("option").forEach(op => op.removeAttribute("disabled"));
            document.querySelector("h2").textContent = `Atacante consegui derrubar ${scoreAtk} navios VS Defesa consegui proteger ${scoreDef} \nProxima Rodadad coloque novamente os barcos`;
        }
    }
}

let shipsIngame = [
    0 ,0, 0, 0, 0
];

let totalShip = 0;
function place(battleShips, type){
    const ship = getSizeAndClass(type);

    for(let i  = 0; i < shipsIngame.length;i++){
        totalShip += shipsIngame[i];
    }
    if (battleShips.length !== ship.size ) {
        
        alert("Movimento errado consulte as regras");
        return;
    }else if(ship.class == "finish" && totalShip >= 11 || ready == true){
        alert("Sua jogada acabou");    
        resetBoard()
        return;
    }

    const rows = Array.from(battleShips).map(battleShip => parseInt(battleShip.dataset.row));
    const cols = Array.from(battleShips).map(battleShip => parseInt(battleShip.dataset.col));

    const allSameRow = rows.every(row => row === rows[0]);
    const allSameCol = cols.every(col => col === cols[0]);

    if (!(allSameRow || allSameCol)) {
        alert("Movimento Invalido")
        return;
    }
    if(shipsIngame[type - 1] < ship.limit && ship.limit != 0){
        battleShips.forEach(battle => {
            battle.classList.add(ship.class);
            battle.classList.remove("marked");
            battle.dataset.here = true;
            battle.dataset.type = type;
            shipsIngame[type - 1]++;
        });
        

        if(shipsIngame[type - 1] >= ship.limit){
            document.querySelectorAll("option")[type - 1].setAttribute("disabled", "");
            game.textContent = `Adicione Outros Tipos de Navios`;
            setTimeout(() => {
                game.textContent = `Jogar`;
            }, 5000);
        }
    }
}

function getSizeAndClass(type){
    if (type == 1) {
        return { size: 1, class: "sub", limit: 4};
    } else if (type == 2) {
        return { size: 2, class: "ship", limit: 3};
    } else if (type == 3) {
        return { size: 3, class: "shipmedio", limit: 2};
    } else if (type == 4) {
        return { size: 4, class: "shiptank", limit: 1};
    } else if (type == 5) {
        return { size: 1, class: "plane", limit: 1};
    } else if (type == 6) {
        return { size: 0, class: "finish", limit: 0};
    }
}