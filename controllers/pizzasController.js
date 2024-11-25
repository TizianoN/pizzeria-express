const pizzasData = require('../data/pizzas');

// # index
function index(req, res) {
  const { ingredient, name } = req.query;

  let filteredPizzas = [...pizzasData];

  if (ingredient) {
    filteredPizzas = filteredPizzas.filter((pizza) => pizza.ingredients.includes(ingredient));
  }

  if (name) {
    filteredPizzas = filteredPizzas.filter((pizza) => pizza.name.toLowerCase() === name.toLowerCase());
  }

  filteredPizzas = filteredPizzas.map((pizza) => ({ ...pizza, image: '/images/pizzas/' + pizza.image }));

  res.json(filteredPizzas);
}

// # show
function show(req, res) {
  // * trovo la pizza
  const id = parseInt(req.params.id);
  let pizza = pizzasData.find((pizza) => pizza.id === id);

  // * controllo errore
  if (!pizza) {
    const err = new Error('Id pizza not found');
    err.code = 404;
    throw err;
  }

  pizza = { ...pizza, image: '/images/pizzas/' + pizza.image };

  // * risposta
  res.json(pizza);
}

// # store
function store(req, res) {
  const { name, image, ingredients } = req.body;
  const id = pizzasData.at(-1).id + 1;

  if (!name || !image || !ingredients?.length) {
    const err = new Error('Invalid params');
    err.code = 400;
    throw err;
  }

  const newPizza = { id, name, image, ingredients };

  pizzasData.push(newPizza);

  res.json(newPizza);
}

// # update
function update(req, res) {
  // * trovo la pizza da modificare
  const id = parseInt(req.params.id);

  let pizza = pizzasData.find((pizza) => pizza.id === id);

  // * controllo errore
  if (!pizza) {
    const err = new Error('Id pizza not found');
    err.code = 404;
    throw err;
  }

  // * recupero i nuovi parametri
  const { name, image, ingredients } = req.body;

  if (!name || !image || !ingredients?.length) {
    const err = new Error('Invalid params');
    err.code = 400;
    throw err;
  }

  // * aggiorno la pizza
  pizza.name = name;
  pizza.image = image;
  pizza.ingredients = ingredients;

  res.json(pizza);
}

// # modify
function modify(req, res) {
  // * trovo la pizza da modificare
  const id = parseInt(req.params.id);

  let pizza = pizzasData.find((pizza) => pizza.id === id);

  // * controllo errore
  if (!pizza) {
    const err = new Error('Id pizza not found');
    err.code = 404;
    throw err;
  }

  // * recupero i nuovi parametri
  const { name, image, ingredients } = req.body;

  if (name) {
    pizza.name = name;
  }

  if (image) {
    pizza.image = image;
  }

  if (ingredients?.length) {
    pizza.ingredients = ingredients;
  }

  res.json(pizza);
}

// # destroy
function destroy(req, res) {
  const id = parseInt(req.params.id);

  const pizza = pizzasData.find((pizza) => pizza.id === id);

  if (!pizza) {
    const err = new Error('Id pizza not found');
    err.code = 404;
    throw err;
  }

  const pizzaIndex = pizzasData.indexOf(pizza);

  pizzasData.splice(pizzaIndex, 1);

  res.json(pizzasData);
}

module.exports = { index, show, store, update, modify, destroy };
