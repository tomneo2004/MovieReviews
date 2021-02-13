export default function getMovieRating(
  vote_count: number,
  vote_average: number
) {
  let ratingScore: number = null;
  if (vote_count > 0) {
    ratingScore = Math.round(vote_average * 10);
  }
  return ratingScore;
}
