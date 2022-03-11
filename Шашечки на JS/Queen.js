class Queen {
    constructor() {
        
        this.matr; //Поле из UI
        this.color; //Цвет ходящего игрока
        this.colorReverse = []; //Обратный цвет
        this.x; //Строка шашки
        this.y; //Позиция шашки

        this.fightArray = [ [], [], [], [] ]; //массив атаки
        this.goArray = []; //Массив ходов

        this.returnQueen; //Проверка: дамка или нет
        this.flagFirstClick; //Проверка перого клика для UI
        this.flagSecondClickMove; //Проверка двежения второго клика для UI
        this.flagSecondClickFight; //Проверка рубки второго клика для UI
        this.flagNextAttack = false; //Проверка следующей рубки

        this.overChecher = []; //Шашка, которая пойдёт на рубку
        this.arrNextAttack = [ [], [], [], [] ]; //Массив координат следующей атаки
        this.cecherNextAttack = []; //Массив координат ходящей шашки следующей рубки

    }

    usingFirst() {
        this.clearArr();
        this.goMove();
        this.fightMove();
        this.testMoveOn();
    };

    //Очистка действий
    clearArr() {
        this.goArray.splice(0, this.goArray.length);
        this.fightArray[0].splice(0, this.fightArray[0].length);
        this.fightArray[1].splice(0, this.fightArray[1].length);
        this.fightArray[2].splice(0, this.fightArray[2].length);
        this.fightArray[3].splice(0, this.fightArray[3].length);
        this.overChecher.splice(0, this.overChecher.length);
    };

    //Рубка
    fightMove() {
        //Вверх-Влево
        let x = this.x;
        let y = this.y;
        while(x-2>=0 && y-2>=0) {
            if(this.matr[x-1][y-1] == 0) {
                --x; --y; continue;
            };
            if(this.matr[x-1][y-1] == this.color) { break };
            if( this.matr[x-1][y-1] == this.colorReverse[0] &&
                this.matr[x-2][y-2] != 0 ) { break };
            if( this.matr[x-1][y-1] == this.colorReverse[1] &&
                this.matr[x-2][y-2] != 0 ) { break };
            if((this.matr[x-1][y-1] == this.colorReverse[0] ||
                this.matr[x-1][y-1] == this.colorReverse[1]) &&
                this.matr[x-2][y-2] == 0 ) {
                    this.fightArray[0].push(x-1, y-1, x-2, y-2);
                    x = x - 3;
                    y = y - 3;
                    while( x>=0 && y>=0 ) {
                        if(this.matr[x][y] == 0) {
                            this.fightArray[0].push(x, y);
                            --x; --y;
                        } else break;
                    };
                    break;
            };
        };
        //Вверх-Вправо
        x = this.x;
        y = this.y;
        while(x-2>=0 && y+2<8) {
            if(this.matr[x-1][y+1] == 0) {
                --x; ++y; continue;
            };
            if(this.matr[x-1][y+1] == this.color) { break };
            if((this.matr[x-1][y+1] == this.colorReverse[0] ||
                this.matr[x-1][y+1] == this.colorReverse[1]) &&
                this.matr[x-2][y+2] != 0 ) { break };
            if((this.matr[x-1][y+1] == this.colorReverse[0] ||
                this.matr[x-1][y+1] == this.colorReverse[1]) &&
                this.matr[x-2][y+2] == 0 ) {
                    this.fightArray[1].push(x-1, y+1, x-2, y+2);
                    x = x - 3;
                    y = y + 3;
                    while( x>=0 && y<8 ) {
                        if(this.matr[x][y] == 0) {
                            this.fightArray[1].push(x, y);
                            --x; ++y;
                        } else break;
                    };
                    break;
            };
        };
        //Вниз-Влево
        x = this.x;
        y = this.y;
        while(x+2<8 && y-2>=0) {
            if(this.matr[x+1][y-1] == 0) {
                ++x; --y; continue;
            };
            if(this.matr[x+1][y-1] == this.color) { break };
            if((this.matr[x+1][y-1] == this.colorReverse[0] ||
                this.matr[x+1][y-1] == this.colorReverse[1]) &&
                this.matr[x+2][y-2] != 0 ) { break };
            if((this.matr[x+1][y-1] == this.colorReverse[0] ||
                this.matr[x+1][y-1] == this.colorReverse[1]) &&
                this.matr[x+2][y-2] == 0 ) {
                    this.fightArray[2].push(x+1, y-1, x+2, y-2);
                    x = x + 3;
                    y = y - 3;
                    while( x<8 && y>=0 ) {
                        if(this.matr[x][y] == 0) {
                            this.fightArray[2].push(x, y);
                            ++x; --y;
                        } else break;
                    };
                    break;
            };
        };
        //Вниз-Вправо
        x = this.x;
        y = this.y;
        while(x+2<8 && y+2<8) {
            if(this.matr[x+1][y+1] == 0) {
                ++x; ++y; continue;
            };
            if(this.matr[x+1][y+1] == this.color) { break };
            if((this.matr[x+1][y+1] == this.colorReverse[0] ||
                this.matr[x+1][y+1] == this.colorReverse[1]) &&
                this.matr[x+2][y+2] != 0 ) { break };
            if((this.matr[x+1][y+1] == this.colorReverse[0] ||
                this.matr[x+1][y+1] == this.colorReverse[1]) &&
                this.matr[x+2][y+2] == 0 ) {
                    this.fightArray[3].push(x+1, y+1, x+2, y+2);
                    x = x + 3;
                    y = y + 3;
                    while( x<8 && y<8 ) {
                        if(this.matr[x][y] == 0) {
                            this.fightArray[3].push(x, y);
                            ++x; ++y;
                        } else break;
                    };
                    break;
            };
        };
    };

    //Ходьба
    goMove() {
        //Вверх-Влево
        let x = this.x;
        let y = this.y;
        while(x-1>=0 && y-1>=0) {
            if(this.matr[x-1][y-1] == 0) {
                this.goArray.push(x-1, y-1);
                --x; --y;
            } else break;
        };
        //Вверх-Вправо
        x = this.x;
        y = this.y;
        while(x-1>=0 && y+1<8) {
            if(this.matr[x-1][y+1] == 0) {
                this.goArray.push(x-1, y+1);
                --x; ++y;
            } else break;
        };
        //Вниз-Влево
        x = this.x;
        y = this.y;
        while(x+1<8 && y-1>=0) {
            if(this.matr[x+1][y-1] == 0) {
                this.goArray.push(x+1, y-1);
                ++x; --y;
            } else break;
        };
        //Вниз-Вправо
        x = this.x;
        y = this.y;
        while(x+1<8 && y+1<8) {
            if(this.matr[x+1][y+1] == 0) {
                this.goArray.push(x+1, y+1);
                ++x; ++y;
            } else break;
        };
    };

    //Следующая атака
    NextAttack(s, e) {
        this.clearArr();
        let flag = false;
        this.x = s;
        this.y = e;
        this.fightMove();
        for(let i=0; i<4; i++) {
            if(this.fightArray[i].length > 0) {
                flag = true;
                break;
            }
        };
        if(flag) {
            this.flagNextAttack = true;
            this.cecherNextAttack[0] = s;
            this.cecherNextAttack[1] = e;
            for(let j=0; j<4; j++) {
                this.arrNextAttack[j] = this.fightArray[j].slice(0);
            };
        } else {
            this.flagNextAttack = false;
            this.cecherNextAttack.splice(0, this.cecherNextAttack.length);
            this.arrNextAttack[0].splice(0, this.arrNextAttack[0].length);
            this.arrNextAttack[1].splice(0, this.arrNextAttack[1].length);
            this.arrNextAttack[2].splice(0, this.arrNextAttack[2].length);
            this.arrNextAttack[3].splice(0, this.arrNextAttack[3].length);
        };
    };

    //Это уже второй клик
    usingSecond() {
        if(this.flagNextAttack) {
            for(let h=0; h<4; h++) {
                this.fightArray[h] = this.arrNextAttack[h].slice(0);
            }
        };
        for(let k=0; k<4; k++) {
            let arr = this.fightArray[k];
            if(arr.length == 0) { continue };
        for(let j=2; j<arr.length; j=j+2) {
            if( this.x == arr[j] &&
                this.y == arr[j+1] ) {
                    this.overChecher[0] = arr[0];
                    this.overChecher[1] = arr[1];
                    return 0;
                }
        }};
        this.flagSecondClickMove = false;
        if(this.flagSecondClickFight) { return 0 }
        for(let i=0; i<this.goArray.length; i=i+2) {
            if( this.x == this.goArray[i] &&
                this.y == this.goArray[i+1] ) {
                    this.flagSecondClickMove = true;
                    return 0;
                }
        };
    };

    //Передача данных из UI (первый клик)
    transferInfo(information) {
        this.matr = information.table;
        this.color = information.colorMove;
        this.x = information.coordX;
        this.y = information.coordY;
        this.colorReverse[0] = (this.color == '2') ? '1' : '2';
        this.colorReverse[1] = (this.color == '2') ? '3' : '4';
    };
    //Передача данных из UI (второй клик)
    transferGen(information) {
        this.x = information.coordX;
        this.y = information.coordY;
    };
    //Проверка цвета дамки для UI
    changeColor(color, player) {
        if(player == 1) {
            if(color == 3) { return false }
            else { return true }
        } else {
            if(color == 4) { return false }
            else { return true }
        }
    };
    //Проверка на заполненность массивов действий для UI
    testMoveOn() {
        this.flagFirstClick = false;
        if(this.goArray.length == 0 && this.fightArray.length == 0) {
            flagFirstClick = true
        };
        this.flagSecondClickFight = false;
        for(let i=0; i<4; i++) {
            if(this.fightArray[i].length > 0) {
                this.flagSecondClickFight = true;
                break;
            };
        }
    };

}