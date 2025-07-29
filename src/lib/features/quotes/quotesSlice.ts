import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuoteDetails, fetchQuotes, createQuote } from "./quotesThunk"; // Assume you have async thunks

export interface QuoteFormState {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDateTime: string; // ISO string
  passengers: number;
  vehicleType: string;
  estimatedFare: number;
  isRoundTrip: boolean;
  returnDateTime?: string;
  flightNumber?: string;
  specialInstructions?: string;
  luggage?: number;
}

export interface QuotesState {
  form: QuoteFormState;
  loading: boolean;
  data: any; // Replace with your Quote type if needed
  error: string ;
}

const initialFormState: QuoteFormState = {
  pickupLocation: "",
  dropoffLocation: "",
  pickupDateTime: "",
  passengers: 1,
  vehicleType: "",
  estimatedFare: 0,
  isRoundTrip: false,
  returnDateTime: '',
  flightNumber: undefined,
  specialInstructions: undefined,
  luggage: 0,
};

const initialState: QuotesState = {
  form: initialFormState,
  loading: false,
  data: null,
  error: '',
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setQuoteField: <K extends keyof QuoteFormState>(
      state: QuotesState,
      action: PayloadAction<{ field: K; value: QuoteFormState[K] }>
    ) => {
      state.form[action.payload.field] = action.payload.value;
    },
    resetQuote: (state) => {
      state.form = initialFormState;
    },
    setQuote: (state, action: PayloadAction<QuoteFormState>) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotes.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getQuoteDetails.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getQuoteDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getQuoteDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(createQuote.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.form = initialFormState;
      })
      .addCase(createQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuoteField, resetQuote, setQuote } = quotesSlice.actions;
export default quotesSlice.reducer;
