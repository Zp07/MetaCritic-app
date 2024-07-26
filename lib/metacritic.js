export async function getLatestGames() {
  const LATEST_GAMES =
    "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u";

  const rawData = await fetch(LATEST_GAMES);
  const json = await rawData.json();

  const {
    data: { items },
  } = json;

  return items.map((item) => {
    const {
      description,
      slug,
      releaseDate,
      image,
      criticScoreSummary,
      tittle,
    } = item;
    const { score } = criticScoreSummary;

    //crea la imagen
    const { bucketType, bucketPath } = image;
    const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

    return {
      description,
      releaseDate,
      score,
      slug,
      tittle,
      image: img,
    };
  });
}

export async function getGameDetails(slug) {
  const GAME_DETAILS = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;

  const rawData = await fetch(GAME_DETAILS);
  const json = rawData.json();

  const { component } = json;
  const { tittle, description, criticScoreSummary, images } = component[0];
  const { score } = criticScoreSummary;

  //get the card image
  const cardImage = images.find((image) => image.typeName === "cardImage");
  const { bucketType, bucketPath } = cardImage;
  const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

  const rawReview = component[3].data.items;

  //get the reviews
  const reviews = rawReview.map((review) => {
    const { quote, score, date, publicationName, author } = review;
    return { quote, score, date, publicationName, author };
  });

  return {
    img,
    tittle,
    slug,
    description,
    reviews,
  };
}
