import express, { response } from "express";
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 2500;
let users = [
    { id: 1, name: 'Rafael Ribeiro', age: 31 },
    { id: 2, name: 'Gabriel Custódio', age: 27 },
];

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});

app.get('/', (req, res) => {
    return res.send('<h1>Trabalhando com servidor express.</h1>')
});

app.get('/users', (req, res) => {
  return res.send(users);
});

app.get('/users/:usersId', (req, res) => {
    const userId = req.params.usersId;
    const user = users.find(user => {
        return (user.id === Number(userId))
    });
    return res.send(user);
  });

  app.post('/users', (req, res) => {
    const newUser = req.body;

    users.push(newUser);

    return res.status(StatusCodes.CREATED).send(newUser);
  });

  app.put('/users/:usersId', (req, res) => {
    const userId = req.params.usersId;
    const updateUser = req.body;

    users = users.map(user => {
      if (Number(userId) === user.id) {
        return updateUser;
      }
      return user
    });

    return res.send(updateUser)
  });

  app.delete('/users/:usersId', (req, res) => {
    const userId = req.params.usersId;
    users = users.filter((user) => user.id !== Number(userId));

    return res.status(StatusCodes.NO_CONTENT).send();
  });