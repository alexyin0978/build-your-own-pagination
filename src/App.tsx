import { useState } from "react";
import Pagination from "./Pagination";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  const totalPageCount = 8;

  return (
    <>
      currentPage is : {currentPage}
      <Pagination
        totalPageCount={totalPageCount}
        currentPage={currentPage}
        onChange={onPageChange}
      />
    </>
  );
}

export default App;
