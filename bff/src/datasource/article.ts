import { RESTDataSource, Response } from "apollo-datasource-rest";
import { baseURL } from "./config";

export class Article extends RESTDataSource<any> {
  constructor() {
    super();
    this.baseURL = baseURL;
  }
  enrichArticle(planData: any) {
    return {
      id: planData.id,
      title: planData.title,
      url: planData.url,
      user: planData.user,
    };
  }
  protected async didReceiveResponse<TResult = any>(
    response: Response
  ): Promise<TResult> {
    if (response.ok) {
      const linkHeader = response.headers.get("link");
      const hasPrev = linkHeader?.includes('rel="prev"');
      const hasNext = linkHeader?.includes('rel="next"');
      return (this.parseBody(response).then((data: any) => ({
        body: data,
        pageInfo: {
          hasPrev,
          hasNext,
        },
      })) as any) as Promise<TResult>;
    } else {
      throw await this.errorFromResponse(response);
    }
  }
  async getArticlesByUser(
    userId: string,
    first: number = 10,
    after: number = 1
  ) {
    const { body, pageInfo } = await this.get(`users/${userId}/items`, {
      per_page: first,
      page: after,
    });
    return {
      data: body.map((item: any) => this.enrichArticle(item)) || [],
      pageInfo,
    };
  }
}
