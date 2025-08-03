import { GetQuotesApiService } from "@/services/GetQoutesApiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuotesState } from "./quotesSlice";

// Thunk to fetch quotes
export const fetchQuotes = createAsyncThunk(
  "quotes/fetchQuotes",
  async (arg: Record<string, any>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await GetQuotesApiService.getInstance().getQuotes(arg, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to create a new quote
export const createQuote = createAsyncThunk(
  "quotes/createQuote",
  async (quoteData: QuotesState["form"], { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await GetQuotesApiService.getInstance().createQuote(
        quoteData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return await response;
    } catch (error: any) {
      console.error("Create Quote Error:", error.message);
      return rejectWithValue(error?.message || "Failed to create quote");
    }
  }
);

// Thunk to get quote details
export const getQuoteDetails = createAsyncThunk(
  "quotes/getQuoteDetails",
  async (quoteId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Fetching quote details for ID:", quoteId);
      const response = await GetQuotesApiService.getInstance().getQuoteById(
        quoteId,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
