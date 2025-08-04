import { BaseApiService } from "./BaseApiService";
export class StripeApiService extends BaseApiService {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  private static instance: StripeApiService;

  public static getInstance(apiUrl?: string): StripeApiService {
    if (!StripeApiService.instance) {
      StripeApiService.instance = new StripeApiService(apiUrl);
    }
    return StripeApiService.instance;
  }

  async createPayment(data: any, options?: RequestInit) {
    return await this.post("create-payment-intent", data, options);
  }

}
