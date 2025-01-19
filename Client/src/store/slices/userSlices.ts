import { ISavedList, ISearchEntry, UserState } from "@/types/userTypes";
import { removeCookie } from "@/utils/cookies";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 


const initialState: UserState = {
    _id: "",
    username: "",
    fName: "",
    lName: "",
    email: "",
    password: "",
    user_image: "",
    coinType: "USD", 
    language: "English",
    search: [],
    interested: [],
    savedLists: [],
    geniusLevel: 1,
};

const userSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<UserState>>) => {
            const payload = action.payload;

            if (typeof payload._id === "string") state._id = payload._id;
            if (typeof payload.username === "string") state.username = payload.username;
            if (typeof payload.fName === "string") state.fName = payload.fName;
            if (typeof payload.lName === "string") state.lName = payload.lName;
            if (typeof payload.email === "string") state.email = payload.email;
            if (typeof payload.password === "string") state.password = payload.password;
            if (typeof payload.user_image === "string") state.user_image = payload.user_image;
            if (typeof payload.coinType === "string") state.coinType = payload.coinType;
            if (typeof payload.language === "string") state.language = payload.language;
            if (Array.isArray(payload.search)) state.search = payload.search;
            if (Array.isArray(payload.interested)) state.interested = payload.interested;
            if (Array.isArray(payload.savedLists)) state.savedLists = payload.savedLists;
            if ([1, 2, 3].includes(payload.geniusLevel as number)) state.geniusLevel = payload.geniusLevel as 1 | 2 | 3;
        },
        unsetUser: (state) => {
            Object.assign(state, initialState);
            removeCookie("token");
        },
        addSearchEntry: (state, action: PayloadAction<ISearchEntry[]>) => {
            state.search = action.payload;
        },
        addInterest: (state, action: PayloadAction<string[]>) => {
            state.interested = action.payload;
        },
        updateSavedList: (state, action: PayloadAction<ISavedList[]>) => {
            state.savedLists = action.payload;
        }
    },
})

export const { setUser, unsetUser, addSearchEntry, addInterest, updateSavedList } = userSlice.actions;

export default userSlice.reducer;