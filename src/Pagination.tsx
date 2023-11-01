import { Flex } from "@chakra-ui/react";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { usePaginationList } from "./usePaginationList";
import { Fragment } from "react";
import PageButton from "./PageButton";

type PaginationProps = {
  totalPageCount: number;
  currentPage: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showNextButton?: boolean;
  showPrevButton?: boolean;
};

const Pagination = (props: PaginationProps) => {
  const {
    totalPageCount,
    currentPage,
    onChange,
    siblingCount = 1,
    boundaryCount = 1,
    showFirstButton = true,
    showLastButton = true,
    showNextButton = true,
    showPrevButton = true,
  } = props;

  const pageList = usePaginationList({
    totalPageCount,
    currentPage,
    siblingCount,
    boundaryCount,
  });
  const firstPage = 1;
  const lastPage = totalPageCount;

  const onNavigateToFirstPage = () => {
    if (currentPage === 1) return;
    onChange(firstPage);
  };

  const onNavigateToPreviousPage = () => {
    if (currentPage === 1) return;
    onChange(currentPage - 1);
  };

  const onNavigateToNextPage = () => {
    if (currentPage === lastPage) return;
    onChange(currentPage + 1);
  };

  const onNavigateToLastPage = () => {
    if (currentPage === lastPage) return;
    onChange(lastPage);
  };

  return (
    <Flex alignItems={"center"} gap={2}>
      {showFirstButton && (
        <PageButton
          content={<MdFirstPage size={20} />}
          onClick={onNavigateToFirstPage}
          isDisabled={currentPage === firstPage}
        />
      )}
      {showPrevButton && (
        <PageButton
          content={<MdNavigateBefore size={20} />}
          isDisabled={currentPage === firstPage}
          onClick={onNavigateToPreviousPage}
        />
      )}
      {pageList &&
        pageList.map((item, idx) => {
          return typeof item === "number" ? (
            <PageButton
              key={item}
              content={item}
              isActive={currentPage === item}
              onClick={() => onChange(item)}
            />
          ) : (
            <Fragment key={`${idx} + breakLabel`}>{item}</Fragment>
          );
        })}
      {showNextButton && (
        <PageButton
          content={<MdNavigateNext size={20} />}
          isDisabled={currentPage === lastPage}
          onClick={onNavigateToNextPage}
        />
      )}
      {showLastButton && (
        <PageButton
          content={<MdLastPage size={20} />}
          isDisabled={currentPage === lastPage}
          onClick={onNavigateToLastPage}
        />
      )}
    </Flex>
  );
};

export default Pagination;
