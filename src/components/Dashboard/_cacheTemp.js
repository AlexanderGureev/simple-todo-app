// const TODOS_POSITION_CACHE_KEY = "TODOS_POSITION_CACHE";

// const [todosPositionCache, setTodosPositionCache] = useLocalStorage(
//   TODOS_POSITION_CACHE_KEY,
//   {}
// );

// const filterByCachedPosition = fetchedTodos => {
//   const filterKey = mapFilterKey(filterOptions);

//   if (
//     !todosPositionCache[activeCategory] ||
//     !todosPositionCache[activeCategory][filterKey]
//   )
//     return fetchedTodos;

//   const cachedTodosPosition = todosPositionCache[activeCategory][filterKey];
//   const positionedTodos = cachedTodosPosition.reduce((acc, id) => {
//     const foundTodo = fetchedTodos.find(todo => todo.id === id);
//     if (!foundTodo) return acc;
//     return [...acc, foundTodo];
//   }, []);

//   if (!positionedTodos.length) return fetchedTodos;
//   return positionedTodos;
// };

// const clearTodosCache = () => setTodosPositionCache({});
// const deleteCachedTodoById = (todoId, categoryId) => {
//   const cacheByFilter = Object.entries(todosPositionCache[categoryId]);
//   const filteredCachedTodosByCategory = cacheByFilter.reduce(
//     (acc, [filter, todosIds]) => ({
//       ...acc,
//       [filter]: todosIds.filter(id => id !== todoId)
//     }),
//     {}
//   );

//   setTodosPositionCache({
//     ...todosPositionCache,
//     [activeCategory]: filteredCachedTodosByCategory
//   });
// };
// const updateTodosCache = movedTodos => {
//   const filterKey = mapFilterKey(filterOptions);

//   console.log("update");
//   const newCache = {
//     ...todosPositionCache,
//     [activeCategory]: {
//       ...(todosPositionCache[activeCategory] || {}),
//       [filterKey]: movedTodos.map(({ id }) => id)
//     }
//   };

//   setTodosPositionCache(newCache);
// };
