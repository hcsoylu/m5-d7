import express from "express"
import cors from "cors"

const app = express()

const port = process.env.PORT

//app.use(cors()) // no options means allow everybody

// app.use(cors({ origin: process.env.FE_URL })) // "http://localhost:3000" is the only origin allowed

const whitelist = [process.env.FE_URL_DEV, process.env.FE_URL_PROD]

const corsOptions = {
  origin: function (origin, next) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log("ORIGIN ", origin)
      // origin found in whitelist
      next(null, true)
    } else {
      // origin not found in the whitelist
      next(new Error("Not allowed by CORS"))
    }
  },
}

app.use(cors(corsOptions))

// CROSS ORIGIN RESOURCE SHARING

// ORIGIN

// 2 different domains are 2 different orgins
// FE http://domain-a.com
// BE http://domain-b.com

// same domains with different ports are different origins
// FE http://localhost:3000
// BE http://localhost:3001

// same domains with different protocols are different origins
// FE http://domain-a.com
// BE https://domain-a.com

// routers

app.listen(port, () => {
  console.log("Server running on port: ", port)
})
