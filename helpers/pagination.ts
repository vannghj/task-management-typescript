interface ObjectPagination {
    currentPage: number,
    limitItem: number,
    skip?: number,
    totalPage?: number
}
const paginationHelper = (objectPagination:ObjectPagination, query:Record<string , any>, coutRecord:number):ObjectPagination => {
    if(query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }

    if(query.limit) {
        objectPagination.limitItem = parseInt(query.limit);
    }
    objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItem;
    const totalPage = Math.ceil(coutRecord/objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    return objectPagination;
}
export default paginationHelper