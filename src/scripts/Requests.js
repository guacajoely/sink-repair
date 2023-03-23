import { getRequests, sendRequest, deleteRequest, saveCompletion, getCompletions, getPlumbers } from "./dataAccess.js"
import { createPlumberDropdown } from "./plumbers.js"

export const Requests = () => {
    const requests = getRequests()

    let html = `<ul>${requests.map(convertRequestToListElement).join("")}${requests.map(convertCompletionToListElement).join("")}</ul>`
    return html
}

const convertRequestToListElement = (objectFromArray) => {

    //get most current completions array inside function
    const completions = getCompletions()

    //make sure there are no matching completions before generating html with a plumber dropdown
    const matchingCompletion = completions.find((completion) => {
        return objectFromArray.id === parseInt(completion.requestId)
    })

    if(!matchingCompletion){

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
}


const convertCompletionToListElement = (objectFromArray) => {

    //get most current completions and plumber arrays inside function
    const completions = getCompletions()
    const plumbers = getPlumbers()

    //now we need to make sure the request IS completed before generating HTML without a dropdown
    for(const completion of completions){
        if(objectFromArray.id === parseInt(completion.requestId)){

            const matchingPlumber = plumbers.find((plumber) => {
                return parseInt(completion.plumberId) === plumber.id
            })

            return `
            <li style="background-color: pink">
                <div>
                <img src="./icon.png">
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

    }
})

