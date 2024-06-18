/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from "swr";
import axios from "../lib/axios.config";
import { Book } from "../types";


export default function useBooks() {

    const { data: books, isLoading, error, mutate } = useSWR<Book[]>("/books", async (url: string) => {
        const { data } = await axios.get(url);
        return data.books;
    });

    return {
        books,
        isLoading,
        error,
    }
}