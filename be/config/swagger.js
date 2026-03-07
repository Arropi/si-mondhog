import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { swaggerComponents } from "./swagger-components.js"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Be Endpoint API SiMONDHOG",
            version: "1.0.0",
            description: "API documentation for SiMONDHOG backend endpoints"
        },
        ...swaggerComponents
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsdoc(options)

export {
    swaggerUi,
    specs
}