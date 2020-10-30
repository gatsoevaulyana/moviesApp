function sortMovies(movies, shouldBeSorted) {

    if (shouldBeSorted) {
        movies.sort((objA, objB) => {
            return ((objA['title'].toLowerCase() > objB['title'].toLowerCase()) ? 1 : -1)
        })
    }

    return [...movies];

}

export default sortMovies;

