import { useEffect, useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import { IoMdSearch } from "react-icons/io";
// import { PiLessThan } from "react-icons/pi";
import { PiLessThanBold } from "react-icons/pi";

import { PiGreaterThanBold } from "react-icons/pi";

import "./style.css";
import Header from "../Header";

function CommentsDashboard() {
  const [data, setData] = useState([]);
  const [isAsc, setIsAsc] = useState(true);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //sorting functionality
  const sortbypost = () => {
    const sortedDataByPostId = [...data].sort((a, b) =>
      isAsc ? a.postId - b.postId : b.postId - a.postId
    );
    setData(sortedDataByPostId);
    localStorage.clear();
    localStorage.setItem(
      "sortedDataByPostId",
      JSON.stringify(sortedDataByPostId)
    );

    setIsAsc(!isAsc);
  };

  const sortbyname = () => {
    const sortedDataByName = [...data].sort((a, b) =>
      isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    setData(sortedDataByName);
    localStorage.clear();
    localStorage.setItem("sortedDataByName", JSON.stringify(sortedDataByName));
    setIsAsc(!isAsc);
  };

  const handleChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  const sortbyemail = () => {
    const sortedDataByEmail = [...data].sort((a, b) =>
      isAsc ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
    );
    localStorage.clear();
    setData(sortedDataByEmail);
    localStorage.setItem(
      "sortedDataByEmail",
      JSON.stringify(sortedDataByEmail)
    );
    setIsAsc(!isAsc);
  };

  //fetching data from api
  const fetchCommentsData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      if (!response.ok) {
        throw new Error("failed to fetch the data");
      }
      const comments = await response.json();
      setData(comments);
    } catch (error) {
      console.log(error);
    }
  };
  // fetch data based on sort in localstorage
  useEffect(() => {
    const storedPost = localStorage.getItem("sortedDataByPostId");
    const storedName = localStorage.getItem("sortedDataByName");
    const storedEmail = localStorage.getItem("sortedDataByEmail");
    try {
      if (storedPost && JSON.parse(storedPost)) {
        setData(JSON.parse(storedPost));
      } else if (storedName &&  JSON.parse(storedName)) {
        setData(JSON.parse(storedName));
      } else if (storedEmail &&  JSON.parse(storedEmail)) {
        setData(JSON.parse(storedEmail));
      } else {
        fetchCommentsData();
      }
    } catch (error) {
      console.log(`Error parsing localstorage data :`, error);
    }
  }, []);
  


  //filter searchItem
  const searchFilter = data.filter((comment) => {
    const term = input.toLowerCase();
    return (
      comment.name.toLowerCase().includes(term) ||
      comment.email.toLowerCase().includes(term) ||
      comment.body.toLowerCase().includes(term)
    );
  });

  //pagination
  const total_no_of_items = searchFilter.length;
  const no_of_pages = Math.ceil(total_no_of_items / itemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  //return jsx
  console.log(searchFilter)
  return (
    <div className="comment-container">
    <Header/>
      <div className="sortSearch">
        <div >
          <button className="button" onClick={sortbypost}>
            Sort Post ID{" "}
            <HiChevronUpDown fontSize="12px" color="grey" fontWeight="bold" />{" "}
          </button>
          <button className="button" onClick={sortbyname}>
            Sort Name{" "}
            <HiChevronUpDown fontSize="12px" color="grey" fontWeight="bold" />
          </button>
          <button className="button" onClick={sortbyemail}>
            Sort Email{" "}
            <HiChevronUpDown fontSize="12px" color="grey" fontWeight="bold" />
          </button>
        </div>
        <IoMdSearch
          style={{
            position: "relative",
            left: "410px",
            top: "18px",
            color: "grey",
          }}
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="search"
          placeholder="search name,email,comment"
          type="search"
        />
      </div>

      <table
        style={{ borderCollapse: "collapse", border: "1px solid lightgrey",margin:"auto",width:'90%'}}
      >
        <thead>
        <tr>
          <th className="thstyle" style={{ borderTopLeftRadius: "8px" }}>
            PostId
          </th>
          <th className="thstyle">Name</th>
          <th className="thstyle">Email</th>
          <th className="thstyle" style={{ borderTopRightRadius: "8px" }}>
            Comment
          </th>
          </tr>
        </thead>
        <tbody>
          {searchFilter.slice(start, end).map((comment) => (
            <tr
              style={{ border: "1px solid lightgrey", textAlign: "center" }}
              key={comment.id}
            >
              <td>{comment.postId}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td className="table-cell" > {comment.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container" >
        <p >
          {start + 1}-{Math.min(end, searchFilter.length)} of{" "}
          {searchFilter.length} items
        </p>
        <div  className="button-container">
          <button style={{backgroundColor:"tansparent",border:"none"}}
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          >
            <PiLessThanBold />

          </button>
          <button   className={`pageButton ${currentPage ===currentPage  ? "active" : ""}`}>{currentPage + 1}</button>
          {currentPage + 1 < no_of_pages && (
            <button 
              className="pageButton"
              onClick={() => setCurrentPage(currentPage + 1)}
              
            >
              {currentPage + 2}
            </button>
          )}
          <button  style={{backgroundColor:"transparent",border:"none"}}
            disabled={currentPage + 1 >= no_of_pages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, no_of_pages - 1))
            }
          >
            <PiGreaterThanBold />
          </button>
        </div>
        <div >
          <select
            style={{ height: "20px" }}
            value={itemsPerPage}
            onChange={handleChange}
          >
            <option value="10">10/Page</option>
            <option value="20">20/Page</option>
            <option value="30">30/Page</option>
            <option value="40">40/Page</option>
            <option value="50">50/Page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default CommentsDashboard;
