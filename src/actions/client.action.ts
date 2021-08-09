import { IClient } from "../models/client.model";
import ClientRepository from "../repositories/client.repository";
import ProductService from "../services/product.service";

export default class ClientAction {
  constructor(
    private clientRepository = new ClientRepository(),
    private productService = new ProductService()
  ) {}
  
  async create(name: string, email: string) {
    await this.clientRepository.add({ name, email });
    return { success: true }
  }

  async list() {
    return this.clientRepository.list();
  }

  async get(id: string) {
    const client = await this.clientRepository.get(id);
    const wishlistDetails = [];
    
    for (const productId of client.wishlist) {
      const product = await this.productService.getProductDetails(productId);
      wishlistDetails.push(product)
    }
    
    client.wishlist = wishlistDetails;
    return client;
  }

  async update(id: string, data: IClient) {
    await this.clientRepository.update(id, data);
    return { success: true };
  }

  async delete(id: string) {
    await this.clientRepository.delete(id);
    return { success: true };
  }
}