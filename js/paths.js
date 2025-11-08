//Load JSON file with story paths and returned parsed data
export async function loadPaths() {
    const response = await fetch('js/paths.json');
    const data = await response.json();
    return data;
}