import { createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../axiosClient";


export const claimSlice = createSlice({
    name: "claim",
    initialState: {
        data: []
    },
    reducers: {
        setClaims: (state, action) => {
            state.data = action.payload;
        }
    },
});

export const { setClaims } = claimSlice.actions;

export const fetchClaims = () => {
    return async (dispatch) => {
        const { data } = await instanceAxios.get("/claims", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        });

        dispatch(setClaims(data));
    };
}

export default claimSlice.reducer;