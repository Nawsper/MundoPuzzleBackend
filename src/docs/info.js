export const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API MundoPuzzle",
            version: "1.0.0",
            description: "API de productos",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./src/docs/*.yml"],
};