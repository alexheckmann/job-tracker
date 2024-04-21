export interface ClientStateStore<T> {
    data: T,
    setData: (data: T) => void
}
