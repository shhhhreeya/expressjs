import 'dotenv/config'
import express from 'express'
const app = express()

const port = process.env.PORT || 3000
app.use(express.json())

let teaData = []
let nextID = 1

//add a new tea
app.post('/teas', (req, res) => {
    const {name, price} = req.body
    const newTea = {id: nextID++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all teas
app.get('/teas', (req, res) => {
   res.status(200).send(teaData) 
})

//get a particular tea by id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));    
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

//update a tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send("Upadted")
})

//delete tea
app.delete('/teas/:id', (req, res) => {
        console.log("HERE!!!")

    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1){
        return res.status(404).send("Tea not found")
    }
    console.log("here!!!")
    teaData.splice(index, 1)
    return res.status(200).send("deleted")
})


app.listen(port, () => {
    console.log(`Server is running at ${port}...`)
})
