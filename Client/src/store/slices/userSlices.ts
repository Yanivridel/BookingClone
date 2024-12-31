import { removeCookie } from "@/utils/cookies";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 


interface UserState {

}

interface SetUserPayload {

}


const initialState: UserState = {
    
};

const userSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<SetUserPayload>) => {
            
        },
        unsetUser: (state) => {
        
            removeCookie("token");
        },
        
    },
})

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;