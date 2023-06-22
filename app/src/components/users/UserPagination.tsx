import React from "react";
import {ChangeEvent} from "react";
import {Pagination} from "flowbite-react";

const UserPagination = ({setCurrentPage, postsPerPage, totalPosts, currentPage}:
                            { setCurrentPage: (page: number) => void, postsPerPage: number, totalPosts: number, currentPage: number }) => {
    const handleChange = (page: number): void => {
        setCurrentPage(page)
    }
    return (
        <>
            <Pagination
                className="hidden sm:block mb-6"
                currentPage={currentPage}
                onPageChange={handleChange}
                totalPages={Math.ceil(totalPosts / postsPerPage)}
                nextLabel="Naprej"
                previousLabel="Nazaj"
            />
            <Pagination
                className="block sm:hidden mb-6"
                layout="navigation"
                nextLabel="Naprej"
                previousLabel="Nazaj"
                currentPage={currentPage}
                onPageChange={handleChange}
                totalPages={Math.ceil(totalPosts / postsPerPage)} />
        </>
    )
}

export default UserPagination;