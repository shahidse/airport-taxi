import { BaseApiService } from "./BaseApiService";

export class GetQuotesApiService extends BaseApiService {
    constructor(apiUrl?: string) {
        super(apiUrl);
    }

    private static instance: GetQuotesApiService;

    public static getInstance(apiUrl?: string): GetQuotesApiService {
        if (!GetQuotesApiService.instance) {
            GetQuotesApiService.instance = new GetQuotesApiService(apiUrl);
        }
        return GetQuotesApiService.instance;
    }

    async getQuotes(params: Record<string, any>, options?: RequestInit) {
        const query = new URLSearchParams(params).toString();
        return await this.get(`quotes?${query}`, options);
    }

    async getQuoteById(quoteId: string, options?: RequestInit) {
        return await this.get(`quotes/${quoteId}`, options);
    }
    
    async createQuote(data: Record<string, any>, options?: RequestInit) {
        return await this.post("quotes", data, options);
    }

    async deleteQuote(quoteId: string, options?: RequestInit) {
        return await this.delete(`quotes/${quoteId}`, options);
    }
}