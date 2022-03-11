class UI {
    constructor() {
        //Матрица если первый игрок белый
        this.matrixTableW = [['-', 0,'-', 0,'-', 2,'-', 3 ],
                             [ 2,'-', 2,'-', 2,'-', 2,'-' ],
                             ['-', 2,'-', 0,'-', 0,'-', 2 ],
                             [ 0,'-', 0,'-', 0,'-', 0,'-' ],
                             ['-', 0,'-', 2,'-', 2,'-', 0 ],
                             [ 1,'-', 0,'-', 1,'-', 0,'-' ],
                             ['-', 2,'-', 1,'-', 1,'-', 0 ],
                             [ 0,'-', 1,'-', 1,'-', 1,'-' ]];
// " 1 "- white; (белые)
// " 2 "- black; (чёрные)
// " 0 "- void; (пустые)
// " - " (не используются)
        //Матрица если первый игрок чёрный
        this.matrixTableB = [['-', 1,'-', 1,'-', 1,'-', 1 ],
                             [ 1,'-', 1,'-', 1,'-', 1,'-' ],
                             ['-', 1,'-', 1,'-', 1,'-', 1 ],
                             [ 0,'-', 0,'-', 0,'-', 0,'-' ],
                             ['-', 0,'-', 0,'-', 0,'-', 0 ],
                             [ 2,'-', 2,'-', 2,'-', 2,'-' ],
                             ['-', 2,'-', 2,'-', 2,'-', 2 ],
                             [ 2,'-', 2,'-', 2,'-', 2,'-' ]];


        this.matrixAbs; //Смотри метод ui.spotMatrix(color) {}; Матрица на игру
        this.movePlayer = 1; //Смотри метод ui.whoMove(color) {}; Игрок который ходит
        this.player1; //Смотри метод ui.whoPlayers(color) {}; Цвет первого игрока
        this.player2; //Смотри метод ui.whoPlayers(color) {}; Цвет второго игрока

        this.checher = { x: "", y: "", color: "" }; //Шашка на поле
        this.secondClick = { x: "", y: "", color: "" }; //Второй клик по полю
        this.posichionNextAttack = { x: "", y: "", color: "" }; //Позиция шашки для последующей атаки

        this.returnFirstclick; //Переменная перехода ко второму клику
        this.returnSecondclick; //Переменная перехода от второго клика и дальше
        this.returnNextAttack; //Переменная нескольких атак подряд

        this.actionPlayer = { fight: [], move: [] }; //Массив действий игрока
        this.actionNextAttack = []; //Массив действий следующей атаки

        this.queen = new Queen(); //Класс дамок
//        this.Ohpa = new One_hundred_percent_annihilation(); //Класс стопроцентной рубки

    }
    //Выбирает матрицу на дальнейшую игру
    spotMatrix(color) {
        if(color == 'white') { this.matrixAbs = this.matrixTableW };
        if(color == 'black') { this.matrixAbs = this.matrixTableB };
    };
    //Выбирает игроков на дальнейшую игру
    whoPlayerS(color) {
        this.player1 = (color == 'white') ? 1 : 2;
        this.player2 = (color == 'black') ? 1 : 2;
    };
    //Объединяет для удобства первые 3 метода (для клика на первые кнопки)
    clickStartButton(param) {
        this.spotMatrix(param);
        this.whoPlayerS(param);
    };
    //Передаёт с игрового поля данные о шашке к виртуальной шашке
    describeChecher(parametres) {
        this.queen.returnQueen = false;
        this.zeroingChecher();
        if(parametres.vcolor == 'white') { this.checher.color = 1 };
        if(parametres.vcolor == 'black') { this.checher.color = 2 };
        if(parametres.vcolor == 'void') { this.checher.color = 0 };
        if(parametres.vcolor == 'crush') { this.checher.color = '-' };
        if(parametres.vcolor == 'Qwhite') { this.checher.color = '3'; this.queen.returnQueen = true };
        if(parametres.vcolor == 'Qblack') { this.checher.color = '4'; this.queen.returnQueen = true };
        if(this.comebackChecher() && !this.queen.returnQueen) {
            this.returnFirstclick = false;
            console.log('Абосерился на первом клике');
            return 0;
        };
        this.checher.x = --parametres.vx; //Координаты шашки по строкам от 0 до 7
        this.checher.y = --parametres.vy; ////Координаты шашки по элементам от 0 до 7
/*
        let bool = this.Ohpa.OhpaWork(this.matrixAbs, this.checher);
        if(!bool) {
            this.returnFirstclick = false;
            return 0;
        };

        console.log(bool);
*/
// ------------------------------------------------------------------------------------------
// Следующая атака дамки

        if(this.queen.flagNextAttack) {
            if( this.checher.x == this.queen.cecherNextAttack[0] &&
                this.checher.y == this.queen.cecherNextAttack[1] ) {
                    this.returnFirstclick = true;
                    return 0;
                } else {
                    this.returnFirstclick = false;
                    return 0;
                }
        };

// ------------------------------------------------------------------------------------------
// ДАМКА

        if(this.queen.returnQueen) {
            let col = this.queen.changeColor(this.checher.color, this.movePlayer);
            if(col) {
                this.returnFirstclick = false;
                return 0;
            };
            let info = {
                table: this.matrixAbs,
                colorMove: this.movePlayer,
                coordX: this.checher.x,
                coordY: this.checher.y
            };

            this.queen.transferInfo(info);
            this.queen.usingFirst();

            if(this.queen.flagFirstClick) {
                this.returnFirstclick = false;
                return 0;
            };
            this.returnFirstclick = true;
            console.log('АЛЯ ВУАЛЯ');
            return 0;
        };

// ------------------------------------------------------------------------------------------

        //Очистка массива дейстий
        this.actionPlayer.move.splice(0, this.actionPlayer.move.length);
        this.actionPlayer.fight.splice(0, this.actionPlayer.fight.length);
        //Последующая возможная рубка
        if(this.returnNextAttack) {
            if( this.checher.x == this.posichionNextAttack.x &&
                this.checher.y == this.posichionNextAttack.y &&
                this.checher.color == this.posichionNextAttack.color ) {
                    this.returnFirstclick = true;
                    return 0;
            } else {
                console.log('12345')
                this.returnFirstclick = false;
                return 0;
            }
        };
        //Проверяем у первого игрока
        if(this.player1 == this.movePlayer) {
            this.testPlayer1();
            if(this.actionPlayer.move.length == 0 && this.actionPlayer.fight.length == 0) {
                this.returnFirstclick = false;
                return 0;
            } else {
                this.returnFirstclick = true;
                return 0;
            };
        };
        //Проверяем у второго игрока
        if(this.player2 == this.movePlayer) {
            this.testPlayer2();
            if(this.actionPlayer.move.length == 0 && this.actionPlayer.fight.length == 0) {
                this.returnFirstclick = false;
                return 0;
            } else {
                this.returnFirstclick = true;
                return 0;
            };
        };
    };
    //Передать с игрового поля данные о втором клике в виртуалке;
    describeClick(parametres) {
        this.zeroingClick();
        if(parametres.vcolor == 'void') { this.secondClick.color = false }
            else { this.secondClick.color = true };
        if(this.secondClick.color) {
            this.returnSecondclick = false;
            return 0;
        };
        this.secondClick.x = --parametres.vx;
        this.secondClick.y = --parametres.vy;

// ------------------------------------------------------------------------------------------
// ДАМКА И ЕЁ СЛЕДУЮЩАЯ РУБКА
        if(this.queen.returnQueen) {
            let gen = {
                coordX: this.secondClick.x,
                coordY: this.secondClick.y,
            };
            this.queen.transferGen(gen);
            this.queen.usingSecond();
            
            if(this.queen.overChecher.length > 0) {
                this.matrixAbs[this.secondClick.x][this.secondClick.y] = this.matrixAbs[this.checher.x][this.checher.y];
                this.matrixAbs[this.queen.overChecher[0]][this.queen.overChecher[1]] = 0;
                this.matrixAbs[this.checher.x][this.checher.y] = 0
                this.returnSecondclick = true;
                this.queen.NextAttack(this.secondClick.x, this.secondClick.y);
                return 0;
            };
            if(this.queen.flagSecondClickMove) {
                this.matrixAbs[this.secondClick.x][this.secondClick.y] = this.matrixAbs[this.checher.x][this.checher.y];
                this.matrixAbs[this.checher.x][this.checher.y] = 0;
                this.returnSecondclick = true;
                return 0;
            };
            this.returnSecondclick = false;
            return 0;
        };
// ------------------------------------------------------------------------------------------

        //Попытка будующей рубки
        if(this.returnNextAttack) {
            for(let k=0; k<this.actionNextAttack.length; k=k+4) {
            if( this.secondClick.x == this.actionNextAttack[k] &&
                this.secondClick.y == this.actionNextAttack[k+1] ) {
                    console.log(this.actionNextAttack[k], this.actionNextAttack[k+1])
                    this.matrixAbs[this.secondClick.x][this.secondClick.y] = this.movePlayer;
                    this.matrixAbs[this.checher.x][this.checher.y] = 0;
                    this.matrixAbs[this.actionNextAttack[k+2]][this.actionNextAttack[k+3]] = 0;
                    this.returnSecondclick = true;
                    this.transformationQueen();
                    this.nextAttack();
                    return 0;
            }}
        };
        //Попытка рубки
        if(this.actionPlayer.fight.length > 0) {
            for(let j=0; j<this.actionPlayer.fight.length; j=j+4) {
            if( this.secondClick.x == this.actionPlayer.fight[j] &&
                this.secondClick.y == this.actionPlayer.fight[j+1] ) {
                    console.log(this.actionPlayer.fight[j], this.actionPlayer.fight[j+1])
                    this.matrixAbs[this.secondClick.x][this.secondClick.y] = this.movePlayer;
                    this.matrixAbs[this.checher.x][this.checher.y] = 0;
                    this.matrixAbs[this.actionPlayer.fight[j+2]][this.actionPlayer.fight[j+3]] = 0;
                    this.returnSecondclick = true;
                    this.transformationQueen();
                    this.nextAttack();
                    return 0;
            }}
            this.returnSecondclick = false;
            return 0;
        };
        //Попытки хода
        if(this.actionPlayer.move.length > 0) {
            for(let i=0; i<this.actionPlayer.move.length; i=i+2) {
            if( this.secondClick.x == this.actionPlayer.move[i] &&
                this.secondClick.y == this.actionPlayer.move[i+1] ) {
                    console.log(this.actionPlayer.move[i], this.actionPlayer.move[i+1])
                    this.matrixAbs[this.secondClick.x][this.secondClick.y] = this.movePlayer;
                    this.matrixAbs[this.checher.x][this.checher.y] = 0;
                    this.returnSecondclick = true;
                    this.transformationQueen();
                    return 0;
            }}
        };

        this.returnSecondclick = false;

    };
   //Передаёт правильная ли шашка была выбрана в этот ход
    comebackChecher() {
        if(this.checher.color == this.movePlayer) {
            return false
        } else {
            return true
        }
    };
    //Обнуляет параметры шашки
    zeroingChecher() {
        this.checher.x = "";
        this.checher.y = "";
        this.checher.color = "";
    };
    //Обнуляет параметры второго клика
    zeroingClick() {
        this.secondClick.x = "";
        this.secondClick.y = "";
        this.secondClick.color = "";
    };
    //Обнуляет параметры будующего клика
    zeroingNextAttack() {
        this.posichionNextAttack.x = "";
        this.posichionNextAttack.y = "";
        this.posichionNextAttack.color = "";
    };
    //ИГРОКИ
    //Проверка первого игрока (обычные ходы и рубки)
    testPlayer1() {
        //Проверки движений
        //Движение ВВЕРХ-ВЛЕВО
        if(this.checher.x - 1 >= 0 && this.checher.y - 1 >= 0) {
            if(this.matrixAbs[this.checher.x - 1][this.checher.y - 1] == 0) {
                this.actionPlayer.move.push(this.checher.x - 1, this.checher.y - 1)
                console.log('движ вверх влево')
            }
        };
        //Движение ВВЕРХ-ВПРАВО
        if(this.checher.x - 1 >= 0 && this.checher.y + 1 < 8) {
            if(this.matrixAbs[this.checher.x - 1][this.checher.y + 1] == 0) {
                this.actionPlayer.move.push(this.checher.x - 1, this.checher.y + 1)
                console.log('движ вверх вправо')
            }
        };
        //Атаки
        this.atackk(this.checher, this.actionPlayer.fight);
    };
    //Проверка Второго игрока (обычные ходы и рубки)
    testPlayer2() {
        //Проверки движений
        //Движение ВНИЗ-ВЛЕВО
        if(this.checher.x + 1 < 8 && this.checher.y - 1 >= 0) {
            if(this.matrixAbs[this.checher.x + 1][this.checher.y - 1] == 0) {
                this.actionPlayer.move.push(this.checher.x + 1, this.checher.y - 1)
                console.log('движ вниз влево')
            }
        };
        //Движение ВНИЗ-ВПРАВО
        if(this.checher.x + 1 < 8 && this.checher.y + 1 < 8) {
            if(this.matrixAbs[this.checher.x + 1][this.checher.y + 1] == 0) {
                this.actionPlayer.move.push(this.checher.x + 1, this.checher.y + 1)
                console.log('движ вниз вправо')
            }
        };
        //Атаки
        this.atackk(this.checher, this.actionPlayer.fight);
    };
    //Проверки рубки
    atackk(chech, arr) {
        //Атака ВВЕРХ-ВЛЕВО
        if(chech.x - 2 >= 0 && chech.y - 2 >= 0) {
            let FuL = this.matrixAbs[chech.x - 2][chech.y - 2];
            if(FuL == 0 && this.matrixAbs[chech.x - 1][chech.y - 1] == this.oppositePlayer(this.matrixAbs[chech.x - 1][chech.y - 1])) {
                arr.push( chech.x - 2, chech.y - 2, chech.x - 1, chech.y - 1 )
                console.log('атак вверх влево')
            };
        };
        //Атака ВВЕРХ-ВПРАВО
        if(chech.x - 2 >= 0 && chech.y + 2 < 8) {
            let FuR = this.matrixAbs[chech.x - 2][chech.y + 2];
            if(FuR == 0 && this.matrixAbs[chech.x - 1][chech.y + 1] == this.oppositePlayer(this.matrixAbs[chech.x - 1][chech.y + 1])) {
                arr.push( chech.x - 2, chech.y + 2, chech.x - 1, chech.y + 1 )
                console.log('атак вверх вправо')
            };
        };
        //Атака ВНИЗ-ВЛЕВО
        if(chech.x + 2 < 8 && chech.y - 2 >= 0) {
            let FdL = this.matrixAbs[chech.x + 2][chech.y - 2];
            if(FdL == 0 && this.matrixAbs[chech.x + 1][chech.y - 1] == this.oppositePlayer(this.matrixAbs[chech.x + 1][chech.y - 1])) {
                arr.push( chech.x + 2, chech.y - 2, chech.x + 1, chech.y - 1 )
                console.log('атак вниз влево')
            };
        };
        //Атака ВНИЗ-ВПРАВО
        if(chech.x + 2 < 8 && chech.y + 2 < 8) {
            let FdR = this.matrixAbs[chech.x + 2][chech.y + 2];
            if(FdR == 0 && this.matrixAbs[chech.x + 1][chech.y + 1] == this.oppositePlayer(this.matrixAbs[chech.x + 1][chech.y + 1])) {
                arr.push( chech.x + 2, chech.y + 2, chech.x + 1, chech.y + 1 )
                console.log('атак вниз вправо')
            };
        };
    };
    //Смена игроков
    changePlayers() {
        if(!this.returnNextAttack && !this.queen.flagNextAttack) { this.movePlayer = (this.movePlayer == 1) ? 2 : 1 }
    };
    //Вывод противоположного игрока
    oppositePlayer(col) {
        if(this.checher.color == 1 && col < 3) { return 2 };
        if(this.checher.color == 2 && col < 3) { return 1 };
        if(this.checher.color == 1 && col == 4) { return 4 };
        if(this.checher.color == 2 && col == 3) { return 3 };
    };
    //Проверка на последующие рубки
    nextAttack() {
        this.zeroingNextAttack();
        this.actionNextAttack.splice(0, this.actionNextAttack.length);
        this.atackk(this.secondClick, this.actionNextAttack);
        if(this.actionNextAttack.length > 0) {
            this.returnNextAttack = true;
            this.posichionNextAttack.x = this.secondClick.x;
            this.posichionNextAttack.y = this.secondClick.y;
            this.posichionNextAttack.color = this.checher.color;
            console.log('Та на которую тыкнуть ', this.posichionNextAttack.x, this.posichionNextAttack.y)
            console.log('Следующая ', this.actionNextAttack)
        } else {
            this.returnNextAttack = false
            console.log('Нет следующей атаки')
        };
    };
    //Превращение в дамку
    transformationQueen() {
        if(this.player1 == 1) {
            if(this.secondClick.x == 0 && this.checher.color == 1){
                this.matrixAbs[this.secondClick.x][this.secondClick.y] = 3;
            };
            if(this.secondClick.x == 7 && this.checher.color == 2){
                this.matrixAbs[this.secondClick.x][this.secondClick.y] = 4;
            };
        } else {
            if(this.secondClick.x == 0 && this.checher.color == 2){
                this.matrixAbs[this.secondClick.x][this.secondClick.y] = 4;
            };
            if(this.secondClick.x == 7 && this.checher.color == 1){
                this.matrixAbs[this.secondClick.x][this.secondClick.y] = 3;
            };
        };
    };

    //Возвращение значения дамки (это дамка или нет)
    flagQueenForMain() {
        return this.queen.returnQueen;
    };

    paramsQueenForMain() {

        /*      Обычные ходы и рубка
        this.fightArray = [ [], [], [], [] ]; //массив атаки
        this.goArray = []; //Массив ходов
        */

        /*      Следубщая рубка
        this.overChecher = []; //Шашка, которая пойдёт на рубку
        this.arrNextAttack = [ [], [], [], [] ]; //Массив координат следующей атаки
        this.cecherNextAttack = []; //Массив координат ходящей шашки следующей рубки
        */

        return Object = {
            cecher: this.checher,
            arrMove: this.queen.goArray,
            arrFight: this.queen.fightArray,
        }
    };

};