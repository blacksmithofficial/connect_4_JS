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
let entry_points = [0, 1, 2, 3];
let column_list = [[0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15]];
let row_list = [[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]];
let diagonal_list = [];
let column_check = ["", "", "", ""];
let row_check = ["", "", "", ""];
let diagonal_check = ["", ""];

let ref_list = ['','','','','','','','','','','','','','','',''];
let connect_four = false;
let game_over = false;

let player_wins = 0;
let cpu_wins = 0;

// [ System ] : In-Game EventListeners
for(let i = 0; i < 4; i++){
    rack.children[i].addEventListener("click", () => {
        drop(i);
        rack_check();
        // cpuAttempt();

        // [ Debug ]
        // console.log(`Column : ${i}`);
        // console.log(ref_list);
        // console.log(column_a_indexes);
    })
}

// [ Functions ] : In-Game
function drop(entry_point){
    // [ Conditional ]
    if(!connect_four){
        for (let i = 0; i < 4; i++){
            if(entry_point == i && entry_points.length > 0){
                let a = column_list[i][column_list[i].length-1];
                let current_row = row_list[column_list[i].length-1];
                current_row.shift();
                let x = column_list[entry_point].pop();

                ref_list[x] = player_color[0];
                column_check[i] += player_color[0];
                row_check[column_list[i].length] += player_color[0];
                rack.children[x].style.backgroundColor = player_color.toLowerCase();

                // [ Debug ]
                console.log(`you dropped coin in column ${entry_point}`);
                // console.log(column_list);
                // console.log(current_row); // Current row 
                // console.log(a);
            }
        }
    } else {
        return;
    }
    // console.log(`Columns : ${column_check}`);
    // console.log(`Rows : ${row_check}`);
}   // ( Finished )

function rack_check(){
    // [ Variables ]
    let red_streak = "RRRR";
    let gold_streak = "GGGG";

    let player_streak = "";
    let cpu_streak = "";

    // [ Loop ] : Initialize Player Streaks
    for (let i = 0; i < 4; i++){
        player_streak += player_color[0];
        cpu_streak += cpu_color[0];
    }

    // [ Conditional ] : rack is full && no connect_four
    if(entry_points.length <= 0 && !connect_four){
        game_over = true;
        console.log("GAME OVER");
    }
    // [ Conditional ] : rack isn't full && connect_four
    if(connect_four){
        console.log("GAME OVER");
        return; // Exit Function
    }


    // [ Loop ] : Entry Point Check
    for(let i = 0; i < 4; i++){
        // [ Conditon ] 
        if(column_list[i].length <= 0){
            entry_points = entry_points.filter((index) => index != i)
        }
    }
    // [ Loop ] : Rows & Columns Check
    for (let i = 0; i < 4; i++){
        // [ Conditional ] : columns 
        if(column_check[i] === red_streak || column_check[i] === gold_streak){
            connect_four = true;
            // [ Conditional ] : Winner / Loser Condition
            if(player_streak === red_streak || player_streak === gold_streak){
                console.log("PLAYER VICTORY");
                console.log("CPU DEFEAT");
                return; // Exit Function
            }
            if(cpu_streak == red_streak || cpu_streak === gold_streak){
                console.log("CPU VICTORY");
                console.log("PLAYER DEFEAT");
                return; // Exit Function
            }
            console.log("!!!! CONNECT FOUR !!!!");
        }
        // [ Conditional ] : rows
        if(row_check[i] === red_streak || row_check[i] === gold_streak){
            connect_four = true;
            // [ Conditional ] : Winner / Loser Condition
            if(player_streak === red_streak || player_streak === gold_streak){
                console.log("PLAYER VICTORY");
                console.log("CPU DEFEAT");
                return; // Exit Function
            }
            if(cpu_streak == red_streak || cpu_streak === gold_streak){
                console.log("CPU VICTORY");
                console.log("PLAYER DEFEAT");
                return; // Exit Function
            }
            console.log("!!!! CONNECT FOUR !!!!");
        }
    }

    // [ Debug ]
    console.log(`player_streak : ${player_streak}`);
    console.log(`cpu_streak : ${cpu_streak}`);
}   // ( Currently Working )

function cpuAttempt(){
    // [ Variables ]
    rack_check();
}   // To be addressed