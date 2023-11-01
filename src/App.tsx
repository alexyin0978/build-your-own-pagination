import { useState } from "react";
import Pagination from "./Pagination";
import { Box, Input, Stack, Text } from "@chakra-ui/react";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  const [totalPageCount, setTotalPageCount] = useState(7);

  return (
    <Stack spacing={3}>
      <Text>enter totalPageCount here:</Text>
      <Input
        value={totalPageCount}
        onChange={(e) => setTotalPageCount(Number(e.target.value))}
        type="number"
        w={"150px"}
      />
      <Box>currentPage is : {currentPage}</Box>
      <Pagination
        totalPageCount={totalPageCount}
        currentPage={currentPage}
        onChange={onPageChange}
      />
    </Stack>
  );
}

export default App;
