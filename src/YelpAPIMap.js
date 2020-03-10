
// Use to convert from our labels to the appropriate Yelp queries
const yelpMap = {
  japanese: ['japanese', 'sushi'],
  italian: ['italian'],
  indian: ['indpak'],
  chinese: ['chinese', 'hotpot'],
  mediterranean: ['mediterranean'],
  thai: ['thai'],
  korean: ['korean'],
  mexican: ['mexican'],
  american: ['newamerican', 'tradamerican', 'pizza', 'sandwiches', 'burgers', 'cheesesteaks'],
  fast_food: ['hotdogs, food_court'],
  dessert: ['desserts'],
  vegan: ['vegan'],
  coffee: ['coffee', 'coffeeroasteries'],
  juice: ['juicebars'],
  boba: ['bubbletea'],
  bars: ['bars'],
  hiking: ['hiking'],
  climbing: ['rock_climbing'],
  boating: ['boating'],
  kayaking: ['rafting'],
  yoga: ['yoga'],
  cycling: ['bicyclepaths'],
  museum: ['museums'],
  beach: ['beaches'],
  arcade: ['arcades'],
  cinema: ['movietheaters'],
  zoo: ['zoos','aquariums'],
  shopping: ['shoppingcenters']
};

export default yelpMap;
