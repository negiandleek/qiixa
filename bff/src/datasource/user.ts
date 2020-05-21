import { RESTDataSource } from "apollo-datasource-rest";
import { baseURL } from "./config";

export class UserAPI extends RESTDataSource<any> {
  constructor() {
    super();
    this.baseURL = baseURL;
  }
  static enrichUser(planData: any) {
    return {
      id: planData.id,
      profileImage: planData.profile_image_url,
      description: planData.description || undefined,
      name: planData.name || undefined,
      articles: [],
    };
  }
  async getUserById(userId: string) {
    const response = await this.get(`users/${userId}`);
    return UserAPI.enrichUser(response);
  }
}
