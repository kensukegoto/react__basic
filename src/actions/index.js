export default INCREMENT = 'INCREMENT'
export default DECREMENT = 'DECREMENT'

export const increment = () => ({
    type: INCREMENT
})

export const decrement = () => ({
    type: DECREMENT
})