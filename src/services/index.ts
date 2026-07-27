/**
 * Ponto único de acesso à camada de serviços.
 *
 * Componentes importam daqui — nunca de `@/data/mock*`.
 * Fluxo: Componente → Serviço → Fonte de dados (hoje mock, amanhã Supabase).
 */

export { categoryService, type CategoryService } from "./category-service";
export { couponService, type CouponQuery, type CouponService } from "./coupon-service";
export { creditService, type CreditService } from "./credit-service";
export {
  productService,
  type ProductQuery,
  type ProductService,
} from "./product-service";
export { storeService, type StoreQuery, type StoreService } from "./store-service";
export {
  categoryQueries,
  couponQueries,
  productQueries,
  queryKeys,
  storeQueries,
} from "./queries";
export {
  NotFoundError,
  ServiceError,
  ValidationError,
  toUserMessage,
} from "./service-utils";
