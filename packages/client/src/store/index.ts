import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {fetchUsersAction} from "@/store/actions";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {Provider} from "react-redux";



export type User = {
    username: string,
    id: number,
    email: string
}

type UserStateType = {
    users: User[]
}

type FetchUserSccessType = User[]
type FetchUsersFailPayload = void


type UserActionTypes =
//     {
//     payload: undefined;
//     type: "counter/increment";
// } | {
//     payload: undefined;
//     type: "counter/decrement";
// } | {
//     payload: number;
//     type: "counter/incrementByAmount";
// } |
    FetchUserSccessType

const initialState: UserStateType = {
    users: []
}

interface Payload {
    users: User[]
}

const userSlice = createSlice({
    name: "userSlick",
    initialState: initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder.addCase(fetchUsersAction.fulfilled, (state, action: PayloadAction<FetchUserSccessType>) => {
            state.users = action.payload
        })

        builder.addCase(fetchUsersAction.rejected, (state, action: any) => {
            // state.users = []
        })

    }
})


const store = configureStore({
    reducer: {
        userState: userSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store
