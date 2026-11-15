/* CONNECT FOUR JAVASCRIPT */

// [ Variables ]
const start_menu = document.getElementById("start_menu");
const phase_0 = document.getElementById("phase_0");
const phase_1 = document.getElementById("phase_1");     // User Input
const phase_2 = document.getElementById("phase_2");     // Color Select
const game = document.getElementById("game");
const container = document.getElementById("container");

const start_button = document.getElementById("start_button");
const phase_1_button = document.getElementById("phase_1_button");
const red = document.getElementById("red");
const gold = document.getElementById("gold");

const rack = document.getElementById("rack");

// [ Variables ] : Set-Up
let player_color, cpu_color;

// [ System ] : Event Listeners 
start_button.addEventListener("click", () => {
    phase_0.style.display = "none";
    phase_1.style.display = "flex";
})
phase_1_button.addEventListener("click", () => {
    phase_1.style.display = "none";
    phase_2.style.display = "block";
})
red.addEventListener("click", () => {
    phase_2.style.display = "none";
    start_menu.style.display = "none";
    game.style.display = "flex"
    player_color = "RED";
    cpu_color = "GOLD";
})
gold.addEventListener("click", () => {
    start_menu.style.display = "none";
    game.style.display = "flex"
    player_color = "GOLD";
    cpu_color = "RED";
})

// [ Variables ] : In-Game
const entry_points = [0, 1, 2, 3];
let column_a_indexes = [0, 4, 8, 12];
let column_b_indexes = [1, 5, 9, 13];
let column_c_indexes = [2, 6, 10, 14];
let column_d_indexes = [3, 7, 11, 15];
let index_list = [column_a_indexes, column_b_indexes, column_c_indexes, column_d_indexes];

let ref_list = ['','','','','','','','','','','','','','','',''];
let connect_four = false;

// [ System ] : In-Game EventListeners
for(let i = 0; i < 4; i++){
    rack.children[i].addEventListener("click", () => {
        drop(i);
        // rack_check();
        // cpuAttempt();

        // [ Debug ]
        console.log(`Column : ${i}`);
        console.log(ref_list);
        console.log(column_a_indexes);
    })
}

// [ Functions ] : In-Game
function drop(entry_point){
    // [ Conditional ]
    for (let i = 0; i < 4; i++){
        if(entry_point == i && entry_points.length > 0){
            let x = index_list[i].pop();
            ref_list[x] = player_color[0];
            rack.children[x].style.backgroundColor = player_color.toLowerCase();
        }
    }

    // [ Debug ]
    console.log(`you dropped coin in column ${entry_point}`);
}   // ( Currently Working )

function rack_check(){
    // [ Variables ]
    let first_column = [];
    let second_column = [];
    let third_column = [];
    let fouth_column = [];
    let first_row = [];
    let second_row = [];
    let third_row = [];
    let fourth_row = [];
    let first_diagonal = [];
    let second_diagonal = [];

    let red_streak = "RRRR";
    let gold_streak = "GGGG";
}   // To be addressed

function cpuAttempt(){
    // [ Variables ]
    rack_check();
}   // To be addressed