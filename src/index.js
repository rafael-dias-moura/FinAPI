const { request } = require('express')
const { v4 : uuidv4 } = require("uuid")//biblioteca p gerar ids

const express = require('express')
const app = express();
app.use(express.json());
const port = 3000

const customers = [];//array de clientes

//middleware
function verifyExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);//percorre o array e retorna o q tem o msm cpf

    if(!customer) {
        return response.status(400).json({error: "Customer not found"})
    }

    request.customer = customer;

    return next();
}

app.post("/account", (request, response) => {//recurso de contas
    const { cpf, name } = request.body;

    const customerAlreadExists = customers.some((customer) => customer.cpf === cpf);//retorna boolean

    if (customerAlreadExists) {//se retorna true
        return response.status(400).json({error: "Customer already exists!"});
    }

    customers.push({
        cpf,
        name,
        id:uuidv4(),
        statement: []
    });

    return response.status(201).send();

});

app.get("/statement", verifyExistsAccountCPF, (request, response) => {
    const { customer } = request;
    return response.json(customer.statement);
});

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})