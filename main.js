/**
 * Переработка логического выражения в синтаксис JS
 * @param expression - входное логическое выражение
 * @returns {expression} - переработанное логическое выражение
 */
function expression_rework(expression) {
    if (expression.indexOf(" ") !== -1) { // " " -> ""
        expression = expression.replaceAll(" ", "");
    }

    if (expression.indexOf("≡") !== -1) { // "≡" -> "==="
        expression = expression.replaceAll("≡", "===");
    }

    if (expression.indexOf("¬") !== -1) { // "¬" -> "!"
        expression = expression.replaceAll("¬", "!");
    }

    if (expression.indexOf("∧") !== -1) { // "∧" -> "&&"
        expression = expression.replaceAll("∧", "&&");
    }

    if (expression.indexOf("∨") !== -1) { // "∨" -> "||"
        expression = expression.replaceAll("∨", "||");
    }

    if (expression.indexOf("→") !== -1) { // "→" -> "!a||b"
        while (expression.indexOf("→") !== -1) {
            let index = expression.indexOf("→");

            if (expression[index-1] !== ")") {
                expression = expression.slice(0, index-1) + "!" + expression.slice(index-1);
                expression = expression.replace("→", "||");
            } else {
                let counter = 0;
                for (let second_index = index-1; second_index >= 0; second_index--) {

                    if (expression[second_index] === ")") {
                        counter += 1;
                    } else if (expression[second_index] === "(") {
                        counter -= 1;
                    }

                    if (counter === 0) {
                        index = second_index;
                        break;
                    }
                }

                if (index === 0) {
                    expression = "!" + expression;
                } else {
                    expression = expression.slice(0, index) + "!" + expression.slice(index);
                }

                expression = expression.replace("→", "||");
            }
        }
    }

    return expression;
}

/**
 * Возвращение списка переменных в логическом выражении
 * @param expression - логическое выражение
 * @returns {*[]} - список переменных в логическом выражении
 */
function get_expression_elements(expression) {
    const array = Array.from(expression);
    const alp = ["!", "&", "|", "(", ")", "="];
    let elements = [];

    for (const element of array) {
        if (alp.indexOf(element) === -1) {
            if (elements.indexOf(element) === -1) {
                elements.push(element);
            }
        }
    }

    return elements.sort();
}

/**
 * Построения таблицы с четырьмя переменными
 * @param expression - логическое выражение после переработки
 * @param elements - список переменных
 * @param initial - начально выражение
 * @returns {{True: *[], False: *[]}}
 */
function four_elements(expression, elements, initial) {
    const save = expression;
    let truth_table = {
        "Elements": [...elements, initial],
        "True": [],
        "False": []
    };

    for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 2; y++) {
            for (let z = 0; z < 2; z++) {
                for (let w = 0; w < 2; w++) {
                    expression = save;
                    expression = expression.replaceAll(elements[0],x.toString());
                    expression = expression.replaceAll(elements[1],y.toString());
                    expression = expression.replaceAll(elements[2],z.toString());
                    expression = expression.replaceAll(elements[3],w.toString());
                    let expression_value = eval(expression);

                    if (expression_value === 1 || expression_value === true) {
                        let changes = truth_table["True"];
                        changes.push([x,y,z,w]);
                        truth_table["True"] = changes;
                    } else {
                        let changes = truth_table["False"];
                        changes.push([x,y,z,w]);
                        truth_table["False"] = changes;
                    }
                }
            }
        }
    }

    return truth_table;
}

/**
 * Построение таблицы истинности с тремя переменными
 * @param expression - логическое выражение после переработки
 * @param elements - список переменных
 * @param initial - начально выражение
 * @returns {{True: *[], False: *[]}}
 */
function three_elements(expression, elements, initial) {
    const save = expression;
    let truth_table = {
        "Elements": [...elements, initial],
        "True": [],
        "False": []
    };

    for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 2; y++) {
            for (let z = 0; z < 2; z++) {
                expression = save;
                expression = expression.replaceAll(elements[0],x.toString());
                expression = expression.replaceAll(elements[1],y.toString());
                expression = expression.replaceAll(elements[2],z.toString());
                let expression_value = eval(expression);

                if (expression_value === 1 || expression_value === true) {
                    let changes = truth_table["True"];
                    changes.push([x,y,z]);
                    truth_table["True"] = changes;
                } else {
                    let changes = truth_table["False"];
                    changes.push([x,y,z]);
                    truth_table["False"] = changes;
                }
            }
        }
    }

    return truth_table;
}

/**
 * Построение таблицы истинности с двумя переменными
 * @param expression - логическое выражение после переработки
 * @param elements - список переменных
 * @param initial - начально выражение
 * @returns {{True: *[], False: *[]}}
 */
function two_elements(expression, elements, initial) {
    const save = expression;
    let truth_table = {
        "Elements": [...elements, initial],
        "True": [],
        "False": []
    };

    for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 2; y++) {
            expression = save
            expression = expression.replaceAll(elements[0],x.toString());
            expression = expression.replaceAll(elements[1],y.toString());
            let expression_value = eval(expression)
;
            if (expression_value === 1 || expression_value === true) {
                let changes = truth_table["True"];
                changes.push([x,y]);
                truth_table["True"] = changes;
            } else {
                let changes = truth_table["False"];
                changes.push([x,y]);
                truth_table["False"] = changes;
            }

        }
    }

    return truth_table;
}

/**
 * Возвращение таблицы истинности по количеству переменных
 * @param expression - логическое выражение
 * @returns {{True: *[], False: *[]}} - таблица истинности
 */
function make_truth_table(expression) {
    const initial = expression;
    expression = expression_rework(expression);
    const elements = get_expression_elements(expression);

    switch (elements.length) {
        case 2:
            return two_elements(expression, elements, initial);
        case 3:
            return three_elements(expression, elements, initial);
        case 4:
            return four_elements(expression, elements, initial);
    }
}

/**
 * Получение ввода пользователя в HTML
 * @returns {*} - ввод
 */
function get_expression(){
    let input = document.getElementById("inputObject");
    return input.value;
}

/**
 * Добавление нужного значение в конец вывода
 * @param sign - значение для добавления
 */
function add_to_input(sign){
    if (sign === ''){
        document.getElementById("inputObject").value = '';
    } else{
        document.getElementById("inputObject").value += sign;
    }
}

/**
 * Построение таблицы HTML
 */
function make_html_table() {
    const expression = get_expression();
    const truth_table = make_truth_table(expression);
    document.querySelector(".center_table").innerHTML = `<table class="main_table"></table>`;

    let row = document.createElement("tr");
    row.innerHTML = ``;
    for (const element of truth_table["Elements"]) {
        row.innerHTML += `<th colspan="1">${element}</th>`;
    }
    document.querySelector(".center_table").appendChild(row);

    for (let key of ["True", "False"]) {
        for (let index in truth_table[key]) {
            let row = document.createElement("tr");
            row.innerHTML = ``

            for (let value of truth_table[key][index]) {
                row.innerHTML += `<td>${value}</td>`;
            }

            if (key === "True") {
                row.innerHTML += `<td>1</td>`;
            } else {
                row.innerHTML += `<td>0</td>`;
            }

            document.querySelector(".center_table").appendChild(row);
        }
    }
}