import { TsundokuHTML } from "./classesHTML.js";
import { showSection, toggleNav, displayFavoriteBooks } from "./functions.js";
import { getFromLocalStorage } from "./localstorage.js";

const browser_burgerMenu = document.getElementById("browser_menu");
browser_burgerMenu.addEventListener("click", (e) => {
	showSection('browser')});

const wishlist_burgerMenu = document.getElementById("wishlist_menu");
wishlist_burgerMenu.addEventListener("click", (e) => {
	showSection('wishlist');
	const wishlistLocalStorage = getFromLocalStorage("favorites") || [];
	displayFavoriteBooks(wishlistLocalStorage);
});

const contact_burgerMenu = document.getElementById("contact_menu");
contact_burgerMenu.addEventListener("click", (e) => {
	showSection('contact')});

const menu_burgerIcon = document.getElementById("burger_icon");
menu_burgerIcon.addEventListener("click", (e) => {
	toggleNav()
});

const pruebaTsundoku = new TsundokuHTML;