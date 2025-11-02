import { defineStore } from 'pinia'
import { urlApiBanks, urlApiBannerPopup, urlApiBannerSlider, urlApiCategories, urlApiLocations, urlApiPayments, urlApiProducts, urlApiTransactions } from '~/constants';
import type { Categories, CategoriesResponse, Locations, ProductTimeType, Products, ProductsResponse, ProductType, LocationsResponse, Banks, BanksResponse, Payments, PaymentsResponse, Banners, BannerResponse, Transactions, TransactionsResponse, Banner, PopupResponse } from '~/types/api';

export const useAppStore = defineStore("app", {
  state: () => ({
    locations: [] as Locations,
    categories: [] as Categories,
    popup: {} as Partial<Banner>,
    showPopup: false,
    banners: [] as Banners,
    productsEventNewest: [] as Products,
    productsSeries: [] as Products,
    productsEventSeries: [] as Products,
    productsByCategory: [] as Products,
    productsByTag: [] as Products,
    productsByDate: [] as Products,
    productsByLocation: [] as Products,
    productsByType: [] as Products,
    transactions: [] as Transactions,
    banks: [] as Banks,
    payments: [] as Payments,
    myProducts: [] as Payments,
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
    isBannerSliderLoaded: false,
    isTrasanctionsLoaded: false,
    isPopupsLoaded: false,
  }),
  actions: {
    async fetchLocations() {
      if (this.isLocationsLoaded) return;

      const { data } = await apiSaforiginal.get<LocationsResponse>(urlApiLocations);
      this.locations = data?.locations ?? [];
      this.isLocationsLoaded = true;
    },
    async fetchPopup() {
      if (this.isPopupsLoaded) return;

      try {
        const { data } = await apiSaforiginal.get<PopupResponse>(urlApiBannerPopup);
        this.showPopup = true;
        this.popup = data?.popup ?? {};
        this.isPopupsLoaded = true;
      } catch (error) {
        this.popup = {};
        this.showPopup = false;
        console.error('Error fetching popup:', error);
      }
    },
    async fetchBanners() {
      if (this.isBannerSliderLoaded) return;

      const { data } = await apiSaforiginal.get<BannerResponse>(urlApiBannerSlider);
      this.banners = data?.popups ?? [];
      this.isBannerSliderLoaded = true;
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
    async fetchTransactions() {
      if (this.isTrasanctionsLoaded) return;

      const { data } = await apiSaforiginal.get<TransactionsResponse>(urlApiTransactions + '?sort=-created_at?page=1&limit=10');
      this.transactions = data?.transactions ?? [];
      this.isTrasanctionsLoaded = true;
    },
    // Optional reset, useful for full refresh / logout
    reset() {
      this.categories = [] as Categories;
      this.payments = [] as Payments;
      this.banners = [] as Banners;
      this.popup = {} as Banner | object;
      this.banks = [] as Banks;
      this.productsEventNewest = [] as Products;
      this.productsByCategory = [] as Products;
      this.productsByTag = [] as Products;
      this.productsByDate = [] as Products;
      this.productsByLocation = [] as Products;
      this.productsByType = [] as Products;
      this.transactions = [] as Transactions;
      this.isCategoriesLoaded = false;
      this.isProductsEventNewestLoaded = false;
      this.isProductsByCategoryLoaded = false;
      this.isProductsByTagLoaded = false;
      this.isProductsByDateLoaded = false;
      this.isProductsByLocationLoaded = false;
      this.isProductsByTypeLoaded = false;
      this.isPaymentsLoaded = false;
      this.isBanksLoaded = false;
      this.isBannerSliderLoaded = false;
      this.isTrasanctionsLoaded = false;
      this.isPopupsLoaded = false;
      this.showPopup = false;
    }
  },
});
