import { IClient } from "../models/client.model";
import ClientRepository from "../repositories/client.repository";
import GeneralResponse from "../response-builders/general.response";
import ProductService from "../services/product.service";

export default class ClientAction {
  constructor(
    private clientRepository = new ClientRepository(),
    private productService = new ProductService()
  ) {}
  
  async create(name: string, email: string) {
    await this.clientRepository.add({ name, email });
    return GeneralResponse.successResponse();
  }

  async list() {
    const clients = await this.clientRepository.list();
    return GeneralResponse.successResponse(clients);
  }

  async get(id: string) {
    const client = await this.clientRepository.get(id);
    const wishlistDetails = [];
    
    for (const productId of client.wishlist) {
      const product = await this.productService.getProductDetails(productId);
      wishlistDetails.push(product)
    }
    
    client.wishlist = wishlistDetails;
    return GeneralResponse.successResponse(client);
  }

  async update(id: string, data: IClient) {
    await this.clientRepository.update(id, data);
    return GeneralResponse.successResponse();
  }

  async delete(id: string) {
    await this.clientRepository.delete(id);
    return GeneralResponse.successResponse();
  }
}