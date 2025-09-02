/**
 * Transforms pagination information into the appropriate pagination component
 * elements
 *
 * @module PaginatorPresenter
 */

const SIMPLE_PAGINATOR = "simple";
const COMPLEX_START_PAGINATOR = "start";
const COMPLEX_MIDDLE_PAGINATOR = "middle";
const COMPLEX_END_PAGINATOR = "end";

/**
 * This takes the information provided (number of records and selected page
 * number) and uses it to generate the data needed for the
 * {@link https://design-system.service.gov.uk/components/pagination/ | GDS pagination component}.
 *
 * The pagination component is the thing seen at the bottom of pages which have
 * to display dynamic results, for example, search results for all claims. For
 * example,
 *
 * `<- Previous 1 ... 6 [7] 8 ... 42 Next ->`
 *
 * The first step is to take the totalRecords and divide them by our page
 * size (defaults to 10) to determine how many pages are needed. If only
 * 1 page is required (`totalRecords` is less then or equal to 10) no
 * pagination is needed and the presenter doesn't generate the component data.
 *
 * If pagination is needed, the next step is to determine the type ('simple' or 'complex').
 * This is because the paginator is expected to behave and display differently depending
 * on the number of pages and which page is selected.
 *
 * ## Previous & Next
 *
 * These when displayed will move the selected page forward and backwards by
 * one. However, the design system states
 *
 * > Do not show the previous page link on the first page – and do not show the
 * > next page link on the last page.
 *
 * So, one of the things this presenter needs to determine is whether both or
 * just one of the 'previous' and 'next' controls should be displayed.
 *
 * ## Page items
 *
 * The example previously given is for a large page range. It shows 7 'page
 * items'; first, previous, current, next and last plus 2 ellipses for skipped
 * pages. The ellipses are there because we are not expected to show a page item
 * for every page in the range. This is as per the design system guidance.
 *
 * > Show page numbers for: the current page, at least one page immediately before
 * > and after the current page, first and last pages. Use ellipses (…) to replace
 * > any skipped pages.
 *
 * ### Simple Pagination Type
 *
 * This applies for any scenario where the number of pages is 10 or less. In this
 * case we simply iterate from 1 up to the number of pages creating a page item
 * for each one. No ellipses are used. for example,
 *
 * `[1] 2 3 4 5 6 7 Next -->`
 *
 * ### Complex Pagination Type
 *
 * This applies where we have more than 10 pages of results. It means at least one
 * page item we will need to be an ellipsis. The next problem is determining if
 * both should be displayed, or only one and if only one where?
 *
 * To do this we break the complex component down into a further 3 types; start,
 * middle and end. They are determined based on which is the current page.
 *
 * #### Complex Start
 *
 * If the current page is one of the first 4 pages we define the pagination type
 * as 'complex start'. If, for example, the current page is `[2]` and we took
 * the guidance at face value we could have generated the paginator as
 *
 * `<- Previous 1 [2] 3 ... 42 Next ->`
 *
 * This control only displays 5 page items. But once the current page is `[5]`
 * or more we are required to show ellipsis at both ends.
 *
 * `<- Previous 1 ... 4 [5] 6 ... 42 Next ->`
 *
 * Now we would have displayed 7 page items. However, our approach removes the inconsistency
 * and always shows 7 page items. So, we meet the GDS guidance & make some improvements on top of it.
 * This means when `[2]` is the current page the paginator will display.
 *
 * `<- Previous 1 [2] 3 4 5 ... 42 Next ->`
 *
 * #### Complex Middle
 *
 * This applies where the current page is greater than 4 and less than the
 * number of pages minus 3 (for example, if the number of pages is 42 this means
 * the current page is greater than 4 and less than 39). If it is, we define the
 * pagination type as 'complex middle'.
 *
 * When this is the case the selected page is in the 'middle' and an ellipsis
 * needs to be shown at both ends.
 *
 * `<- Previous 1 ... 4 [5] 6 ... 42 Next ->`
 *
 * ##### Complex End
 *
 * When the current page is one of the last 4 pages we define the pagination
 * type as 'complex end'. If, for example, the number of pages is 42 and the
 * current page is 39 we'll generate the following paginator.
 *
 * `<- Previous 1 ... 38 [39] 40 41 42 Next ->`
 *
 * @param {Object} req - express request object containing pagination data like totalRecords, page etc
 * @param {string} path - The URL path stripped of its query params like page, sortBy
 * @returns {Object} If no pagination is needed just the `numberOfPages: 1` is
 *   returned else a `component:` property is also included that can be directly
 *   passed to the `govukPagination()` in the view.
 */
