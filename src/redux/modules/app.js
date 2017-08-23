export const types = {
    'PRESS_SEARCHBAR': 'PRESS_SEARCHBAR',
    'HOME_SCROLL_ON': 'HOME_SCROLL_ON'
}

const initialState = {
    searchbar_pressed: false,
    home_scroll_down: false
}

export const actions = {
    press_searchbar: ({ f, state }) => {
        initialState.searchbar_pressed = f
        return {type: types.PRESS_SEARCHBAR, f: f}
    },
    home_scroll_on: ({ state, home_scroll_down }) => {
        return {type: types.HOME_SCROLL_ON, home_scroll_down: home_scroll_down}
    }
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.PRESS_SEARCHBAR:
            return {...state, searchbar_pressed: action.f}
        case types.HOME_SCROLL_ON:
            return {...state, home_scroll_down: action.home_scroll_down}
        default: 
            return state
    }
}
