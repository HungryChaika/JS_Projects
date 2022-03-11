class Table {
    constructor() {
        this.tab = document.createElement('table');
        this.tab.setAttribute('id', 'tab');
    }
    //Создаёт и отправляет в HTML поле для игры
    createTab() {
        for(let i=1; i<=8; i++) {
            let stroka = this.cTr();
        for(let j=1; j<=8; j++) {
            let elem = this.cTd();
            elem.setAttribute('id', i + 'v' + j);
            this.tab.appendChild(stroka).appendChild(elem);
        }};
        document.querySelector('body').appendChild(this.tab);
    };
    //Создание строк и элементов в таблице
    cTr() { return document.createElement('tr') };
    cTd() { return document.createElement('td') };
    //Чистка игрового поля (полная), остаётся голая таблица
    clearField() {
        if(document.getElementById('tab') == null) { return null };
        for(let i=1; i<=8; i++) {
        for(let j=1; j<=8; j++) {
            let elem = document.getElementById(i + 'v' + j);
                elem.className = "";
                elem.innerHTML = "";
        }};
    };
    //Уничтожение поля
    destroyTab() { document.body.innerHTML = ''; };

}