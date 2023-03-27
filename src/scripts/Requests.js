import { getRequests, sendRequest, deleteRequest, saveCompletion, getPlumbers, getCompletions, updateRequestComplete} from "./dataAccess.js"
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
            <img src="./images/icon.png">
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
                    <img src="./images/icon.png">
                    ${objectFromArray.description}
                    </div>
                    <div class='plumbers'>
                    complete
                    </div>
                    <button class="request__delete"
                            id="request--${objectFromArray.id}">
                        Delete
                    </button>
                </li>`   
                
        }   
    }


const mainContainer = document.querySelector("#container")

document.addEventListener("click", click => {
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
        saveCompletion(completion).then( () => {

            //loop through requests, change completed to true on the matching request, then delete the old one and send the new one that is marked complete
            const requests = getRequests()
            let matchingRequest = null
            for(const request of requests){
                if(request.id === parseInt(requestId)){
                    matchingRequest = request
                    matchingRequest.completed = true
                }
            }
    
            console.log(`A completion has been created for request #${requestId}`)

            updateRequestComplete(requestId)

            //CALLING DELETEREQUEST AND SAVEREQUEST FUNCTIONS MAKE COMPUTER MAD. WHY????
            //ALSO... NOT SAVING COMPLETION EVEN IF REST WORK. MAKE NO SENSE.
            // deleteRequest(requestId).then( () => {

                // sendRequest(matchingRequest)
                // console.log(`The request for ${matchingRequest.description} has been marked complete in the database`)
                // mainContainer.dispatchEvent(new CustomEvent("stateChanged"))

        //     })
        })
    }
})

