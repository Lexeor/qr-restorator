const defaultState = {
  cart: {
    itemsList: [],
    totalQuantity: 0,
  },
  order: {
    orderId: -1,
    itemsList: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
};

export const loadState = (stateName) => {
  try {
    const serializedState = localStorage.getItem(stateName);
    if (serializedState === null) {
      return defaultState[stateName];
    } else {
      const data = JSON.parse(serializedState);
      const diff = new Date() - new Date(data.timestamp);
      // If older than 1 hour - reset cart to default state
      if (diff < 3.6e6) {
        return data.state;
      } else {
        return defaultState[stateName];
      }
    }
  } catch (err) {
    return defaultState[stateName];
  }
};

export const saveState = (stateName, state) => {
  const data = {
    timestamp: new Date(),
    state: state,
  };

  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(stateName, serializedState);
  } catch {
    // Ignore write errors
  }
};
