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
    // we will have to hide some pages and show break label instead
    const currentPageLength = 1;
    const extraBufferLength = 1;
    const maxLengthOfPageNumbersToShow =
      2 * boundaryCount +
      2 * siblingCount +
      currentPageLength +
      extraBufferLength;

    // CASE 1: show all page numbers
    if (totalPageCount <= maxLengthOfPageNumbersToShow) {
      return genArrayOfNumbers(firstPage, lastPage);
    }

    const leftExtremeBoundary = boundaryCount;
    const rightExtremeBoundary = lastPage - boundaryCount + 1;
    const leftExtremeSibling = Math.max(
      currentPage,
      currentPage - siblingCount
    );
    const rightExtremeSibling = Math.min(
      currentPage,
      currentPage + siblingCount
    );

    const shouldShowLeftBreakLabel: boolean =
      leftExtremeBoundary + extraBufferLength < leftExtremeSibling;
    const shouldShowRightBreakLabel: boolean =
      rightExtremeSibling + extraBufferLength < rightExtremeBoundary;

    // CASE 2: show right break label
    if (!shouldShowLeftBreakLabel && shouldShowRightBreakLabel) {
      const leftPagesLength =
        boundaryCount +
        siblingCount * 2 +
        currentPageLength +
        extraBufferLength;
      const leftPages = genArrayOfNumbers(firstPage, leftPagesLength);
      const rightBoundaryPages = genArrayOfNumbers(
        lastPage - boundaryCount + 1,
        lastPage
      );

      return [...leftPages, BreakLabel(), ...rightBoundaryPages];
    }

    // CASE 3: show left break label
    if (shouldShowLeftBreakLabel && !shouldShowRightBreakLabel) {
      const leftBoundaryPages = genArrayOfNumbers(firstPage, boundaryCount);
      const rightPagesStart =
        lastPage - siblingCount * 2 - boundaryCount + 1 - extraBufferLength;
      const rightPages = genArrayOfNumbers(rightPagesStart, lastPage);

      return [...leftBoundaryPages, BreakLabel(), ...rightPages];
    }

    // CASE 4: show break labels on both side
    if (shouldShowLeftBreakLabel && shouldShowRightBreakLabel) {
      const leftBoundaryPages = genArrayOfNumbers(firstPage, boundaryCount);
      const rightBoundaryPages = genArrayOfNumbers(
        lastPage - boundaryCount + 1,
        lastPage
      );
      const middlePages = genArrayOfNumbers(
        currentPage - siblingCount,
        currentPage + siblingCount
      );
      return [
        ...leftBoundaryPages,
        BreakLabel(),
        ...middlePages,
        BreakLabel(),
        ...rightBoundaryPages,
      ];
    }
  }, [boundaryCount, siblingCount, totalPageCount, currentPage]);

  return paginationList;
};
