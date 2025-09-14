import React, { useState } from "react";

// ---------------- STUDENT PANEL ----------------
const StudentPanel = ({
  libraryBooks,
  issuedBooks,
  setIssuedBooks,
  transactions,
  setTransactions,
}) => {
  const [selectedAvailableBook, setSelectedAvailableBook] = useState("");

  const calculateFine = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    if (today > due) {
      const diffDays = Math.ceil((today - due) / (1000 * 60 * 60 * 24));
      return diffDays * 2;
    }
    return 0;
  };

  const handleIssueBook = () => {
    if (!selectedAvailableBook) return;
    if (issuedBooks.length >= 2) {
      alert("⚠️ You can issue a maximum of 2 books only!");
      return;
    }
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 14);

    const newBook = {
      title: selectedAvailableBook,
      issueDate: today.toLocaleDateString(),
      dueDate: dueDate.toLocaleDateString(),
    };

    setIssuedBooks((prev) => [...prev, newBook]);
    setTransactions((prev) => [
      ...prev,
      `Issued: ${selectedAvailableBook} on ${today.toLocaleDateString()}, Due: ${dueDate.toLocaleDateString()}`,
    ]);
    setSelectedAvailableBook("");
  };

  const handleRenewBook = (bookTitle) => {
    const updatedBooks = issuedBooks.map((book) => {
      if (book.title === bookTitle) {
        const fine = calculateFine(book.dueDate);
        const newDueDate = new Date();
        newDueDate.setDate(newDueDate.getDate() + 14);

        setTransactions((prev) => [
          ...prev,
          fine > 0
            ? `Renewed: ${bookTitle} late with fine ₹${fine} on ${new Date().toLocaleDateString()}, New Due: ${newDueDate.toLocaleDateString()}`
            : `Renewed: ${bookTitle} on ${new Date().toLocaleDateString()}, New Due: ${newDueDate.toLocaleDateString()}`,
        ]);

        return { ...book, dueDate: newDueDate.toLocaleDateString() };
      }
      return book;
    });

    setIssuedBooks(updatedBooks);
  };

  const handleReturnBook = (bookTitle) => {
    const book = issuedBooks.find((b) => b.title === bookTitle);
    const fine = calculateFine(book.dueDate);

    setIssuedBooks(issuedBooks.filter((b) => b.title !== bookTitle));
    setTransactions((prev) => [
      ...prev,
      fine > 0
        ? `Returned: ${bookTitle} late with fine ₹${fine} on ${new Date().toLocaleDateString()}`
        : `Returned: ${bookTitle} on ${new Date().toLocaleDateString()}`,
    ]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📘 Student Dashboard</h2>

      {/* Available Books */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h3 className="font-semibold mb-3">Available Books</h3>
        <select
          value={selectedAvailableBook}
          onChange={(e) => setSelectedAvailableBook(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select Book --</option>
          {libraryBooks.map((book, index) => (
            <option key={index} value={book}>
              {book}
            </option>
          ))}
        </select>
        <button
          onClick={handleIssueBook}
          disabled={!selectedAvailableBook}
          className={`mt-3 px-4 py-2 rounded text-white ${
            selectedAvailableBook
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Issue Book
        </button>
      </div>

      {/* Issued Books */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h3 className="font-semibold mb-3">My Issued Books</h3>
        {issuedBooks.length === 0 && <p>No books issued yet</p>}
        {issuedBooks.map((book, index) => (
          <div key={index} className="flex justify-between items-center mt-2">
            <span>
              {book.title} (Due: {book.dueDate})
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleRenewBook(book.title)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Renew
              </button>
              <button
                onClick={() => handleReturnBook(book.title)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Return
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="bg-white shadow rounded-lg p-5">
        <h3 className="font-semibold mb-3">Transactions (All Time)</h3>
        <select className="border p-2 rounded w-full" defaultValue="">
          {transactions.length === 0 ? (
            <option value="" disabled>
              -- No transactions yet --
            </option>
          ) : (
            <>
              <option value="">-- Select Transaction --</option>
              {transactions.map((t, index) => (
                <option key={index} value={t}>
                  {t}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
    </div>
  );
};

// ---------------- FACULTY PANEL ----------------
const FacultyPanel = ({ libraryBooks, issuedBooks }) => {
  const [selectedBook, setSelectedBook] = useState("");
  const [reservedBooks, setReservedBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [suggestInput, setSuggestInput] = useState("");

  const handleReserve = () => {
    if (selectedBook && !reservedBooks.includes(selectedBook)) {
      setReservedBooks((prev) => [...prev, selectedBook]);
      setSelectedBook("");
    }
  };

  const handleSuggest = () => {
    if (suggestInput.trim() !== "") {
      setSuggestedBooks((prev) => [...prev, suggestInput]);
      setSuggestInput("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👩‍🏫 Faculty Dashboard</h2>

      {/* Reserve a Book */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h3 className="font-semibold mb-3">Reserve a Book</h3>
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">-- Select Book --</option>
          {libraryBooks.map((book, index) => (
            <option key={index} value={book}>
              {book} {issuedBooks.some((b) => b.title === book) && "(Issued)"}
            </option>
          ))}
        </select>
        <button
          onClick={handleReserve}
          disabled={!selectedBook}
          className={`px-4 py-2 rounded text-white ${
            selectedBook
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Reserve
        </button>

        <h4 className="font-semibold mt-4">Reserved Books</h4>
        <ul className="mt-2">
          {reservedBooks.length === 0 ? (
            <li>No reserved books</li>
          ) : (
            reservedBooks.map((book, index) => <li key={index}>📌 {book}</li>)
          )}
        </ul>
      </div>

      {/* Suggest a Book */}
      <div className="bg-white shadow rounded-lg p-5">
        <h3 className="font-semibold mb-3">Suggest a Book</h3>
        <input
          type="text"
          value={suggestInput}
          onChange={(e) => setSuggestInput(e.target.value)}
          placeholder="Enter book name to suggest"
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleSuggest}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Suggest
        </button>

        <h4 className="font-semibold mt-4">Suggested Books</h4>
        <ul className="mt-2">
          {suggestedBooks.length === 0 ? (
            <li>No suggested books</li>
          ) : (
            suggestedBooks.map((book, index) => (
              <li key={index}>💡 {book}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

// ---------------- LIBRARIAN PANEL ----------------
const LibrarianPanel = ({ libraryBooks, issuedBooks, setLibraryBooks, transactions }) => {
  const [newBook, setNewBook] = useState("");

  const handleAddBook = () => {
    if (newBook.trim() !== "") {
      setLibraryBooks((prev) => [...prev, newBook]);
      setNewBook("");
    }
  };

  const handleDeleteBook = (book) => {
    setLibraryBooks(libraryBooks.filter((b) => b !== book));
  };

  const calculateTotalFine = () => {
    let total = 0;
    transactions.forEach((t) => {
      const match = t.match(/₹(\d+)/);
      if (match) total += parseInt(match[1]);
    });
    return total;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📖 Librarian Dashboard</h2>

      {/* Add Book */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h3 className="font-semibold mb-3">Add a Book</h3>
        <input
          type="text"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          placeholder="Enter new book name"
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleAddBook}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-3"
        >
          Add Book
        </button>
      </div>

      {/* Library Books */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h3 className="font-semibold mb-3">Library Books</h3>
        <ul>
          {libraryBooks.map((book, index) => {
            const isIssued = issuedBooks.some((b) => b.title === book);
            return (
              <li
                key={index}
                className="flex justify-between items-center border-b py-1"
              >
                <span>
                  {book}{" "}
                  {isIssued ? (
                    <span className="text-red-600">(Issued)</span>
                  ) : (
                    <span className="text-green-600">(Available)</span>
                  )}
                </span>
                <button
                  onClick={() => handleDeleteBook(book)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Transactions */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h3 className="font-semibold mb-3">All Student Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          <select className="border p-2 rounded w-full" defaultValue="">
            <option value="">-- Select Transaction --</option>
            {transactions.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Report Section */}
      <div className="bg-white shadow rounded-lg p-5">
        <h3 className="font-semibold mb-3">Report</h3>
        <p>Total Fine Collected: ₹{calculateTotalFine()}</p>
      </div>
    </div>
  );
};

// ---------------- MAIN APP ----------------
const LibrarySystem = () => {
  const [role, setRole] = useState("student");
  const [libraryBooks, setLibraryBooks] = useState([
    "Introduction to Algorithms",
    "Operating System Concepts",
    "Computer Networks",
    "Database Management Systems",
  ]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [transactions, setTransactions] = useState([]); // all-time transactions

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">📚 Library Management System</h1>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="text-black p-2 rounded"
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="librarian">Librarian</option>
        </select>
      </header>

      {role === "student" && (
        <StudentPanel
          libraryBooks={libraryBooks}
          issuedBooks={issuedBooks}
          setIssuedBooks={setIssuedBooks}
          transactions={transactions}
          setTransactions={setTransactions} // shared for all-time
        />
      )}

      {role === "faculty" && (
        <FacultyPanel libraryBooks={libraryBooks} issuedBooks={issuedBooks} />
      )}

      {role === "librarian" && (
        <LibrarianPanel
          libraryBooks={libraryBooks}
          issuedBooks={issuedBooks}
          setLibraryBooks={setLibraryBooks}
          transactions={transactions}
        />
      )}
    </div>
  );
};

export default LibrarySystem;
