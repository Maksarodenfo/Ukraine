
function get_date_time() {
    let plus = 0; // Сколько времени прибавляем (+3 это время по Москве)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://worldtimeapi.org/api/timezone/Europe/London', false); // Делаем запрос по Лондону
    xhr.send(); // отправляем
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText ); // Если статус не равен 200, то выводим ошибку.
    } else {
        let time = xhr.responseText; // получаем текст ответа
        let z = JSON.parse(time).utc_datetime; // Получаем время utc
        let time1 = new Date(z).getTime(); // Переводим в timestamp
        let timestampPlus = time1 + (plus * 60 * 60 * 1000); // Время +3 часа. Если надо получить время UTC, то убираем просто параметр plus
        let timePlus = new Date(timestampPlus); // Переводим во время (Тут надо понимать, что система сама переведёт его в текущую временную зону
        let result = timePlus.toUTCString();  // Переводим в строку UTC;
        // console.log(result); // Выводим дату. 
        
        let dateN = new Date(timePlus.getFullYear(), timePlus.getMonth(), timePlus.getDate(), timePlus.getHours(), timePlus.getMinutes(), timePlus.getSeconds());
        let dateW = new Date(2022, 1, 24, 06, 00, 00)
        
        let date = dateN - dateW;
        
        day = Math.floor((dateN - dateW) / 1000 / 60 / 60 / 24);
        hour = Math.floor((dateN - dateW) / 1000 / 60 / 60) - day * 24;
        minutes = Math.floor((dateN - dateW) / 1000 / 60) - day * 24 * 60 - hour * 60;
        //result = timePlus.getFullYear();

        document.getElementById("date-time").innerHTML = day + " days, " + hour + " hours, " + minutes + " minutes";
        return day;
    }
}

get_date_time();
setInterval(() => {get_date_time();}, 1000);

