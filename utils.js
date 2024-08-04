module.exports = {
  timeout: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  getRandomItemFromArray: (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  },
  
};
