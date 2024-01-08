import React, { useEffect, useState } from "react";

const Pagination = ({ totalclient = 0, handlepagechange }) => {
  const [tabs, settabs] = useState([]);
  const [totaltabs, settotaltabs] = useState(0);
  const [activetab, setactivetab] = useState(1);
  useEffect(() => {
    const temp = [];
    if (totalclient) {
      const totaltab = Math.ceil(totalclient / 20);
      settotaltabs(totaltab);

      for (let x = 0; x < totaltab; x++) {
        temp.push(
          <li className="page-item">
            <button
              className={`page-link ${x + 1 === activetab ? "active" : ""}`}
              onClick={() => handleactivetab(x + 1)}
            >
              {x + 1}
            </button>
          </li>
        );
      }
      settabs(temp);
    }
  }, [totalclient]);
  const handleactivetab = (tab) => {
    setactivetab(tab);
    handlepagechange(tab);
  };
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${activetab <= 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() =>
              activetab <= 1 ? null : handleactivetab(activetab - 1)
            }
          >
            Previous
          </button>
        </li>
        {[...Array(Math.ceil(totalclient / 20)).keys()].map((x) => (
          <li className="page-item">
            <button
              className={`page-link ${x + 1 === activetab ? "active" : ""}`}
              onClick={() => handleactivetab(x + 1)}
            >
              {x + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${activetab >= totaltabs ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() =>
              activetab >= totaltabs ? null : handleactivetab(activetab + 1)
            }
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
