import React, { useState } from 'react';

const AddNewBook = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook({
      title,
      author: { firstName, lastName },
      year: parseInt(year, 10),
    });
    // Reset form
    setTitle('');
    setFirstName('');
    setLastName('');
    setYear('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Author's First Name" />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Author's Last Name" />
      <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
      <button className="btn btn-primary" type="submit">Add Book</button>
    </form>
  );
};

export default AddNewBook;
