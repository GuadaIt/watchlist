export default {
  appendTrending: (state, { movies, tv }) => {
    state.movies.push(...movies)
    state.tv.push(...tv)
  },
  appendWatchlist: (state, payload) => {
    const exists = state.watchlist.some(el => el.id === payload.id);
    if (!exists) state.watchlist.push(payload);      
  },
  removeItem: (state, payload) => {
    state.watchlist.some((el, i) => {
      if (el.id === payload.id) {
        state.watchlist.splice(i, 1)
      }
    });
  },
  updateResults: (state, payload) => {
    state.results = payload;
  }
};