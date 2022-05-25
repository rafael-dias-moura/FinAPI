const { request } = require('express')
const { v4 : uuidv4 } = require("uuid")//biblioteca p gerar ids

const express = require('express')
const app = express();
app.use(express.json());
const port = 3000

const custumers = [];//array de clientes

app.post("/account", (request, response) => {//recurso de contas
    const { cpf, name } = request.body;

    const custumerAlreadExists = custumers.some((custumer) => custumer.cpf === cpf);//retorna boolean

    if (custumerAlreadExists) {//se retorna true
        return response.status(400).json({error: "Custumer already exists!"});
    }

    custumers.push({
        cpf,
        name,
        id:uuidv4(),
        statement: []
    });

    return response.status(201).send();

});

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})