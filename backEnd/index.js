const app = require("./server")

// Start the server
const PORT = process.env.PORT || 3003
app.listen(PORT, err => {
  if (err) {
    console.log("Error occurred while starting the server", err)
  }
})
