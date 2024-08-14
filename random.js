window.onload = function () {

    function showMenu() {
        let showMenu = document.getElementsByClassName('show_menu')[0];
        showMenu.innerHTML = '';

        let menu = JSON.parse(menu_object.getItem('Menu'));


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

    let file = document.getElementsByClassName('menu')[0];
    let uploadStatus = document.getElementsByClassName('upload_status')[0];
    let menu = '';
    let menu_object = window.localStorage;
    let menu_array = [];
    let uploadStatusMark = 'N';

    uploadStatus.innerHTML = uploadStatusMark;

    file.addEventListener("change", function () {

        let reader = new FileReader();
        reader.addEventListener('load', function () {
            menu = this.result;
            uploadStatus.innerHTML = 'Y';

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
        menu_object.clear();
        document.getElementsByClassName('what_to_eat')[0].value = '';
        menu_array = menu.split('\r\n');

        for (let index = 0; index < menu_array.length; index++) {
            if (!menu_array[index]) {
                menu_array.splice(index, 1);
            }

        }

        menu_object.setItem('Menu', JSON.stringify(menu_array));
        showMenu();

    });

    chooseButton.addEventListener('click', function () {
        let Menu = JSON.parse(menu_object.getItem('Menu'));
        max = Menu.length;
        if (!max) {
            document.getElementsByClassName('what_to_eat')[0].value = '没东西吃啦';
        } else {
            rand = Math.random() * (max - min) + min;
            key = Math.floor(rand);//脚标
            result = Menu[key];
            document.getElementsByClassName('what_to_eat')[0].value = result;
            Menu.splice(key, 1);
            menu_object.setItem('Menu', JSON.stringify(Menu));
            showMenu();
        }

    });
}