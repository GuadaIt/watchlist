export default {
  addTrending: (context, payload) => {
    context.commit('appendTrending', payload)
  },
  addToWatchlist: (context, payload) => {
    context.commit('appendWatchlist', payload)
  },
  removeFromWatchlist: (context, payload) => {
    context.commit('removeItem', payload)
  },
  addResults: (context, payload) => {
    context.commit('updateResults', payload)
  }
}