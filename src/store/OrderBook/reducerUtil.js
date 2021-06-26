export default function(state = [], newState, asks) {
  let priceExists = false;

  if (state.length > 0) {
    state.forEach((row, index) =>{
      if (
        state[index].price &&
        newState.price &&
        state[index].price === newState.price
      ) {
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
      return asks ? a.price - b.price : b.price - a.price ;
    });

    if (newStateCombined.length > 50) {
      newStateCombined.pop();
    }

    if (newStateCombined.length > 0) {
      newStateCombined.forEach(function(row, index) {
        if (!row || row.count === 0) {
          newStateCombined.splice(index, 1);
        }

        if (asks && (!row || row.amount > 0)) {
          newStateCombined.splice(index, 1);
        }
      });
    }

    return newStateCombined.map((row, index)=>{
        if (newStateCombined[index - 1] && newStateCombined[index - 1].total) {
            return {...row, total:(parseFloat(newStateCombined[index - 1].total) + Math.abs(parseFloat(row.amount))).toFixed(4)};
        }
        else{
            return {...row,total: parseFloat(row.amount).toFixed(4)};
        }
    });
  }
}
