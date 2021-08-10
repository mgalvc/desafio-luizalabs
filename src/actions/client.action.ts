import { IClient } from "../models/client.model";
import ClientRepository from "../repositories/client.repository";
import ProductService from "../services/product.service";
import GeneralResponser from "./responsers/general.responser";

export default class ClientAction {
  constructor(
    private clientRepository = new ClientRepository(),
    private productService = new ProductService()
  ) {}
  
  async create(name: string, email: string) {
    await this.clientRepository.add({ name, email });
    return GeneralResponser.successResponse();
  }

  async list() {
    const clients = await this.clientRepository.list();
    return GeneralResponser.successResponse(clients);
  }

  async get(id: string) {
    const client = await this.clientRepository.get(id);
    const { wishlist } = client;
    const wishlistDetails = [];

    for (const productId of wishlist || []) {
      const product = await this.productService.getProductDetails(productId);
      wishlistDetails.push(product)
    }
    
    client.wishlist = wishlistDetails;
    return GeneralResponser.successResponse(client);
  }

  async update(id: string, data: IClient) {
    await this.clientRepository.update(id, data);
    return GeneralResponser.successResponse();
  }

  async delete(id: string) {
    await this.clientRepository.delete(id);
    return GeneralResponser.successResponse();
  }
}