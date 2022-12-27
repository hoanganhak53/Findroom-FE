import Pagination from '@mui/material/Pagination';

export const PaginationComponent = ({ totalTasks, currentPage, paginate }) => {
    return (
        <div className="mt-4 d-flex justify-content-center">
            <Pagination
                count={Math.ceil(totalTasks / 10)}
                color="primary"
                shape="rounded"
                size="large"
                page={currentPage}
                onChange={paginate}
                variant="outlined"
                showFirstButton
                showLastButton
            />
        </div>
    );
};
