import { TsundokuHTML } from "./classesHTML.js";
import { showSection } from "./functions.js";

const browser_burgerMenu = document.getElementById("browser_menu");
browser_burgerMenu.addEventListener("click", (e) => {
	showSection('browser')});

const wishlist_burgerMenu = document.getElementById("wishlist_menu");
wishlist_burgerMenu.addEventListener("click", (e) => {
	showSection('wishlist')});

const contact_burgerMenu = document.getElementById("contact_menu");
contact_burgerMenu.addEventListener("click", (e) => {
	showSection('contact')});

const pruebaTsundoku = new TsundokuHTML;