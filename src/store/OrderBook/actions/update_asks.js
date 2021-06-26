function updateAsksOrderBook(newAsksData,orderBy) {
  return {
    type: 'UPDATE_ASKS_ORDER_BOOK',
    newAsksData: newAsksData,
    orderBy: orderBy
  }
}
export default updateAsksOrderBook;