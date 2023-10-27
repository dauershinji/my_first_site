/**
 * Возвращение списка переменных в логическом выражении
 * @param string - логическое выражение
 * @returns {*[]} - список переменных в логическом выражении
 */
function variable(string) {
    const array = Array.from(string);
    const alp = ["!", "&", "|"]
    let elements = []

    for (const element of array) {
        if (alp.indexOf(element) === -1) {
            elements.push(element)
        }
    }

    return elements
}

/**
 * Построение таблицы истинности
 * @param string - логическое выражение
 * @returns {{True: *[], False: *[]}} - таблица истинности
 */
function make_truth_table(string) {
    const array = variable(string)
    const save = string
    let truth_table = {
        "True": [],
        "False": []
    }

    for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 2; y++) {
            for (let z = 0; z < 2; z++) {
                for (let w = 0; w < 2; w++) {
                    string = save
                    string = string.replaceAll(array[0],x.toString())
                    string = string.replaceAll(array[1],y.toString())
                    string = string.replaceAll(array[2],z.toString())
                    string = string.replaceAll(array[3],w.toString())
                    let expression = eval(string)

                    if (expression === 1) {
                        let changes = truth_table["True"]
                        changes.push([x,y,z,w])
                        truth_table["True"] = changes
                    }

                    else {
                        let changes = truth_table["False"]
                        changes.push([x,y,z,w])
                        truth_table["False"] = changes
                    }
                }
            }
        }
    }

    return truth_table
}

/**
 * Получение ввода пользователя в HTML
 * @returns {*} - ввод
 */
function get_expression(){
    let input = document.getElementById("inputObject")
    return input.value
}

/**
 * Построение таблицы HTML
 */
function make_html_table() {
    const truth_table = make_truth_table(get_expression())
    document.querySelector(".center_table").innerHTML = `<table class="table"></table>`

    for (let key in truth_table) {
        let row = document.createElement("tr")
        row.innerHTML = `<td colspan="2">${key}</td>`
        document.querySelector(".center_table").appendChild(row)

        for (let i = 0; i < truth_table[key].length; i++) {
            let row = document.createElement("tr")
            row.innerHTML = `<td>${truth_table[key][i]}</td>`
            document.querySelector(".center_table").appendChild(row)
        }
    }
}