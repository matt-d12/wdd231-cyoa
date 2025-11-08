//Global variable for storing player inventory
let inventory = [];

//Load JSON file with story paths and returned parsed data
async function loadPaths() {
    const response = await fetch('js/paths.json');
    const data = await response.json();
    return data;
}

//Update screen with current scene
function displayScene(paths, currentId) {
    //Get current scene data and return ID
    const scene = paths[currentId];
    //Select HTML elements to update
    const gameContainer = document.querySelector('.game-container');
    const choiceButtons = document.querySelectorAll('.choice-btn');

    //Build main content section
    let content = `
        <h1>${scene.title}</h1>
        <div class="game-text">
        <p>${scene.text}</p>
    `;


    //List out scene choices
    if (scene.choices && scene.choices.length > 0) {
        content += `<ul>`;
        scene.choices.forEach((choice, index) => {
            content += `<li><strong>Option ${index + 1}<strong> - ${choice.text}</li>`;
        });
        content += `</ul>`;
    } else {
        //If no choices then game is over and buttons do nothing
        content += `<p><em>The End.</em></p>`;
    }

    //Close game text div
    content += `</div>`;

    //Inject content into game container
    gameContainer.innerHTML = content;

    //Update button behaviors
    choiceButtons.forEach((button, index) => {
        //Get choice that matches button index
        const choice = scene.choices ? scene.choices[index] : null;
        //If valid choice then makie it clickable, if not than disable
        if (choice) {
            button.style.display = 'inline-block';
            button.onclick = () => displayScene(paths, choice.next);
        } else {
            button.style.display = 'none';
        }
    });
}

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


