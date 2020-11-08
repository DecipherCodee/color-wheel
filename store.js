const value = {};
const store = {};

const dispatch = (name, type, payload = {}) => {
  const newState = store[name][type](value[name], payload);
  // value = { ...value, ...newState };
  value[name] = newState;
  console.log("\nglobal dispatching\n");
};

export const useGStore = ({
  name,
  initialValue = undefined,
  initialDispatch = undefined,
}) => {
  if (name === null) {
    return [];
  }
  if ((initialValue === undefined || initialDispatch === undefined) && name) {
    console.log("\nnothing\n");
    return [value[name], dispatch];
  }
  value[name] = initialValue;

  // store = { ...store, ...initialDispatch };
  store[name] = initialDispatch;

  console.log("\ninitialised store\n");
  return [value[name], dispatch];
};