export const buildPagination = (req, path) => {
  const { pagination } = req;
  const { totalRecords, size } = pagination;
  const numberOfPages = Math.ceil(totalRecords / size);

  if (numberOfPages === 1) {
    return { numberOfPages };
  }

  const component = generateComponent(req, numberOfPages, path);

  return {
    component,
    numberOfPages,
  };
};

function generateComponent(req, numberOfPages, path) {
  const { page = 1, sortBy = "desc" } = req.query;
  const items = generateItems(req, numberOfPages, path);
  const component = { items };

  if (Number(page) !== 1) {
    component.previous = {
      href: `${path}?page=${Number(page) - 1}&sortBy=${sortBy}`,
    };
  }

  if (Number(page) !== numberOfPages) {
    component.next = {
      href: `${path}?page=${Number(page) + 1}&sortBy=${sortBy}`,
    };
  }

  return component;
}

function complexPaginatorEnd(req, numberOfPages, path) {
  const items = [];

  items.push(generateItem(req, 1, path));
  items.push({ ellipsis: true });
  items.push(generateItem(req, numberOfPages - 4, path));
  items.push(generateItem(req, numberOfPages - 3, path));
  items.push(generateItem(req, numberOfPages - 2, path));
  items.push(generateItem(req, numberOfPages - 1, path));
  items.push(generateItem(req, numberOfPages, path));

  return items;
}

function complexPaginatorMiddle(req, numberOfPages, path) {
  const { page = 1 } = req.query;
  const items = [];

  items.push(generateItem(req, 1, path));
  items.push({ ellipsis: true });
  items.push(generateItem(req, Number(page) - 1, path));
  items.push(generateItem(req, Number(page), path));
  items.push(generateItem(req, Number(page) + 1, path));
  items.push({ ellipsis: true });
  items.push(generateItem(req, numberOfPages, path));

  return items;
}

function complexPaginatorStart(req, numberOfPages, path) {
  const items = [];

  items.push(generateItem(req, 1, path));
  items.push(generateItem(req, 2, path));
  items.push(generateItem(req, 3, path));
  items.push(generateItem(req, 4, path));
  items.push(generateItem(req, 5, path));
  items.push({ ellipsis: true });
  items.push(generateItem(req, numberOfPages, path));

  return items;
}

function generateItem(req, pageNumber, path) {
  const { page = 1, sortBy = "desc" } = req.query;

  return {
    number: pageNumber,
    visuallyHiddenText: `Page ${pageNumber}`,
    href: `${path}?page=${pageNumber}&sortBy=${sortBy}`,
    current: pageNumber === Number(page),
  };
}

function generateItems(req, numberOfPages, path) {
  const paginatorType = getPaginatorType(req, numberOfPages);

  let items;
  switch (paginatorType) {
    case COMPLEX_START_PAGINATOR:
      items = complexPaginatorStart(req, numberOfPages, path);
      break;
    case COMPLEX_MIDDLE_PAGINATOR:
      items = complexPaginatorMiddle(req, numberOfPages, path);
      break;
    case COMPLEX_END_PAGINATOR:
      items = complexPaginatorEnd(req, numberOfPages, path);
      break;
    default:
      items = simplePaginator(req, numberOfPages, path);
  }

  return items;
}

function getPaginatorType(req, numberOfPages) {
  const { page = 1 } = req.query;

  if (numberOfPages <= 10) {
    return SIMPLE_PAGINATOR;
  }

  if (Number(page) <= 4) {
    return COMPLEX_START_PAGINATOR;
  }

  if (Number(page) >= numberOfPages - 3) {
    return COMPLEX_END_PAGINATOR;
  }

  return COMPLEX_MIDDLE_PAGINATOR;
}

function simplePaginator(req, numberOfPages, path) {
  const items = [];

  for (let i = 1; i <= numberOfPages; i++) {
    items.push(generateItem(req, i, path));
  }

  return items;
}
