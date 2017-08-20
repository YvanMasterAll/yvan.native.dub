export const types = {
    'TOPICVIDEO_PLAY_ON' : 'TOPICVIDEO_PLAY_ON'
}

const initialState = {
    topicvideo: {
        play_id: -1,
        seek: false,
        seek_time: 0.0,
        fullScreen: false
    }
}

export const actions = {
    topicvideo_play_on: ({ play_id, seek, seek_time, state, fullScreen }) => {
        initialState.topicvideo = { play_id, seek, seek_time, fullScreen }
        return {type: types.TOPICVIDEO_PLAY_ON, topicvideo: {play_id, seek, seek_time, fullScreen}}
    }
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.TOPICVIDEO_PLAY_ON:
            return {...state, topicvideo: action.topicvideo}
        default: 
            return state
    }
}
