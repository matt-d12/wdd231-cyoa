import {loadPaths} from './paths.js';
import {displayScene} from './display.js'

//Global variable for storing player inventory
let inventory = [];

//Add wait for HTML to load first before starting game
document.addEventListener('DOMContentLoaded', async () => {
    const userForm = document.getElementById('user-form');
    const userInputContainer = document.getElementById('user-input-container');
    const params = new URLSearchParams(window.location.search);
    //Read name from URL if present
    const urlName = params.get('name');
    //Read stored name from localStorage
    const storedName = localStorage.getItem('playerName');
    //Load or initialize inventory from localStorage
    let inventory = JSON.parse(localStorage.getItem('inventory') || '[]');

    //Determine effective userName:
    //Check URL param 1st, then storedName, if neither null
    const userName = urlName || storedName || null;

    const paths = await loadPaths();

    //Check localStorage is in sync, especially if used URL name
    if (userName) {
        //If name came from URL, save it to localStorage in case they are different
        if (urlName && urlName !== storedName) {
        localStorage.setItem('playerName', urlName);
        //Reset inventory on new player name
        inventory = [];
        localStorage.setItem('inventory', JSON.stringify(inventory));
        }
        if (userInputContainer) userInputContainer.style.display = 'none';
        displayScene(paths, "forest", userName);

        const choiceButtonsContainer = document.querySelector('.choices');
        if (choiceButtonsContainer) choiceButtonsContainer.style.display = 'flex'

        const playerName = document.querySelector('#player_name');
        if (playerName) {playerName.textContent = `Player: ${userName}`;
        playerName.style.display = 'block';
        }

        //Thank you message
        const thankYouDiv = document.getElementById('thank-you-message');
        if (thankYouDiv) {
            thankYouDiv.textContent = `Thank you ${userName} for playing the game!`;
        }
    } else if (userForm) {
        //When user submits, save to local and URL
        userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameValue = document.getElementById('user-input').value.trim();
        if (nameValue) {
            localStorage.setItem('playerName', nameValue);
            //Initialize inventory for new player
            localStorage.setItem('inventory', JSON.stringify([]));
            const url = new URL(window.location);
            url.searchParams.set('name', nameValue);
            window.location = url;
        }
        });
    }

    // contact us button
    const form = document.getElementById('form1');
    const contactUs = document.getElementById('contact_us');
    const nameInput = document.getElementById('full_name');
    if (contactUs && form && nameInput) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = nameInput.value.trim() || 'Friend';
            contactUs.textContent = `Thank you ${name}! We will be in touch shortly.`;
            form.reset();
        });
    }

    const menuBtn = document.querySelector('.menu-toggle');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const nav = document.querySelector('.nav1');
            if (nav) {
                if (nav.classList.contains('show')) {
    nav.classList.remove('show');
    void nav.offsetHeight;
    nav.classList.add('hide');
} else {
    nav.classList.remove('hide');
    void nav.offsetHeight;
    nav.classList.add('show');
}
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
}
});