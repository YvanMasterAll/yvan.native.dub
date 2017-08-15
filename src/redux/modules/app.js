export const types = {
    'PRESS_SEARCHBAR' : 'PRESS_SEARCHBAR'
}

const initialState = {
    searchbar_pressed: false
}

export const actions = {
    press_searchbar: ({ f, state }) => {
        initialState.searchbar_pressed = f
        return {type: types.PRESS_SEARCHBAR, f: f}
    }
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.PRESS_SEARCHBAR:
            return {...state, searchbar_pressed: action.f}
        default: 
            return state
    }
}
