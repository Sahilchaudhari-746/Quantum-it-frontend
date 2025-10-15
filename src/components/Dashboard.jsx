import React, { useState } from "react";
import { getUser, logout } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Dashboard() {
  const user = getUser();
  const nav = useNavigate();

  const sampleRows = [
    {
      id: 1,
      name: "Michael Holz",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "04/10/2013",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Paula Wilson",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "05/08/2014",
      role: "Publisher",
      status: "Active",
    },
    {
      id: 3,
      name: "Antonio Moreno",
      img: "https://randomuser.me/api/portraits/men/55.jpg",
      date: "11/05/2015",
      role: "Publisher",
      status: "Suspended",
    },
    {
      id: 4,
      name: "Mary Saveley",
      img: "https://randomuser.me/api/portraits/women/56.jpg",
      date: "06/09/2016",
      role: "Reviewer",
      status: "Active",
    },
    {
      id: 5,
      name: "Martin Sommer",
      img: "https://randomuser.me/api/portraits/men/72.jpg",
      date: "12/08/2017",
      role: "Moderator",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Emma Brown",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      date: "03/07/2018",
      role: "Admin",
      status: "Active",
    },
    {
      id: 7,
      name: "John Adams",
      img: "https://randomuser.me/api/portraits/men/25.jpg",
      date: "05/12/2019",
      role: "Publisher",
      status: "Active",
    },
      {
      id: 8,
      name: "Henry Holz",
      img: "https://randomuser.me/api/portraits/men/68.jpg",
      date: "04/10/2013",
      role: "Moderator",
      status: "Active",
    },
      {
      id: 9,
      name: "Meena Joseph",
      img: "https://randomuser.me/api/portraits/men/44.jpg",
      date: "04/10/2013",
      role: "Admin",
      status: "Suspended",
    },
      {
      id: 10,
      name: "Michael Holz",
      img: "https://randomuser.me/api/portraits/men/30.jpg",
      date: "04/10/2013",
      role: "Punlisher",
      status: "Inactive",
    },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const startIndex = (page - 1) * rowsPerPage;
  const displayedRows = sampleRows.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(sampleRows.length / rowsPerPage);

  function handleLogout() {
    toast.success("Logout successfully 🎉");
    logout();
    nav("/login");
  }

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h2>Welcome, {user ? user.name : "User"}</h2>
          <div className="muted">{user ? user.email : ""}</div>
        </div>
        <div>
          <button className="btn small" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="table-card">
        <table className="nice-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date Created</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td className="name-col">
                  <div className="name-cell">
                    <img src={r.img} alt={r.name} className="avatar" />
                    <span>{r.name}</span>
                  </div>
                </td>
                <td>{r.date}</td>
                <td>{r.role}</td>
                <td>
                  <span className={`status ${r.status.toLowerCase()}`}>
                    {r.status}
                  </span>
                </td>
                <td>
                  <button className="gear">⚙️</button>
                  <button className="delete">✖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="page-btn"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`page-num ${page === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="page-btn"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
