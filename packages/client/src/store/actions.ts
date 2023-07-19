import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "@/store/index";



export const fetchUsersAction = createAsyncThunk<Array<User>, undefined>(
    "fetch-users",
    async (payload, thunkAPI) => {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );
            const data = await response.json();
            return data;
        } catch (ex) {
            return []
        }
    }
);
