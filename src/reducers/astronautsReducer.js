
const astronautsReducer = (state, action) => {
    switch (action.type) {
        case "POPULATE_ASTRONAUTS":
            return action.astronauts
        case "DELETE_ASTRONAUT":
            return state.filter(astronaut => astronaut.id !== action.id)
        case "UPDATE_ASTRONAUT":
            return (
                state.map(astronaut => {
                    if (astronaut.id === action.data.id) {
                        return {
                            ...action.data
                        }
                    }
                    else {
                        return astronaut
                    }
                })
            )
        case "CREATE_ASTRONAUT":
            return [
                ...state,
                { ...action.data }
            ]
        default:
            return state
    }
}

export default astronautsReducer