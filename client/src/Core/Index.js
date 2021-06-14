import { createContext } from 'react'


export const userContext = createContext()
export const userInitial = []
export const userReducer = (state, action) => {
    switch (action.opr) {
        case "set":
            return action.data
        default:
            return userInitial
    }
}



export const wallContext = createContext()
export const wallInitial = []
export const wallReducer = (state, action) => {
    switch (action.opr) {
        case "set":
            return action.data
        default:
            return wallInitial
    }
}