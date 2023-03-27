import { getRequests, sendRequest, deleteRequest, saveCompletion, markCompletionsComplete, getPlumbers, getCompletions} from "./dataAccess.js"
import { createPlumberDropdown } from "./plumbers.js"

export const Requests = () => {
    
    //MARK REQUESTS COMPLETE BEFORE STORING REQUESTS!!!
    markCompletionsComplete()
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

            //get most current completions and plumber arrays inside function
            const completions = getCompletions()
            const plumbers = getPlumbers()

            //now we need to grab the plumbers name
            for(const completion of completions){
                if(objectFromArray.id === parseInt(completion.requestId)){
                    const matchingPlumber = plumbers.find((plumber) => {
                        return parseInt(completion.plumberId) === plumber.id
                    })

                return `
                <li>
                    <div>
                    <img src="./images/icon.png">
                    ${objectFromArray.description}
                    </div>
                    <div class='plumbers'>
                    completed by ${matchingPlumber.name}
                    </div>
                    <button class="request__delete"
                            id="request--${objectFromArray.id}">
                        Delete
                    </button>
                </li>`   
                }
        }   
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
        console.log(`A completion has been created and sent for request #${requestId}`)

    }
})

