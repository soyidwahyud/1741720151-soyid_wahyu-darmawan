import React, { useState } from "react";
import { Document, Page } from "react-pdf";


export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const { pdf } = props;

  return (
    <>
      <div>
        <h6>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </h6>
        <button1 type="button" disabled={pageNumber <= 1} onClick={previousPage} >
          Previous
        </button1>
        {/*<br/>*/}
        {/*<br/>*/}
        <button1
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button1>
        <br/>
        <br/>
      </div>
      <Document
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>

    </>
  );
}
