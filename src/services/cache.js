class Cache {
  loadState = (...keys) => {
    try {
      const storage = keys.reduce((acc, key) => {
        const item = localStorage.getItem(key);

        return !item
          ? acc
          : {
              [key]: JSON.parse(item),
              ...acc
            };
      }, {});

      return storage;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  saveState = (key, state) => {
    try {
      const packedState = JSON.stringify(state);
      localStorage.setItem(key, packedState);
    } catch (error) {
      return false;
    }
  };

  clearCache = () => localStorage.clear();
  removeItemInCache = key => {
    console.log(key);
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
}

export default Cache;

export const ACTIVE_CATEGORY_CACHE_KEY = "activeCategory";
export const ACTIVE_FILTER_CACHE_KEY = "filterOptions";
