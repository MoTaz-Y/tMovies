const apiConfig = {
  apiKey: "537b2b4f531f7f24cf82bbac9260de77",
  baseUrl: "https://api.themoviedb.com",
  originalImage: (imagePath) =>
    `https://image.tmdb.org/t/p/original/${imagePath}`,
  w500Image: (imagePath) =>
    `https://image.tmdb.org/t/p/original/w500/${imagePath}`,
};

export default apiConfig;
