import { defineStore } from 'pinia'
import { urlApiBanks, urlApiCategories, urlApiLocations, urlApiPayments, urlApiProducts } from '~/constants';
import type { Categories, CategoriesResponse, Locations, ProductTimeType, Products, ProductsResponse, ProductType, LocationsResponse, Banks, BanksResponse, Payments, PaymentsResponse } from '~/types/api';

export const useAppStore = defineStore("app", {
  state: () => ({
    locations: [] as Locations,
    categories: [] as Categories,
    productsEventNewest: [] as Products,
    productsSeries: [] as Products,
    productsEventSeries: [] as Products,
    productsByCategory: [] as Products,
    productsByTag: [] as Products,
    productsByDate: [] as Products,
    productsByLocation: [] as Products,
    productsByType: [] as Products,
    banks: [] as Banks,
    payments: [] as Payments,
    isBanksLoaded: false,
    isPaymentsLoaded: false,
    isLocationsLoaded: false,
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
    async fetchLocations() {
      if (this.isLocationsLoaded) return;

      const { data } = await apiSaforiginal.get<LocationsResponse>(urlApiLocations);
      this.locations = data?.locations ?? [];
      this.isLocationsLoaded = true;
    },
    async fetchCategories() {
      if (this.isCategoriesLoaded) return;

      const { data } = await apiSaforiginal.get<CategoriesResponse>(urlApiCategories);
      this.categories = data?.categories ?? [];
      this.isCategoriesLoaded = true;
    },
    async fetchProductsEventNewest(type: ProductType[]) {
      if (this.isProductsEventNewestLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>(urlApiProducts + '?type=' + type + '&sort=-created_at');
      this.productsEventNewest = data?.products ?? [];
      this.isProductsEventNewestLoaded = true;
    },
    async fetchProductsSeries(type: ProductType) {
      if (this.isProductsSeriesLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>(urlApiProducts + '?type=' + type + '&sort=-created_at');
      this.productsSeries = data?.products ?? [];
      this.isProductsSeriesLoaded = true;
    },
    async fetchProductsEventSeries() {
      if (this.isProductsEventSeriesLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>(urlApiProducts);
      this.productsEventSeries = data?.products ?? [];
      this.isProductsEventSeriesLoaded = true;
    },
    async fetchProductsByCategory(category: string) {
      if (this.isProductsByCategoryLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>(urlApiProducts + '?category=' + category + '&sort=-created_at');
      this.productsByCategory = data?.products ?? [];
      this.isProductsByCategoryLoaded = true;
    },
    async fetchProductsByTag(tag: string) {
      if (this.isProductsByTagLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>(urlApiProducts + '?tag=' + tag + '&sort=-created_at');
      this.productsByTag = data?.products ?? [];
      this.isProductsByTagLoaded = true;
    },

    // all, today, tomorrow, this_week, this_month, next_month
    async fetchProductsByDate(date: ProductTimeType) {
      if (this.isProductsByDateLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>(urlApiProducts + '?date=' + date + '&sort=-created_at');
      this.productsByDate = data?.products ?? [];
      this.isProductsByDateLoaded = true;
    },
    async fetchProductsByLocation(location: string) {
      if (this.isProductsByLocationLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>(urlApiProducts + '?location=' + location + '&sort=-created_at');
      this.productsByLocation = data?.products ?? [];
      this.isProductsByLocationLoaded = true;
    },

    // online_event, offline_event, video_series, book, merchandise
    async fetchProductsByType(type: ProductType) {
      if (this.isProductsByTypeLoaded) return;

      const { data } = await apiSaforiginal.get<ProductsResponse>(urlApiProducts + '?type=' + type + '&sort=-created_at');
      this.productsByType = data?.products ?? [];
      this.isProductsByTypeLoaded = true;
    },

    async fetchBanks() {
      if (this.isBanksLoaded) return;

      const { data } = await apiSaforiginal.get<BanksResponse>(urlApiBanks);
      this.banks = data?.banks ?? [];
      this.isBanksLoaded = true;
    },
    async fetchPayments() {
      if (this.isPaymentsLoaded) return;

      const { data } = await apiSaforiginal.get<PaymentsResponse>(urlApiPayments);
      this.payments = data?.payments ?? [];
      this.isPaymentsLoaded = true;
    },
    // Optional reset, useful for full refresh / logout
    reset() {
      this.categories = [] as Categories;
      this.payments = [] as Payments;
      this.banks = [] as Banks;
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
      this.isPaymentsLoaded = false;
      this.isBanksLoaded = false;
    }
  },
});
