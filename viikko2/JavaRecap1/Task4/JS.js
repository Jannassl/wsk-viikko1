' use strict'

const pisteet = parseInt(prompt("Anna pisteet"))

let arvosana;

if (pisteet <= 39) {
    arvosana = 0;
} else if (pisteet <= 51) {
    arvosana = 1;
} else if (pisteet <= 63) {
    arvosana = 2;
} else if (pisteet <= 75) {
    arvosana = 3;
} else if (pisteet <= 87) {
    arvosana = 4;
} else if (pisteet <= 100) {
    arvosana = 5;
} else {
    arvosana = "väärä syöte";
}

document.querySelector('#result').innerHTML= "Arvosanasi: "+arvosana

