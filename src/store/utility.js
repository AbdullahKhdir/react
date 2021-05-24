export const updateObj = (state, toBeUpdated) => {
  return{
    ...state,
    ...toBeUpdated
  }
}
