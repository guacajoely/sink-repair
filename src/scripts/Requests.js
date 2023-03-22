import { getRequests, sendRequest, deleteRequest, saveCompletion, markComplete } from "./dataAccess.js"
import { createPlumberDropdown } from "./plumbers.js"

export const Requests = () => {
    const requests = getRequests()

    let html = `<ul>${requests.map(convertRequestToListElement).join("")}</ul>`
    return html
}

const convertRequestToListElement = (objectFromArray) => {

    if(!objectFromArray.completed){

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
    </li>`   
    }

    else{
        return `
        <li>
            <div>
            <img src="./icon.png">
            ${objectFromArray.description}
            </div>
            <div class='plumbers'>
            COMPLETE
            </div>
            <button class="request__delete"
                    id="request--${objectFromArray.id}">
                Delete
            </button>
        </li>`   
    }
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
            date_created: `${Date.now()}`
        }

        //CALL THE SAVECOMPLETION FUNCTION PASSING IN THE OBJECT WE JUST CREATED
        saveCompletion(completion)

        //loop through requests, change completed to true on the matching request, then delete the old one and send the new one that is marked complete
        const requests = getRequests()
        let matchingRequest = null
        for(const request of requests){
            if(parseInt(request.id) === parseInt(requestId)){
                matchingRequest = request
                matchingRequest.completed = true
            }
        }
  
        console.log(matchingRequest)
        
        //CALLING DELETEREQUEST AND SAVEREQUEST FUNCTIONS BREAKS EVERYTHING. WHY????

    }
})

