export const types = {
    'TOPICVIDEO_FULLSCREEN' : 'TOPICVIDEO_FULLSCREEN'
}

const initialState = {
    topicvideo_fullscreen: {
        show: false,
        video: '',
        currentTime: ''
    }
}

export const actions = {
    topicvideo_fullscreen_show: ({ show, state }) => {
        initialState.topicvideo_fullscreen.show = show
        return {type: types.TOPICVIDEO_FULLSCREEN, show: show}
    }
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.TOPICVIDEO_FULLSCREEN:
            return {...state, topicvideo_fullscreen: action.show}
        default: 
            return state
    }
}
