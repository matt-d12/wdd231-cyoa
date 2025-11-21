import {loadPaths} from './paths.js';
import {displayScene} from './display.js'

//Global variable for storing player inventory
let inventory = [];





//Add wait for HTML to load first before starting game
document.addEventListener('DOMContentLoaded', async () => {
    //Handle user input form
    const userForm = document.getElementById('user-form');
    const userInputContainer = document.getElementById('user-input-container');
    const params = new URLSearchParams(window.location.search);
    const userName = params.get('name');

    const paths = await loadPaths();

    //Start game only if name is present in URL
    if (params.has('name')) {
        if (userInputContainer) userInputContainer.style.display = 'none';
        displayScene(paths, "forest");

         //Thank you message
        const thankYouDiv = document.getElementById('thank-you-message');
        if (thankYouDiv) {
            thankYouDiv.textContent = `Thank you ${userName} for playing the game!`;
        }
    } else if (userForm) {
        userForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nameValue = document.getElementById('user-input').value.trim();
            if (nameValue) {
                const url = new URL(window.location);
                url.searchParams.set('name', nameValue);
                window.location = url;
            }
        });
    }

    //Update nav links based off name parameter
    const contribLink = document.getElementById('contrib-link');
    const homeLink = document.querySelector('a.logo, nav.nav1 a[href=\"index.html\"]');

    if (userName) {
        if (contribLink) {
            contribLink.href = `contributions.html?name=${encodeURIComponent(userName)}`;
        }
        if (homeLink) {
            homeLink.href = `index.html?name=${encodeURIComponent(userName)}`;
        }

        document.querySelector('.menu-toggle').addEventListener('click', () => {
            document.querySelector('.nav1').classList.toggle('show');
        });
}

   

});


