import { useState } from "react";
import Pagination from "./Pagination";
import { Box, Input } from "@chakra-ui/react";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  const [totalPageCount, setTotalPageCount] = useState(8);

  return (
    <>
      enter totalPageCount here:
      <Input
        value={totalPageCount}
        onChange={(e) => setTotalPageCount(Number(e.target.value))}
        // type="number"
        w={"150px"}
      />
      <Box>currentPage is : {currentPage}</Box>
      <Pagination
        totalPageCount={totalPageCount}
        currentPage={currentPage}
        onChange={onPageChange}
      />
    </>
  );
}

export default App;
