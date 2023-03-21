import { getRequests } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `
    return html
}

const convertRequestToListElement = (objectFromArray) => {

    return `<li>${objectFromArray.description}</li>`
    
}

