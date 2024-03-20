const defaultPagination = {
  currentPage: 1,
  perPage: 5,
};

export const addPagination = (req) => {
  const currentPage =
    Number(req.query.currentPage) || defaultPagination.currentPage;
  const perPage = Number(req.query.perPage) || defaultPagination.perPage;
  const skipValue = (currentPage - 1) * perPage;
  const searchKey = req.query?.searchKey || "";
  return searchKey.length
    ? { currentPage, perPage, skipValue, searchKey }
    : { currentPage, perPage, skipValue };
};

export default addPagination;
