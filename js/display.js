import { addHistoryEntry } from './history.js'

//Update screen with current scene
export function displayScene(paths, currentId) {
    //Get current scene data and return ID
    const scene = paths[currentId];
    console.log('Current Scene:', scene);  // Debug log
    console.log('Scene title:', scene.title);  // Debug log
    console.log('Scene choices:', scene.choices);  // Debug log
    //Select HTML elements to update
    const gameContainer = document.querySelector('.game-container');
    console.log('Game container found:', gameContainer); // Debug log
    const choiceButtons = document.querySelectorAll('.choice-btn');
    console.log('Choice buttons found:', choiceButtons); // Debug log


    if (!gameContainer) {
        // nothing to render on this page
        return;
    }

    //Build main content section
    let content = `
        <h1>${scene.title}</h1>
        <div class="game-text">
        <h3>${scene.text}</h3>
    `;


    //List out scene choices
    if (scene.choices && scene.choices.length > 0) {
        content += `<ul>`;
        scene.choices.forEach((choice, index) => {
            content += `<li><strong>Option ${index + 1}</strong> - ${choice.text}</li>`;
        });
        content += `</ul>`;
    } else {
        //If no choices then game is over and buttons do nothing
        content += `<p><em>The End.</em></p>`;
    }

    //Close game text div
    content += `</div>`;

    //Inject content into game container
    console.log('Content to be inserted:', content);  // Debug log
    gameContainer.innerHTML = content;

    //Update button behaviors
    choiceButtons.forEach((button, index) => {
        //Get choice that matches button index
        const choice = scene.choices ? scene.choices[index] : null;
        //If valid choice then makie it clickable, if not than disable
        if (choice) {
            button.style.display = 'inline-block';
            button.onclick = () => {
                addHistoryEntry(choice.text);
                displayScene(paths, choice.next);
            }
        } else {
            button.style.display = 'none';
        }
    });
}


