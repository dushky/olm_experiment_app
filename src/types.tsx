export type WsData = {
    name: string,
    data: string[],
    defaultVisibilityFor: string[]
}

export type WsResponse = {
    finished?: boolean,
    error?: string,
    data?: WsData[]
}