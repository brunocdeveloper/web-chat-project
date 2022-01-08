// os métodos de formatação de data foram consultados no site
// https://codare.aurelio.net/2009/04/03/javascript-obter-e-mostrar-data-e-hora/#:~:text=%2F%2F%20Obt%C3%A9m%20a%20data%2Fhora,janeiro)%20var%20ano2%20%3D%20data.

const getDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() === 0 ? 1 : date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${day}-${month}-${year} ${hour}:${minutes}:${seconds}`;
};

module.exports = { getDate };
