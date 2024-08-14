window.onload = function () {
    let day = new Date().getDay();
    let currentDay = '';
    //day = 0;

    if (day > 0 && day < 6) {
        currentDay = 'workday';
        cacheDay = 'weekends';
    } else {
        currentDay = 'weekends';
        cacheDay = 'workday';
    }

    function showMenu() {
        let showMenu = document.getElementsByClassName('show_menu')[0];
        let menu = '';

        showMenu.innerHTML = '';
        if (menu_object.length !== 0) {
            if (day > 0 && day < 6) {
                showMenu.innerHTML += '工作日菜单：<br>';
            } else {
                showMenu.innerHTML += '周末菜单：<br>';
            }

            menu = JSON.parse(menu_object.getItem(currentDay));

            if (menu !== null) {
                for (let index = 0; index < menu.length; index++) {
                    if (!menu[index]) {
                        menu.splice(index, 1);
                    }

                }

                if (menu.length !== 0) {
                    for (let index = 0; index < menu.length; index++) {
                        showMenu.innerHTML += menu[index] + '<br>';

                    }
                }
            }

        }

    }

    let file = document.getElementsByClassName('menu')[0];
    let file_name = document.getElementsByClassName('file_name')[0];
    let menu = '';
    let menu_object = window.localStorage;
    let menu_array = [];

    file_name.innerHTML = '尚未上传';

    file.addEventListener("change", function () {
        if (file.files[0].name) {
            file_name.innerHTML = file.files[0].name;

        }

        let reader = new FileReader();
        reader.addEventListener('load', function () {
            menu = this.result;

        });
        reader.readAsText(this.files[0]);
    });

    showMenu();

    let chooseButton = document.getElementsByClassName('choose')[0];
    let uploadButton = document.getElementsByClassName('upload')[0];
    let min = '';
    let max = '';
    let rand = '';
    let key = '';
    let result = '';
    min = 0;

    uploadButton.addEventListener('click', function () {
        // menu_object.clear();

        let upload = confirm('确认上传文件吗？');

        if (upload) {
            document.getElementsByClassName('what_to_eat')[0].value = '';
            menu = menu.replace(/\r\n/g, '\n');
            menu_array = menu.split(/\n/);

            let chooseDay = document.getElementById('choose_day');

            for (let index = 0; index < menu_array.length; index++) {
                if (!menu_array[index]) {
                    menu_array.splice(index, 1);
                }

            }

            if (chooseDay.value === 'workday') {
                menu_object.setItem('workday', JSON.stringify(menu_array));

            } else if (chooseDay.value === 'weekends') {
                menu_object.setItem('weekends', JSON.stringify(menu_array));
            }
        }

        showMenu();

    });

    chooseButton.addEventListener('click', function () {

        if (menu_object.length !== 0) {
            let Menu = '';
            let cacheMenu = '';

            Menu = JSON.parse(menu_object.getItem(currentDay));
            cacheMenu = JSON.parse(menu_object.getItem(cacheDay));

            if (Menu !== null) {
                max = Menu.length;
                if (!max) {
                    document.getElementsByClassName('what_to_eat')[0].value = '没东西吃啦';
                } else {
                    rand = Math.random() * (max - min) + min;
                    key = Math.floor(rand);//脚标
                    result = Menu[key];
                    document.getElementsByClassName('what_to_eat')[0].value = result;
                    Menu.splice(key, 1);
                    menu_object.setItem(currentDay, JSON.stringify(Menu));

                    if (cacheMenu !== null) {

                        for (let index = 0; index < cacheMenu.length; index++) {

                            if (result === cacheMenu[index]) {
                                cacheMenu.splice(index, 1);
                                menu_object.setItem(cacheDay, JSON.stringify(cacheMenu));
                                break;
                            }

                        }

                    }

                    showMenu();
                }
            } else {
                document.getElementsByClassName('what_to_eat')[0].value = '没东西吃啦';
            }


        } else {
            document.getElementsByClassName('what_to_eat')[0].value = '没东西吃啦';
        }
    });
}
