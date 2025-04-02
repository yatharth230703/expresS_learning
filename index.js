import express from 'express'

const app= express()

const port = 3000

app.use(express.json())

let teaData = []

let nextId = 1 

app.post('/teas',(req,res)=>{
    
    const {name,price}=req.body
    const newTea = {id:nextId++, name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
    console.log(teaData)

})

app.get('/teas',(req,res)=>{
    if (teaData.length===0){
        res.status(405).send("Nothing here to drink")
    }
    else{
        res.status(200).send(teaData)
    }
    
})

app.get('/teas/:id',(req,res)=>{
    const tea =teaData.find(t=>t.id===parseInt(req.params.id))
    //here , req.params.id represents the id that is recieved in the way of /teas/:id
    if(!tea){
        res.status(404).send("tea not found")
    }
    
    res.status(200).send(tea)
})

app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        res.status(404).send("tea not found")
    }
    const {name,price} = req.body
    tea.name=name
    tea.price=price
    res.status(200).send(teaData)
})

app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex(t=>t.id === parseInt(req.params.id))
    if (index===-1){
        res.status(404).send("error, hai hi ni")
    }
    
    teaData.splice(index,1)
        res.status(200).send('deleted')
})

app.put('/teas_price/:price', (req,res)=>{
    const newp = teaData.find(t=>t.price==(req.params.price));
    const {new_price,up_by} = req.body;
    newp.price= String(parseFloat(new_price) + 10*parseFloat(up_by));
    if(parseFloat(up_by)>0.01){
        res.status(404).send("too large");
    }
    res.status(200).send(teaData);

})

app.get ("/",(req,res)=>{
    res.send("Helo")
})

app.get ("/ice-tea",(req,res)=>{
    res.send("Helo ice tea")
})

app.get ("/hot-tea",(req,res)=>{
    res.send("Helo hot tea")
})


app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})