window.onload = function() {

var whiteButton = document.getElementById('Belaya');
var blackButton = document.getElementById('Chernaya');
var shapka = document.getElementById('shapka');
var arrayPosishion = [];
let Win = [false, null];

const ui = new UI();
const table = new Table();

//Создаёт шашку
function printChecher(color, x, y) {
    let img = document.createElement('img');
    let elem = document.getElementById(x + 'v' + y);
    switch(color) {
        case 'w': {
            img.src = "image/Белая шашка.png";
            elem.setAttribute('class', 'white');
        } break;
        case 'b': {
            img.src = "image/Чёрная шашка.png";
            elem.setAttribute('class', 'black');
        } break;
        case 'v': elem.setAttribute('class', 'void'); break;
        case '-': elem.setAttribute('class', 'crush'); break;
        case 'qw': {
            img.src = "image/Белая дамка.png";
            elem.setAttribute('class', 'Qwhite');
        } break;
        case 'qb': {
            img.src = "image/Чёрная дамка.png";
            elem.setAttribute('class', 'Qblack');
        } break;
    };
    img.setAttribute('id', 'image');
    return img;
};
//Расставляет шашки
function arrangeChechers() {
    if(document.getElementById('tab') == null) { table.clearField };
    let matrix = ui.matrixAbs;
    let wh = 0;
    let bl = 0;
    for(let i=1; i<=8; i++) {
        let vstroka = matrix[i - 1];
    for(let j=1; j<=8; j++) {
        let velem = vstroka[j - 1];
        let elem = document.getElementById(i + 'v' + j);
        if(velem == '1') { elem.appendChild(printChecher('w', i, j)); ++wh };
        if(velem == '2') { elem.appendChild(printChecher('b', i, j)); ++bl };
        if(velem == '0') { elem.appendChild(printChecher('v', i, j)) };
        if(velem == '-') { elem.appendChild(printChecher('-', i, j)) };
        if(velem == '3') { elem.appendChild(printChecher('qw', i, j)); ++wh };
        if(velem == '4') { elem.appendChild(printChecher('qb', i, j)); ++bl };
    }};
    if(wh == 0 || bl == 0) {
        Win[0] = true;
        if(wh == 0) { Win[1] = 'black' };
        if(bl == 0) { Win[1] = 'white' };
    };
};
//Очистить таблицу, отрисовать шашечки и переити к кликам, также тут табло победы
function paint() {
    table.clearField();
    arrangeChechers();
    if(Win[0]) {
        table.destroyTab();
        let logo = document.createElement('div');
        logo.append(Win[1] + '\nWIN!');
        logo.setAttribute('class', 'win');
        document.querySelector('body').appendChild(logo);
        return 0;
    };
    sortingFirstClicks();
};
//Общие действия при клике начальных кнопок
function clickButton() {
    shapka.remove();
    table.createTab();
    paint();
};
//Выбор стороны белых
function clickwhiteButton() {
    ui.clickStartButton('white');
    clickButton();
};
//Выбор стороны чёрных
function clickblackButton() {
    ui.clickStartButton('black');
    clickButton();
};
//Клики
whiteButton.onclick = clickwhiteButton;
blackButton.onclick = clickblackButton;
//Создаёт первые клики на все элементы
function sortingFirstClicks() {
    for(let i=1; i<=8; i++) {
    for(let j=1; j<=8; j++) {
        createOnclick(i, j);
    }}
};
//Создаёт вторые клики на все элементы
function sortingSecondClicks() {
    for(let i=1; i<=8; i++) {
    for(let j=1; j<=8; j++) {
        createSecondOnclick(i, j);
    }}
};
//Создаёт клик на один элемент (всё двигательное и перемещательное делается, после неё)
function createOnclick(i, j) {
    clearColor();
    let elem = document.getElementById(i + 'v' + j);
    if(elem.onclick) { elem.onclick = "" };
    elem.onclick = function() {
        let color = elem.className;
        let id = String(elem.id);
        let x = id[0];
        let y = id[2];
        let arguments = { vx: x, vy: y, vcolor: color };
        ui.describeChecher(arguments);
        if(ui.returnFirstclick) {
            if(ui.returnNextAttack) { addDopColor() };
            if(!ui.returnNextAttack && !ui.flagQueenForMain()) { addColor() };
            if(!ui.returnNextAttack && ui.flagQueenForMain()) { addQueenColor() };
            sortingSecondClicks();
            console.log('Красавчик, второй клик твой')
        } else {
            clearColor();
            console.log('Не перешёл ко второму клику')
        };
    };
};
//Создаёт второй клик, уже после первого
function createSecondOnclick(i, j) {
    let element = document.getElementById(i + 'v' + j);
    if(element.onclick) { element.onclick = "" };
    element.onclick = function() {
        let color = element.className;
        let id = String(element.id);
        let x = id[0];
        let y = id[2];
        let arguments = { vx: x, vy: y, vcolor: color };
        ui.describeClick(arguments);
        if(ui.returnSecondclick) {
            console.log('AZAZAZAZAZAZAZAZAZAZAZAZA');
            ui.changePlayers();
            paint();
            console.log('Красава рисуешь')
        } else {
            sortingFirstClicks();
            console.log('Ну как так, в конце второго клика')
        };
    };
};

function addColor() {
    let chX = ui.checher.x + 1;
    let chY = ui.checher.y + 1;
    document.getElementById(chX + 'v' + chY).style.backgroundColor = "blue";
    arrayPosishion.push(chX, chY);
    let arrM = ui.actionPlayer.move;
    let arrF = ui.actionPlayer.fight;
    let elX;
    let elY;
    if(arrF.length > 0) {
    for(let j=0; j<arrF.length; j=j+4) {
        elX = arrF[j]+1;
        elY = arrF[j+1]+1;
        document.getElementById(elX + 'v' + elY).style.backgroundColor = "green";
        arrayPosishion.push(elX, elY);
        elX = arrF[j+2]+1;
        elY = arrF[j+3]+1;
        document.getElementById(elX + 'v' + elY).style.backgroundColor = "red";
        arrayPosishion.push(elX, elY);
    } return 0 };
    if(arrM.length > 0) {
    for(let i=0; i<arrM.length; i=i+2) {
        elX = arrM[i]+1;
        elY = arrM[i+1]+1;
        document.getElementById(elX + 'v' + elY).style.backgroundColor = "green";
        arrayPosishion.push(elX, elY);
    }};
};

function clearColor() {
    if(arrayPosishion.length > 0) {
        for(let k=0; k<arrayPosishion.length; k=k+2) {
            let a = arrayPosishion[k];
            let b = arrayPosishion[k+1];
            document.getElementById(a + 'v' + b).style.backgroundColor = ""
        };
        arrayPosishion.splice(0, arrayPosishion.length);
    }
};

function addDopColor() {
    let arr = ui.actionNextAttack;
    let chX = ui.checher.x + 1;
    let chY = ui.checher.y + 1;
    document.getElementById(chX + 'v' + chY).style.backgroundColor = "blue";
    arrayPosishion.push(chX, chY);
    let elX;
    let elY;
    for(let h=0; h<arr.length; h=h+4) {
        chX = arr[h]+1; chY = arr[h+1]+1;
        document.getElementById(chX + 'v' + chY).style.backgroundColor = "red";
        arrayPosishion.push(chX, chY);
        elX = arr[h+2]+1; elY = arr[h+3]+1;
        document.getElementById(elX + 'v' + elY).style.backgroundColor = "green";
        arrayPosishion.push(elX, elY);
    };
};

function addQueenColor() {
    let params = ui.paramsQueenForMain(); //Здесь у нас координаты ходьюы и рубки вв виде объекта с 2 массивами
    let chX = params.cecher.x + 1;
    let chY = params.cecher.y + 1;
    let arrM = params.arrMove;
    let arrF = params.arrFight;
    let flag = true;
    document.getElementById(chX + 'v' + chY).style.backgroundColor = "blue";
    arrayPosishion.push(chX, chY);
    let elX;
    let elY;
    for(let i = 0; i < arrF.length; i++) {
        if(arrF[i][0]) {
            elX = arrF[i][0] + 1;
            elY = arrF[i][1] + 1;
            document.getElementById(elX + 'v' + elY).style.backgroundColor = "red";
            arrayPosishion.push(elX, elY);
            for(let j = 2; j < arrF[i].length - 1; j += 2) {
                elX = arrF[i][j] + 1;
                elY = arrF[i][j + 1] + 1;
                document.getElementById(elX + 'v' + elY).style.backgroundColor = "green";
                arrayPosishion.push(elX, elY);
                console.log(elX, elY)
            };
            flag = false;
        }
    };
    if(flag && arrM[0]) {
        for(let k = 0; k < arrM.length - 1; k += 2) {
                elX = arrM[k] + 1;
                elY = arrM[k + 1] + 1;
                document.getElementById(elX + 'v' + elY).style.backgroundColor = "green";
                arrayPosishion.push(elX, elY);
        }
    };

};


}