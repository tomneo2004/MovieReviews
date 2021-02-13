export interface IFetchResponse<T> {
  data: T | null;
  error: any | null;
  isLoading: boolean;
}
