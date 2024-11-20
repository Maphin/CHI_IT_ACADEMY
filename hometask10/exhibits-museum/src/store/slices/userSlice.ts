'use client';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser';
import { UsersAPI } from '../../api/usersAPI';
import { UserStatus } from '../../types/UserStatus';
import { removeAuthToken, setAuthToken } from '../../api';

interface UserState {
    token: string | null;
    isAuthenticated: boolean;
    user: IUser | null;
    status: UserStatus
}

const saveToken = (token: string) => {
    //if (typeof window !== "undefined") {
        localStorage.setItem('token', token);
        setAuthToken(token);
    //}
  };

  const removeToken = () => {
    //if (typeof window !== "undefined") {
        localStorage.removeItem('token');
        removeAuthToken();
    //}
  };

  const loadToken = (): string | null => {
    //if (typeof window !== "undefined") {
        const token = localStorage.getItem('token');
        setAuthToken(token!);
        return token;
    //}
    return null;
  };

const initializeUser = async () => {
    const token = loadToken();

    if (token) {
        try {
            const userData = await UsersAPI.getMe();

            return {
                token,
                isAuthenticated: true,
                user: {
                    id: userData.data.id,
                    username: userData.data.username
                },
                status: UserStatus.LOGGED_IN
            }
        } catch (err : any) {
            removeToken();
            throw new Error("Failed to get user info", err);
        }
    }

    return {
        token: null,
        isAuthenticated: false,
        user: null,
        status: UserStatus.LOGGED_OUT
    }
}

// const getIsAuthenticated = (token: string) => {
//     return token ? true : false;
// }

// const initialState: UserState = {
//     token: loadToken(),
//     isAuthenticated: false,
//     user: null,
//     status: UserStatus.LOGGED_OUT
// };

const initialState: UserState = await initializeUser();


export const login = createAsyncThunk(
    'user/login',
    async ({ username, password } : { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await UsersAPI.login({ username, password });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            state.status = UserStatus.LOGGED_OUT;
            removeToken();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = UserStatus.LOGGING_IN;
            })
            .addCase(login.fulfilled, (state, action : PayloadAction<{ access_token: string; username: string; userId: number}>) => {
                state.token = action.payload.access_token;
                const userData = {id: action.payload.userId, username: action.payload.username};
                state.user = userData;
                state.isAuthenticated = true;
                state.status = UserStatus.LOGGED_IN;
                saveToken(action.payload.access_token);
            })
            .addCase(login.rejected, (state) => {
                state.status = UserStatus.LOGGED_OUT;
            })
    },
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;