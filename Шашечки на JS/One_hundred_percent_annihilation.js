class One_hundred_percent_annihilation {
    constructor() {
        //Наше поле
        this.map = [];
        //Выбраная шашка
        this.checher = [ , ];
        //Цвет игрока
        this.color = [ , ];
        //Обратный цвет
        this.reversColor = [ , ];
        //Массив рубящих шашек
        this.ArrayChechers = [];
    }

    OhpaWork(map, checher) {
        this.ArrayChechers.splice(0, this.ArrayChechers.length);
        this.map = map;
        this.checher[0] = checher.x;
        this.checher[1] = checher.y;
        this.color[0] = checher.color;
        if(this.color == 2) {
            this.color[1] = 4;
            this.reversColor[0] = 1;
            this.reversColor[1] = 3;
        };
        if(this.color == 1) {
            this.color[1] = 3;
            this.reversColor[0] = 2;
            this.reversColor[1] = 4;
        };

        this.CoolTest();

        if(this.HeadTest()) {
            return true;
        } else {
            if(this.AllTest()) {
                return false
            };
            return true;
        }

    };

    HeadTest() {
        for(let k = 0; k < this.ArrayChechers.length; k += 2) {
            if( this.ArrayChechers[k] == this.checher.x &&
                this.ArrayChechers[k + 1] == this.checher.y ) {
                    return true;
                }
        }
    };

    AllTest() {
        for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if( this.map[i][j] == this.color[0] ||
                this.map[i][j] == this.color[1] ) {
                    for(let k = 0; k < this.ArrayChechers.length; k += 2) {
                        if( this.ArrayChechers[k] == j &&
                            this.ArrayChechers[k + 1] == i ) {
                                return true;
                            }
                    };
                }
        }};
        return false;
    };

    CoolTest() {
        for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if( this.map[i][j] == this.color[0] ||
                this.map[i][j] == this.color[1] ) {
                this.CoolChechers(i, j)
            }
        }}
    };

    CoolChechers(x, y) {
        //Вверх-влево
        if(x - 2 >= 0 && y - 2 >= 0) {
            if(this.map[x - 2][y - 2] == 0) {
                if( this.map[x - 1][y - 1] == this.reversColor[0] ||
                    this.map[x - 1][y - 1] == this.reversColor[1] ) {
                        this.ArrayChechers.push(x, y);
console.log('11111');
                        return 0;
                    }
            }
        };
        //Вверх-вправо
        if(x - 2 >= 0 && y + 2 < 8) {
            if(this.map[x - 2][y + 2] == 0) {
                if( this.map[x - 1][y + 1] == this.reversColor[0] ||
                    this.map[x - 1][y + 1] == this.reversColor[1] ) {
                        this.ArrayChechers.push(x, y);
console.log('22222');
                        return 0;
                    }
            }
        };
        //Вниз-влево
        if(x + 2 < 8 && y - 2 >= 0) {
            if(this.map[x + 2][y - 2] == 0) {
                if( this.map[x + 1][y - 1] == this.reversColor[0] ||
                    this.map[x + 1][y - 1] == this.reversColor[1] ) {
                        this.ArrayChechers.push(x, y);
console.log('33333');
                        return 0;
                    }
            }
        };
        //Вниз-вправо
        if(x + 2 < 8 && y + 2 >= 0) {
            if(this.map[x + 2][y + 2] == 0) {
                if( this.map[x + 1][y + 1] == this.reversColor[0] ||
                    this.map[x + 1][y + 1] == this.reversColor[1] ) {
                        this.ArrayChechers.push(x, y);
console.log('44444');
                        return 0;
                    }
            }
        };
    };



}