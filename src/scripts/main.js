import { createHTML } from "./createHTML.js"
import { fetchRequests, fetchPlumbers, fetchCompletions } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = createHTML()
            }
        )
}

render()

mainContainer.addEventListener("stateChanged", customEvent => {
    render()
}
)

