export function updateOrder(newOrder) {
    return {
      type: 'UPDATE_ORDER',
      data: newOrder
    }
  }
  export function updateVisualization(newVisualization) {
    return {
      type: 'UPDATE_VISUALIZATION',
      data: newVisualization
    }
  }
  export function updateFormat(format) {
    return {
      type: 'UPDATE_FORMAT',
      data: format
    }
  }