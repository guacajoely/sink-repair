import { createHTML } from "./createHTML.js"
import { fetchCompletions, fetchRequests } from "./dataAccess.js"
import { fetchPlumbers } from "./dataAccess.js"

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

