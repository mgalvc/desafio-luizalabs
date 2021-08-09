import BadRequestError from "../exceptions/bad-request.error";
import NotFoundError from "../exceptions/not-found.error";
import ClientRepository from "../repositories/client.repository";
import ProductService from "../services/product.service";
import GeneralResponser from "./responsers/general.responser";

export default class ClientProductAction {
  constructor(
    private repository = new ClientRepository(),
    private productService = new ProductService()
  ) {}

  async addToWishlist(clientId: string, productId: string) {
    try {
      await this.productService.getProductDetails(productId);
      await this.repository.addProductToWishlist(clientId, productId);
      return GeneralResponser.successResponse();
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new BadRequestError(err.message);
      }

      throw err;
    }
  }

  async removeFromWishlist(clientId: string, productId: string) {
    await this.repository.removeProductFromWishlist(clientId, productId);
    return GeneralResponser.successResponse();
  }
}