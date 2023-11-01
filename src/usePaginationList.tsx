import { useMemo } from "react";
import { genArrayOfNumbers } from "./genArrayOfNumbers";
import BreakLabel from "./BreakLabel";

type GenPaginationListParams = {
  totalPageCount: number;
  currentPage: number;
  siblingCount: number;
  boundaryCount: number;
};

export const usePaginationList = (params: GenPaginationListParams) => {
  const { totalPageCount, currentPage, siblingCount, boundaryCount } = params;

  const paginationList = useMemo(() => {
    const firstPage = 1;
    const lastPage = totalPageCount;

    // if totalPageCount is more than this count
    // we will have to hide some pages and show Dots instead
    const currentPageLength = 1;
    const breakLabelPlaceholderLength = 2;
    const maxLengthOfPageNumbersToShow =
      2 * boundaryCount +
      2 * siblingCount +
      currentPageLength +
      (breakLabelPlaceholderLength - 1) + // left
      (breakLabelPlaceholderLength - 1); // right

    // CASE 1: show all page numbers
    if (totalPageCount <= maxLengthOfPageNumbersToShow) {
      return genArrayOfNumbers(firstPage, lastPage);
    }

    const leftExtremeBoundary = boundaryCount;
    const rightExtremeBoundary = lastPage - (boundaryCount - 1);
    const leftExtremeSibling = Math.max(firstPage, currentPage - siblingCount);
    const rightExtremeSibling = Math.min(lastPage, currentPage + siblingCount);

    const shouldShowLeftDots =
      leftExtremeBoundary + breakLabelPlaceholderLength < leftExtremeSibling;
    const shouldShowRightDots =
      rightExtremeSibling + breakLabelPlaceholderLength < rightExtremeBoundary;

    // CASE 2: show right Dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftPagesLength =
        boundaryCount +
        siblingCount * 2 +
        currentPageLength +
        (breakLabelPlaceholderLength - 1);
      const leftPages = genArrayOfNumbers(firstPage, leftPagesLength);
      const rightBoundaryPages = genArrayOfNumbers(
        lastPage - boundaryCount + 1,
        lastPage
      );

      return [...leftPages, <BreakLabel />, ...rightBoundaryPages];
    }

    // CASE 3: show left Dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const leftBoundaryPages = genArrayOfNumbers(firstPage, boundaryCount);
      const rightPagesStart =
        lastPage -
        siblingCount * 2 -
        (boundaryCount - 1) -
        (breakLabelPlaceholderLength - 1) -
        currentPageLength;
      const rightPages = genArrayOfNumbers(rightPagesStart, lastPage);

      return [...leftBoundaryPages, <BreakLabel />, ...rightPages];
    }

    // CASE 4: show Dots on both side
    if (shouldShowLeftDots && shouldShowRightDots) {
      const leftBoundaryPages = genArrayOfNumbers(firstPage, boundaryCount);
      const rightBoundaryPages = genArrayOfNumbers(
        lastPage - (boundaryCount - 1),
        lastPage
      );
      const middlePages = genArrayOfNumbers(
        currentPage - siblingCount,
        currentPage + siblingCount
      );
      return [
        ...leftBoundaryPages,
        <BreakLabel />,
        ...middlePages,
        <BreakLabel />,
        ...rightBoundaryPages,
      ];
    }
  }, [boundaryCount, siblingCount, totalPageCount, currentPage]);

  return paginationList;
};
