import {loadPaths} from './paths.js';
import {displayScene} from './display.js'

//Global variable for storing player inventory
let inventory = [];





//Add wait for HTML to load first before starting game
document.addEventListener('DOMContentLoaded', async () => {
    //Load story paths from JSON
    const paths = await loadPaths();
    //Start game at initial scene
    displayScene(paths, "forest");

    document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav1').classList.toggle('show');
    });
});


