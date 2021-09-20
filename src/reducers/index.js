import { combineReducers } from "redux"

const FETCH_BREED_IMAGES = 'FETCH_BREED_IMAGES'

export const fetchBreedImagesReducer = (state=[], action) => {
    switch (action.type){
        case 'FETCH_BREED_IMAGES': 
            return action.payload
        default:
            return state
    }
}

const reducers = combineReducers({
    breeds: fetchBreedImagesReducer
})
export default reducers