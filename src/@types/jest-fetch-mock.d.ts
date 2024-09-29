declare module 'jest-fetch-mock' {
    export function enableMocks(): void;
    export function resetMocks(): void;
    export function mockResponseOnce(response: string): void;
    export function mockRejectOnce(error: Error): void;
}
