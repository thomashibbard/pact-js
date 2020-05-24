const { main, importData } = require("./provider.js")
importData()

console.log("Animal Profile Service listening on http://0.0.0.0:50051")

main()
