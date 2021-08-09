import BadRequestError from "../exceptions/bad-request.errot";
import NotFoundError from "../exceptions/not-found.error";
import ClientRepository from "../repositories/client.repository";
import GeneralResponse from "../response-builders/general.response";
import ProductService from "../services/product.service";

export default class ClientProductAction {
  constructor(
    private repository = new ClientRepository(),
    private productService = new ProductService()
  ) {}

  async addToWishlist(clientId: string, productId: string) {
    try {
      await this.productService.getProductDetails(productId);
      await this.repository.addProductToWishlist(clientId, productId);
      return GeneralResponse.successResponse();
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new BadRequestError('Produto não encontrado');
      }

      throw err;
    }
  }

  async removeFromWishlist(clientId: string, productId: string) {
    await this.repository.removeProductFromWishlist(clientId, productId);
    return GeneralResponse.successResponse();
  }
}