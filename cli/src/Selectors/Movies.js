import { createSelector } from 'reselect';
import sortMovies from '../SortMovies';

const booksSelector = state => state.movies;
const shouldBeSorted = state => state.shouldBeSorted;
const sortMoviesSelector = createSelector(
    booksSelector,
    shouldBeSorted,
    (movies, shouldBeSorted) =>
        sortMovies(movies, shouldBeSorted)

);
export default sortMoviesSelector;
