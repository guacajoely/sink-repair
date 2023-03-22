import { getRequests, deleteRequest, saveCompletion } from "./dataAccess.js"
import { createPlumberDropdown } from "./plumbers.js"

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

        <div class='plumbers'>
        ${createPlumberDropdown(objectFromArray)}
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


mainContainer.addEventListener("change",(event) => {

    if (event.target.id === "plumbers") {
    
        //GRAB THE IDS FROM THE OPTION'S ID
        const [requestId, plumberId] = event.target.value.split("--")

        // CREATE A NEW COMPLETION OBJECT
        const completion = { 
            requestId: requestId,
            plumberId: plumberId,
            date_created: `${Date.now}`
        }

        //CALL THE SAVECOMPLETION FUNCTION PASSING IN THE OBJECT WE JUST CREATED
        saveCompletion(completion)

    }
})

