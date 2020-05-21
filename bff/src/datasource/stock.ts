import { RESTDataSource, Response } from "apollo-datasource-rest";
import { baseURL } from "./config";

export class Stock extends RESTDataSource<any> {
  constructor() {
    super();
    this.baseURL = baseURL;
  }
  protected async didReceiveResponse<TResult = any>(
    response: Response
  ): Promise<TResult> {
    if (response.ok) {
      const totalCountHeader = response.headers.get("Total-Count");
      return (this.parseBody(response).then(() => ({
        totalCountHeader,
      })) as any) as Promise<TResult>;
    } else {
      throw await this.errorFromResponse(response);
    }
  }
  async getStocksByArticleId(articleId: string) {
    const { totalCountHeader } = await this.get(`items/${articleId}/stockers`);
    return totalCountHeader;
  }
}
