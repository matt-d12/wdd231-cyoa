export function addHistoryEntry (choiceText) {
    const historyList = document.querySelector('.history-list');
    if (!historyList) return;

    const count = historyList.querySelectorAll('.choice').length + 1;

    const entry = document.createElement('div');
    entry.className = 'choice';
    entry.innerHTML = `
    <h2>Choice ${count}</h2>
    <p>${choiceText}</p>
    `;
    historyList.appendChild(entry);
}