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
                //pass
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
function variable(string) {
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
    const array = variable(string)

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
 * Построение таблицы HTML
 */
function make_html_table() {
    const truth_table = make_truth_table(get_expression())
    document.querySelector(".center_table").innerHTML = `<table class="table"></table>`

    for (let key in truth_table) {
        let row = document.createElement("tr")
        row.innerHTML = `<td colspan="value">${key}</td>`
        document.querySelector(".center_table").appendChild(row)

        for (let i = 0; i < truth_table[key].length; i++) {
            let row = document.createElement("tr")

            if (i === 0) {
                row.innerHTML = `<td colspan="variable">${truth_table[key][i]}</td>`
                document.querySelector(".center_table").appendChild(row)
            } else {
                row.innerHTML = `<td>${truth_table[key][i]}</td>`
                document.querySelector(".center_table").appendChild(row)
            }
        }
    }
}