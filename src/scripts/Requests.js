import { getRequests } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

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

    return `
    <li>
        <div>
        <img src="./icon.png">
        ${objectFromArray.description}
        </div>
        <button class="request__delete"
                id="request--${objectFromArray.id}">
            Delete
        </button>
    
    </li>
`   
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

