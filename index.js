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
let column_copy = [[0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15]];
let row_list = [[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]];
let diagonal_list = [[0,5,10,15], [3,6,9,12]];
let column_check = ["", "", "", ""];
let row_check = ["", "", "", ""];
let diagonal_check = ["", ""];
let ref_list = ['','','','','','','','','','','','','','','',''];
let ref_count = 0;
let connect_four = false;
let game_over = false;
let player_wins = 0;
let cpu_wins = 0;

// [ System ] : In-Game EventListeners
for(let i = 0; i < 4; i++){
    // [ Condition ] : 
    rack.children[i].addEventListener("click", () => {
        rack_check(column_check);
        drop(i, player_color);
        cpuAttempt();
    })
}

// Column List : [[0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15]]   
// Row List : [[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]]
/*
    [ 0  1  2   3 ]
    [ 4  5  6   7 ]
    [ 8  9  10  11]
    [12  13  14 15]
 */

// [ Functions ] : In-Game
function drop(column, color){
    // [ Conditional ]
    if(!connect_four && !game_over){
        // [ Loop ] : Iterate through Entry Points
        for (let entry_point = 0; entry_point < 4; entry_point++){
            // [ Variables ]
            let column_length = column_copy[entry_point].length;
            let current_column = column_list[entry_point];
            let current_location = current_column[column_length-1];
            // [ Conditional ] : column === entry_point
            if(column == entry_point && column_check[entry_point].length < 4){
                // [ Second Implementation ]
                rack.children[current_location].style.backgroundColor = color.toLowerCase();
                column_check[entry_point] += color[0];  // ( Update Columns )
                // row_check[] += color[0]; // ( Update Rows )
                ref_list[current_location] = color[0];
                ref_count++;
                column_copy[entry_point].pop();
                rack_check(column_check);

                // [ Debug ]
                // console.log(`column_check : ${column_check}`);
                // console.log(`row_check : ${row_check}`);
                // console.log(`player column select : ${current_column[0]}`);
                // console.log(`current pos: ${current_location}`);
                // console.log(`current column len : ${column_length}`);
                // console.log(`available spaces : ${available_spaces}`);
                // console.log(`available columns : ${available_columns}`);
                // console.log(list);
                // console.log(column_copy);
            }
        }
        // ( Update Rows )
        row_scan();
        // ( Update Diagonals )

    } else {
        return;
    }

}   // ( Currently  )

function rack_check(list){
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
    // [ Conditional ] xxxx
    if(ref_count >= 16){
        game_over = true;
        console.log("DRAW");
        return; // Exit Function
    }
    // [ Conditional ] : rack isn't full && connect_four
    if(connect_four){
        game_over = true;
        console.log("GAME OVER");
        return; // Exit Function
    }

    // [ Loop ] : Entry Point Check
    for(let i = 0; i < 4; i++){
        // [ Condition ] 
        if(list[i].length == 4){
            entry_points = entry_points.filter((index) => index != i)
        }
    }
    // [ Loop ] : Columns Check
    for (let i = 0; i < 4; i++){
        // [ Conditional ] : columns 
        if(column_check[i] === red_streak || column_check[i] === gold_streak){
            connect_four = true;
            // [ Conditional ] : Winner / Loser Condition
            if(player_streak === red_streak || player_streak === gold_streak){
                console.log("PLAYER VICTORY");
                console.log("CPU DEFEAT");
                container.style.backgroundColor = player_color.toLowerCase();
                return; // Exit Function
            }
            if(cpu_streak == red_streak || cpu_streak === gold_streak){
                console.log("CPU VICTORY");
                console.log("PLAYER DEFEAT");
                container.style.backgroundColor = cpu_color.toLowerCase();
                return; // Exit Function
            }
            console.log("!!!! CONNECT FOUR !!!!");
        }
    }
    // [ Debug ]
    // console.log(`game_over : ${game_over}`);
    // console.log(entry_points);
    // console.log(`player_streak : ${player_streak}`);
    // console.log(`cpu_streak : ${cpu_streak}`);
}   // ( Currently Working )

function row_scan(){
    if(ref_count < 16 && !connect_four){
        // ( Scan Rows )
        for(let i = 0; i < 16; i+= 4){
            let red_count = 0;
            let gold_count = 0;
            for (let j = i; j < i+4; j++){
                if(ref_list[j] === 'R'){
                    red_count++;
                }else if (ref_list[j] === 'G'){
                    gold_count++;
                }

                // [ Conditional ]
                if(red_count === 4 && player_color[0] === 'R'){
                    connect_four = true;
                    console.log("PLAYER VICTORY");
                    console.log("CPU DEFEAT");
                    container.style.backgroundColor = player_color.toLowerCase();
                    return; // Exit Function                    
                } else if ( gold_count === 4 && cpu_color[0] === 'G'){
                    connect_four = true;
                    console.log("CPU VICTORY");
                    console.log("PLAYER DEFEAT");
                    container.style.backgroundColor = cpu_color.toLowerCase();
                    return; // Exit Function
                }
            }
        }
    }
}   // ( Currently Working )
function diagonal_scan(){

} // ( To Be Addressed )
function cpuAttempt(){
    // [ Variables ]
    let column_select = Math.floor(Math.random(0, entry_points.length) * entry_points.length);
    column_select = entry_points[column_select];

    if( !connect_four && column_check[column_select].length < 4 ){
        drop(column_select, cpu_color);
    } else {
        return;
    }

    // [ Debug ]
    // console.log(`cpu column select : ${column_select}`);
    // console.log(column_copy);
    // console.log(lists);
}   // ( Finished )