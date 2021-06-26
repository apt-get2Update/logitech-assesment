export default function(state = [], newState, asks, orderBy = "price") {
  let priceExists = false;

  if (state.length > 0) {
    state.forEach((row, index) => {
      if (row.price && newState.price && row.price === newState.price) {
        //Price already exists, so it should only update current row.
        priceExists = true;
        state[index].count = newState.count;
        state[index].amount = newState.amount;
      }
    });
  }

  if (priceExists === true) {
    priceExists = false;
    return state.slice();
  } else {
    let newStateCombined = [...state, newState];
    //Sort form lowest to highest price before returning. asks
    //Sort form highest to lowest  price before returning. Bits
    newStateCombined.sort(function(a, b) {
      return asks ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
    });

    if (newStateCombined.length > 25) {
      newStateCombined.pop();
    }

    // if (newStateCombined.length > 0) {
    //   newStateCombined.forEach(function(row, index) {
    //     if (!row || row.count === 0) {
    //       newStateCombined.splice(index, 1);
    //     }

    //     if (asks && (!row || row.amount > 0)) {
    //       newStateCombined.splice(index, 1);
    //     }
    //   });
    // }

    return newStateCombined
      .filter((row) => row && row.amount !== 0)
      .map((row, index) => {
        if (newStateCombined[index - 1] && newStateCombined[index - 1].total) {
          return {
            ...row,
            total:
              parseFloat(newStateCombined[index - 1].total) +
              Math.abs(parseFloat(row.amount)),
          };
        } else {
          return { ...row, total: parseFloat(row.amount) };
        }
      });
  }
}
