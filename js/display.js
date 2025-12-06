import { addHistoryEntry } from './history.js'

//Update screen with current scene
export function displayScene(paths, currentId, playerName) {
    console.log('playerName received:', playerName);
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
        <h2 id="player_name" style="display: block;">Player: ${playerName}</h2>
        <h1>${scene.title}</h1>
        <div class="game-text">
        <h3>${scene.text}</h3>
    `;


    //Read inventory from localStorage so we can apply requirements and add items
    const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');

    //List out scene choices (only those allowed by inventory requirements)
    const visibleChoices = (scene.choices || []).filter(choice => {
        //If choice requires an item, only show if player has it
        if (choice.requireItem) {
            return inventory.includes(choice.requireItem);
        }
        //If choice disallows some items, hide it when player has any of them
        if (choice.requireItemNone && Array.isArray(choice.requireItemNone)) {
            return !choice.requireItemNone.some(req => inventory.includes(req));
        }
        return true;
    });

    if (visibleChoices.length > 0) {
        content += `<ul>`;
        visibleChoices.forEach((choice, index) => {
            content += `<li><strong>Option ${index + 1}</strong> - ${choice.text}</li>`;
        });
        content += `</ul>`;
    } else {
        //If no visible choices then game is over or blocked
        content += `<p><em>No available options. The End.</em></p>`;
    }

    //Close game text div
    content += `</div>`;

    //Inject content into game container
    console.log('Content to be inserted:', content);  // Debug log
    gameContainer.innerHTML = content;

    //Update button behaviors - map visibleChoices to the fixed set of buttons
    choiceButtons.forEach((button, index) => {
        const choice = visibleChoices[index] || null;
        if (choice) {
            button.style.display = 'inline-block';
            button.onclick = () => {
                //If taking this choice grants an item, add it to inventory
                const inv = JSON.parse(localStorage.getItem('inventory') || '[]');
                if (choice.addItem && !inv.includes(choice.addItem)) {
                    inv.push(choice.addItem);
                    localStorage.setItem('inventory', JSON.stringify(inv));
                }
                addHistoryEntry(choice.text);
                displayScene(paths, choice.next, playerName);
            }
        } else {
            button.style.display = 'none';
            button.onclick = null;
        }
    });
}


