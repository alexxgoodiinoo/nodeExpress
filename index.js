const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json()); //Para que funcione el post
app.use(cors()); //Para que no pete el cors cuando se despliega
let data = [
    {
    id: 1,
    content: "Módulos para el Back y el fron end",
    date: "2022-08-16T10:30:00.098Z",
    important: true
    },
    {
    id: 2,
    content: "Módulo de empresa e iniciativa emprendedora",
    date: "2022-08-17T11:11:11.091Z",
    important: false
    },
]
app.get('/', (request, response) => {
    response.send('<center><h1>Hola Mundo</h1></center>')
})
app.get('/api/data', (request, response) => {
    response.json(data)
})
app.get('/api/data/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const objetoId = data.find((datos) => datos.id === id);
    if(objetoId){
        response.json(objetoId);
    }
    else{
        response.status(404).end();
    }
})
app.post('/api/data', (request, response) => {
    let nuevoData = request.body;
    if(!nuevoData.content){
        response.status(404).end();
    }else{
        let ultimoId = getLastId(data);
        let nuevoObjeto = {
            id : ++ultimoId,
            content : nuevoData.content,
            date : nuevoData.date,
            important : nuevoData.important
        }
        data.push(nuevoObjeto);
        response.status(200).end();
    }
})
app.delete('/api/data/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const objetoId = data.find((datos) => datos.id === id);
    if(objetoId){
        data = data.filter((datos) => datos.id != id);
        response.status(200).end();
    }
    else{
        response.status(404).end();
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

function getLastId(data) {
    let longitudArray = data.length;
    let ultimoId = data[longitudArray-1];
    return ultimoId.id;
}