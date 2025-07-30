import { defineStore } from 'pinia'
import type { Categories, CategoriesResponse, ProductDateFilter, Products, ProductsResponse, ProductType } from '~/types/api';

export const useAppStore = defineStore("app", {
  state: () => ({
    categories: [] as Categories,
    productsEventNewest: [] as Products,
    productsSeries: [] as Products,
    productsEventSeries: [] as Products,
    productsByCategory: [] as Products,
    productsByTag: [] as Products,
    productsByDate: [] as Products,
    productsByLocation: [] as Products,
    productsByType: [] as Products,
    isCategoriesLoaded: false,
    isProductsEventNewestLoaded: false,
    isProductsSeriesLoaded: false,
    isProductsEventSeriesLoaded: false,
    isProductsByCategoryLoaded: false,
    isProductsByTagLoaded: false,
    isProductsByDateLoaded: false,
    isProductsByLocationLoaded: false,
    isProductsByTypeLoaded: false,
  }),
  actions: {
    async fetchCategories() {
      if (this.isCategoriesLoaded) return;

      const { data } = await apiSaforiginal.get<CategoriesResponse>('/v1/categories');
      this.categories = data?.categories ?? [];
      this.isCategoriesLoaded = true;
    },
    async fetchProductsEventNewest(type: ProductType[]) {
      if (this.isProductsEventNewestLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>('/v1/products?type=' + type + '&sort=-created_at');
      this.productsEventNewest = data?.products ?? [];
      this.isProductsEventNewestLoaded = true;
    },
    async fetchProductsSeries(type: ProductType) {
      if (this.isProductsSeriesLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>('/v1/products?type=' + type + '&sort=-created_at');
      this.productsSeries = data?.products ?? [];
      this.isProductsSeriesLoaded = true;
    },
    async fetchProductsEventSeries() {
      if (this.isProductsEventSeriesLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>('/v1/products');
      this.productsEventSeries = data?.products ?? [];
      this.isProductsEventSeriesLoaded = true;
    },
    async fetchProductsByCategory(category: string) {
      if (this.isProductsByCategoryLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>('/v1/products?category=' + category + '&sort=-created_at');
      this.productsByCategory = data?.products ?? [];
      this.isProductsByCategoryLoaded = true;
    },
    async fetchProductsByTag(tag: string) {
      if (this.isProductsByTagLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>('/v1/products?tag=' + tag + '&sort=-created_at');
      this.productsByTag = data?.products ?? [];
      this.isProductsByTagLoaded = true;
    },

    // all, today, tomorrow, this_week, this_month, next_month
    async fetchProductsByDate(date: ProductDateFilter) {
      if (this.isProductsByDateLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>('/v1/products?date=' + date + '&sort=-created_at');
      this.productsByDate = data?.products ?? [];
      this.isProductsByDateLoaded = true;
    },
    async fetchProductsByLocation(location: string) {
      if (this.isProductsByLocationLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>('/v1/products?location=' + location + '&sort=-created_at');
      this.productsByLocation = data?.products ?? [];
      this.isProductsByLocationLoaded = true;
    },

    // online_event, offline_event, video_series, book, merchandise
    async fetchProductsByType(type: ProductType) {
      if (this.isProductsByTypeLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>('/v1/products?type=' + type + '&sort=-created_at');
      this.productsByType = data?.products ?? [];
      this.isProductsByTypeLoaded = true;
    },
    // Optional reset, useful for full refresh / logout
    reset() {
      this.categories = [] as Categories;
      this.productsEventNewest = [] as Products;
      this.productsByCategory = [] as Products;
      this.productsByTag = [] as Products;
      this.productsByDate = [] as Products;
      this.productsByLocation = [] as Products;
      this.productsByType = [] as Products;
      this.isCategoriesLoaded = false;
      this.isProductsEventNewestLoaded = false;
      this.isProductsByCategoryLoaded = false;
      this.isProductsByTagLoaded = false;
      this.isProductsByDateLoaded = false;
      this.isProductsByLocationLoaded = false;
      this.isProductsByTypeLoaded = false;
    }
  },
});
