function checkTime(req, res, next) {
  const now = new Date();
  const nowText = now.toLocaleString();
  console.log('Ciao, sei passato in questo middleware alle');
  console.log(nowText);

  // vado alla prossima funzione
  next();
}

module.exports = checkTime;
