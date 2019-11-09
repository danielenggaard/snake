
export const apiBaseUrl = "https://localhost:5001/"; 
export const hubPath = `${apiBaseUrl}game`   // todo: change for production

export const states = {
    UNVISITED: 1,
    FOOD: 2,
    PATH: 3
}

export const className = {
    [states.UNVISITED]: "square_unvisited",
    [states.FOOD] : "square_food",
    [states.PATH] : "square_path"
}


