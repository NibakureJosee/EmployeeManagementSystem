import { atom } from "recoil";
import { Product } from "../types";

export const showAddOrEditProductState = atom<{
    show: boolean,
    action: "add" | "edit",
    product?: Product
} | null>({
    key: "ShowAddProduct",
    default: null
});

export const showDeleteProductState = atom<{
    show: boolean,
    product?: Product
} | null>({
    key: "ShowDeleteProduct",
    default: null
});