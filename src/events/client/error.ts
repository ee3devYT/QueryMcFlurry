import { Event, QueryMcFlurry } from "@classes";
import type { ClientEvents } from "oceanic.js";
export default class Error extends Event<"error"> {
    constructor(client: QueryMcFlurry) {
        super(client, {
            name: "error",
            description: "Handles errors from the client",
            listen: "always"
        });
    }

    execute(...[error]: ClientEvents["error"]): void {
        console.error(error);
    }

}