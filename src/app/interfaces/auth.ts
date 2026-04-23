export interface Auth {
    register(user: any): void;
    login(email: string, pass: string): boolean;
    isLoggedIn(): boolean;
    logout(): void;
}
