import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Campaign {
    id: number;
    name: string;
    page: string;
    status: string;
    last_updated: string;
    passed: number;
    total: number;
    link: string;
}

interface CampaignState {
    campaigns: Campaign[];
    loading: boolean;
    error: string | null;
}

const initialState: CampaignState = {
    campaigns: [],
    loading: false,
    error: null,
};

// Async thunk для получения данных
export const fetchCampaigns = createAsyncThunk(
    'campaigns/fetchCampaigns',
    async () => {
        const response = await axios.get('/api/campaigns'); // замените на ваш URL
        return response.data;
    }
);

const campaignSlice = createSlice({
    name: 'campaigns',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampaigns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCampaigns.fulfilled, (state, action) => {
                state.loading = false;
                state.campaigns = action.payload;
            })
            .addCase(fetchCampaigns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch campaigns';
            });
    },
});

export const selectCampaigns = (state: { campaigns: CampaignState }) => state.campaigns;
export default campaignSlice.reducer;