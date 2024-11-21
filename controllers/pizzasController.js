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

  res.json(filteredPizzas);
}

// # show
function show(req, res) {
  // logica
  const id = parseInt(req.params.id);
  const pizza = pizzasData.find((pizza) => pizza.id === id);

  // cntrollo err
  if (!pizza) {
    return res.status(404).json({
      error: 'Not found',
    });
  }

  // risposta pos
  res.json(pizza);
}

// # store
function store(req, res) {
  res.json('Creazione di una pizza');
}

// # update
function update(req, res) {
  const id = parseInt(req.params.id);
  res.json('Sostituisco la pizza ' + id);
}

// # modify
function modify(req, res) {
  const id = parseInt(req.params.id);
  res.json('Modifico la pizza ' + id);
}

// # destroy
function destroy(req, res) {
  const id = parseInt(req.params.id);

  const pizza = pizzasData.find((pizza) => pizza.id === id);

  if (!pizza) {
    return res.status(404).json({
      error: 'Not found',
    });
  }

  const pizzaIndex = pizzasData.indexOf(pizza);

  pizzasData.splice(pizzaIndex, 1);

  res.json(pizzasData);
}

module.exports = { index, show, store, update, modify, destroy };
