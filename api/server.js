// const express = require("express")
// const carsRouter = require("./cars/cars-router")
// const server = express()

// // DO YOUR MAGIC
// server.use(express.json())
// server.use("api/cars", carsRouter)

// server.use("*", (req, res) => {
//     res.status(404).json({
//         message: "404 NOT FOUND"
//     })
// })

// module.exports = server
const express = require("express")

const server = express()

const carsRouter = require("./cars/cars-router")

server.use(express.json())
server.use("/api/cars", carsRouter)

server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Oh no, something went wrong",
	})
})

module.exports = server
