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
    player_color = "red";
    cpu_color = "gold";
})
gold.addEventListener("click", () => {
    start_menu.style.display = "none";
    game.style.display = "flex"
    player_color = "gold";
    cpu_color = "red";
})

// [ Variables ] : In-Game