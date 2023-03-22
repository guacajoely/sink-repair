import { getPlumbers } from "./dataAccess.js"

export const createPlumberDropdown = (request) => {

    const plumbers = getPlumbers()

    return `<select class="plumbers" id="plumbers">
            <option value="0">Completed by</option>
            ${
                plumbers.map(
                    plumber => {
                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                    }
                ).join("")
            }
    </select>`
    }