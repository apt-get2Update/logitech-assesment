function updateBidsOrderBook(newBidsData, orderBy) {
  return {
    type: 'UPDATE_BIDS_ORDER_BOOK',
    newBidsData: newBidsData,
    orderBy: orderBy
  }
}
export default updateBidsOrderBook;