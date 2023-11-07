/**
 * Переработка логического выражения в синтаксис JS
 * @param string - входное логическое выражение
 * @returns {string} - переработанное логическое выражение
 */
function input_rework(string) {
    if (string.indexOf(" ") !== -1) { // " " -> ""
        string = string.replaceAll(" ", "");
    }

    if (string.indexOf("≡") !== -1) { // "≡" -> "==="
        string = string.replaceAll("≡", "===")
    }

    if (string.indexOf("¬") !== -1) { // "¬" -> "!"
        string = string.replaceAll("¬", "!")
    }

    if (string.indexOf("∧") !== -1) { // "∧" -> "&&"
        string = string.replaceAll("∧", "&&")
    }

    if (string.indexOf("∨") !== -1) { // "∨" -> "||"
        string = string.replaceAll("∨", "||")
    }

    if (string.indexOf("→") !== -1) { // "→" -> "!a||b"
        while (string.indexOf("→") !== -1) {
            let index = string.indexOf("→")

            if (string[index-1] !== ")") {
                string = string.slice(0, index-1) + "!" + string.slice(index-1)
                string = string.replace("→", "||")
            } else {
                let counter = 0
                for (let second_index = index-1; second_index >= 0; second_index--) {

                    if (string[second_index] === ")") {
                        counter += 1
                    } else if (string[second_index] === "(") {
                        counter -= 1
                    }

                    if (counter === 0) {
                        index = second_index
                        break
                    }
                }

                if (index === 0) {
                    string = "!" + string
                } else {
                    string = string.slice(0, index) + "!" + string.slice(index)
                }

                string = string.replace("→", "||")
            }
        }
    }

    return string
}

/**
 * Возвращение списка переменных в логическом выражении
 * @param string - логическое выражение
 * @returns {*[]} - список переменных в логическом выражении
 */
function get_expression_var(string) {
    const array = Array.from(string);
    const alp = ["!", "&", "|", "(", ")", "="]
    let elements = []

    for (const element of array) {
        if (alp.indexOf(element) === -1) {
            elements.push(element)
        }
    }

    return elements
}

/**
 * Построения таблицы с четырьмя переменными
 * @param string - логическое выражение
 * @param array - список переменных
 * @returns {{True: *[], False: *[]}}
 */
function four_var(string, array) {
    const save = string
    let truth_table = {
        "True": [array],
        "False": [array]
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

                    if (expression === 1 || expression === true) {
                        let changes = truth_table["True"]
                        changes.push([x,y,z,w])
                        truth_table["True"] = changes
                    } else {
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
 * Построение таблицы истинности с тремя переменными
 * @param string - логическое выражение
 * @param array - список переменных
 * @returns {{True: *[], False: *[]}}
 */
function three_var(string, array) {
    const save = string
    let truth_table = {
        "True": [array],
        "False": [array]
    }

    for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 2; y++) {
            for (let z = 0; z < 2; z++) {
                string = save
                string = string.replaceAll(array[0],x.toString())
                string = string.replaceAll(array[1],y.toString())
                string = string.replaceAll(array[2],z.toString())
                let expression = eval(string)

                if (expression === 1 || expression === true) {
                    let changes = truth_table["True"]
                    changes.push([x,y,z])
                    truth_table["True"] = changes
                } else {
                    let changes = truth_table["False"]
                    changes.push([x,y,z])
                    truth_table["False"] = changes
                }
            }
        }
    }

    return truth_table
}

/**
 * Построение таблицы истинности с двумя переменными
 * @param string - логическое выражение
 * @param array - список переменных
 * @returns {{True: *[], False: *[]}}
 */
function two_var(string, array) {
    const save = string
    let truth_table = {
        "True": [array],
        "False": [array]
    }

    for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 2; y++) {
            string = save
            string = string.replaceAll(array[0],x.toString())
            string = string.replaceAll(array[1],y.toString())
            let expression = eval(string)

            if (expression === 1 || expression === true) {
                let changes = truth_table["True"]
                changes.push([x,y])
                truth_table["True"] = changes
            } else {
                let changes = truth_table["False"]
                changes.push([x,y])
                truth_table["False"] = changes
            }

        }
    }

    return truth_table
}

/**
 * Возвращение таблицы истинности по количеству переменных
 * @param string - логическое выражение
 * @returns {{True: *[], False: *[]}} - таблица истинности
 */
function make_truth_table(string) {
    string = input_rework(string)
    const array = get_expression_var(string)

    switch (array.length) {
        case 2:
            return two_var(string, array)
        case 3:
            return three_var(string, array)
        case 4:
            return four_var(string, array)
    }
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
 * Добавление нужного значение в конец вывода
 * @param sign - значение для добавления
 */
function add_to_input(sign){
    if (sign === ''){
        document.getElementById("inputObject").value = ''
    } else{
        document.getElementById("inputObject").value += sign
    }
}

/**
 * Построение таблицы HTML
 */
function make_html_table() {
    const expression = get_expression()
    const truth_table = make_truth_table(expression)
    const table_length = truth_table["True"][0].length
    document.querySelector(".center_table").innerHTML = `<table class="main_table"></table>`

    for (let key in truth_table) {
        let row = document.createElement("tr")
        row.innerHTML = `
            <th colspan="${table_length+1}">${key}</th>
        `
        document.querySelector(".center_table").appendChild(row)

        for (let i = 0; i < truth_table[key].length; i++) {
            let row = document.createElement("tr")

            switch (table_length) {
                case 2:
                    row.innerHTML = `
                        <td>${truth_table[key][i][0]}</td>
                        <td>${truth_table[key][i][1]}</td>
                    `

                    if (i === 0) {
                        row.innerHTML += `<td>${expression}</td>`
                    } else {
                        row.innerHTML += `<td>${key}</td>`
                    }

                    document.querySelector(".center_table").appendChild(row)
                    break
                case 3:
                    row.innerHTML = `
                        <td>${truth_table[key][i][0]}</td>
                        <td>${truth_table[key][i][1]}</td>
                        <td>${truth_table[key][i][2]}</td>
                    `

                    if (i === 0) {
                        row.innerHTML += `<td>${expression}</td>`
                    } else {
                        row.innerHTML += `<td>${key}</td>`
                    }

                    document.querySelector(".center_table").appendChild(row)
                    break
                case 4:
                    row.innerHTML = `
                        <td>${truth_table[key][i][0]}</td>
                        <td>${truth_table[key][i][1]}</td>
                        <td>${truth_table[key][i][2]}</td>
                        <td>${truth_table[key][i][3]}</td>
                    `

                    if (i === 0) {
                        row.innerHTML += `<td>${expression}</td>`
                    } else {
                        row.innerHTML += `<td>${key}</td>`
                    }

                    document.querySelector(".center_table").appendChild(row)
                    break
            }
        }
    }
}