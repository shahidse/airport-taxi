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

    async getQuotes(params: { page?: number; limit?: number }, options?: RequestInit) {
        const query = new URLSearchParams(
            Object.entries(params)
                .filter(([_, v]) => v !== undefined && v !== null)
                .map(([k, v]) => [k, String(v)])
        ).toString();
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