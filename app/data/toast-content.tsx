export interface ToastContent {
    title: string
    description: string
    variant: "destructive" | "default",
    action?: any
}
