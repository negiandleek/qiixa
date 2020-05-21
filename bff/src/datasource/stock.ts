import { RESTDataSource } from "apollo-datasource-rest";
import { baseURL } from "./config";

export class Stock extends RESTDataSource<any> {
  constructor() {
    super();
    this.baseURL = baseURL;
  }
  static enrichStock(planData: any) {
    console.log(planData);
    return {
      stockCounts: 0,
      stockUser: [],
    };
  }
  async getStocksByArticleId(articleId: string, first: number, after: number) {
    const response = await this.get(`imtes/${articleId}/stockers`, {
      page: first,
      per_page: after,
    });
    console.warn(response.header);
    return response.map((item: any) => Stock.enrichStock(item));
  }
}
