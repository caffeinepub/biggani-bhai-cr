import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Reservation {
    id: bigint;
    customerName: string;
    status: string;
    date: string;
    guestCount: bigint;
    time: string;
    notes: string;
    phone: string;
}
export interface MenuItem {
    id: bigint;
    name: string;
    isAvailable: boolean;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
}
export interface RestaurantInfo {
    name: string;
    email: string;
    address: string;
    openingHours: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMenuItem(item: MenuItem): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createReservation(reservation: Reservation): Promise<bigint>;
    deleteMenuItem(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMenuItem(id: bigint): Promise<MenuItem | null>;
    getMenuItems(): Promise<Array<MenuItem>>;
    getReservations(): Promise<Array<Reservation>>;
    getRestaurantInfo(): Promise<RestaurantInfo>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateMenuItem(id: bigint, item: MenuItem): Promise<void>;
    updateReservationStatus(id: bigint, status: string): Promise<void>;
    updateRestaurantInfo(info: RestaurantInfo): Promise<void>;
}
