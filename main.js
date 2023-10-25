// Получение значения ввода в HTML
function get_expression(){
    let input = document.getElementById("inputObject")
    return input.value
}

function solve_expression(){
    alert(eval(get_expression()))
}



document.querySelector('.center_table').innerHTML = `<table class="table"></table>`
for (key in a) {
    let row = document.createElement('tr')
    row.innerHTML = `<td colspan="2">${key}</td>`
    document.querySelector('.center_table').appendChild(row)
    for (let i=0; i < a[key].length; i++) {
        let row = document.createElement('tr')
        row.innerHTML = `<td>${a[key][i]}</td>`
        document.querySelector('.center_table').appendChild(row)
    }
}