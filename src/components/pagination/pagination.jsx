import ReactPaginate from 'react-paginate';
import { next, prev } from './pagination-img';
import './pagination.scss';

const Pagination = () => {
    const handlePageClick = ({ selected }) => {
        console.log(selected + 1)
    }
    return (
        <div className='pagination'>
            <ReactPaginate
                breakLabel="..."
                nextLabel={

                    <div className='flex items-center justify-start w-[100%]'>
                        <div className='next  px-[12px] py-[8px] flex justify-center items-center'>
                            <h1 className='text-[14px] font-[600] text-[#344054]'>Next</h1>
                            <img src={next} alt="next" />
                        </div>
                    </div>

                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={10}
                previousLabel={

                    <div className='flex items-center justify-start w-[100%]'>
                        <div className='next px-[12px] py-[8px] flex justify-center items-center'>
                            <img src={prev} alt="next" />
                            <h1 className='text-[14px] font-[600] text-[#344054]'>Previous</h1>
                        </div>
                    </div>
                }
                renderOnZeroPageCount={null}
                containerClassName='flex w-full justify-between items-center'
                activeClassName='bg-[#f9fafb] rounded-[8px]'
                pageLinkClassName='flex justify-center items-center w-[40px] h-[40px] rounded-[8px] p-[8px] hover:bg-[#f9fafb]'
            />
        </div>
    )
}

export default Pagination