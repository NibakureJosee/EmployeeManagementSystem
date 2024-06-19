import { Helmet } from "react-helmet";
import { Column } from "../../components/tables/Table";
import TableWrapper from "../../components/tables/TableWrapper";
import useBooks from "../../hooks/useBooks";
import { generatePageTitle } from "../../lib/utils";
import { Book } from "../../types";


const columns: Column<Book>[] = [
    {
        title: "ID",
        key: "id"
    },
    {
        title: "Name",
        key: "name"
    },
    {
        title: "Author",
        key: "author",
    },
    {
        title: "Publisher",
        key: "publisher",
    },
    {
        title: "Publication Year",
        key: "publicationYear",
    },
    {
        title: "Subject",
        key: "subject"
    }
]

export default function Books() {
    const { isLoading, books, error } = useBooks();
    return (
        <>
            <Helmet>
                <title>{generatePageTitle("Books")}</title>
            </Helmet>
            <TableWrapper
                columns={columns}
                data={books ?? []}
                loading={isLoading}
                error={error}
                title="Books"
                description="List of books in the Library"
            />
        </>
    )
}
