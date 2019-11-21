
export const apiBaseUrl = "https://snakegameapi.azurewebsites.net/"; 
export const hubPath = `${apiBaseUrl}game`;

export const states = {
    UNVISITED: 1,
    FOOD: 2,
    PATH: 3,
    HEAD: 4
}

export const className = {
    [states.UNVISITED]: "square_unvisited",
    [states.FOOD] : "square_food",
    [states.PATH] : "square_path",
    [states.HEAD] : "square_head"
}


