import { Box, Flex } from "@chakra-ui/react";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { usePaginationList } from "./usePaginationList";
import { Fragment } from "react";

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
        <Box onClick={onNavigateToFirstPage} cursor={"pointer"}>
          <MdFirstPage size={20} />
        </Box>
      )}
      {showPrevButton && (
        <Box onClick={onNavigateToPreviousPage} cursor={"pointer"}>
          <MdNavigateBefore size={20} />
        </Box>
      )}
      {pageList &&
        pageList.map((item, idx) => {
          return typeof item === "number" ? (
            <Box
              key={item}
              onClick={() => onChange(item)}
              color={currentPage === item ? "red" : "black"}
            >
              {item}
            </Box>
          ) : (
            <Fragment key={`${idx} + breakLabel`}>{item}</Fragment>
          );
        })}
      {showNextButton && (
        <Box onClick={onNavigateToNextPage} cursor={"pointer"}>
          <MdNavigateNext size={20} />
        </Box>
      )}
      {showLastButton && (
        <Box onClick={onNavigateToLastPage} cursor={"pointer"}>
          <MdLastPage size={20} />
        </Box>
      )}
    </Flex>
  );
};

export default Pagination;
