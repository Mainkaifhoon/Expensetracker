import React, { useEffect, useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState([]);
  
  const totalAmount= expense.reduce((sum,item)=>{
    return sum+ Number(item.amount)
  },0)

  function handleRender(e) {
    if (input == "" || amount == "" || category == "") {
      alert("Fill all the fields");
    } else {
      const newExpense = {
        input: input,
        amount: amount,
        category: category,
      };
      setExpense((prev) => [...prev, newExpense]);
      setInput("");
      setAmount("");
      setCategory("");
    }
  }

  function handleDelete(idx) {
    const copyExpense = [...expense];
    console.log(copyExpense);
    copyExpense.splice(idx, 1);
    setExpense(copyExpense);
  }

  // function handleInput(e){

  //   setInput(e)
  //   console.log(input)
  //   console.log(input)
  //   setAmount(e)

  // }

  return (
    <div className="bg-gray-400 text-black h-screen flex flex-col">
      <header>
        {/* Title section */}
        <div className="flex flex-col items-center py-6 bg-gray-800 text-white">
          <h1 className="text-3xl mb-2  ">Expense Tracker</h1>
          <p className="text-sm">Track your expense </p>
        </div>

        {/* Input Column */}
        <nav className="bg-white rounded-xl shadow-md p-6 m-4">
          <h2 className="text-xl mb-2 p-2">Add New Expense</h2>
          <div className="flex gap-6 items-end flex-wrap">
            <div className="flex flex-col gap-1 ">
              {/* Input Section */}
              <label htmlFor="title">Title</label>
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                className="border rounded-md px-3 py-2 w-48"
                placeholder="e.g. Lunch,Groceries"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <label htmlFor="title">Amount(R)</label>
              <input
                min={0}
                max={100000}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                className="border rounded-md px-3 py-2 w-48"
                placeholder="e.g. 250"
                type="number"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="border rounded-md px-3 py-2 w-48"
                name="category"
                id="things"
              >
                <option value="" disabled className="text-gray-600">
                  Select Category
                </option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="Travel">Travel</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>

            <button
              onClick={(e) => {
                handleRender(e);
              }}
              className=" hover:cursor-pointer active:scale-95 hover:bg-green-600 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              + Add
            </button>
          </div>
        </nav>
      </header>
      <main className="flex gap-6 p-6 flex-1 overflow-hidden">
        <div className="flex-1 bg-white rounded-xl shadow-md p-4 overflow-y-auto h-full no-scrollbar">
          {" "}
          <h1 className="text-xl font-semibold mb-3">Expenses</h1>{" "}
          {/* Redering Section */}
          {expense.map((e, idx) => {
            return (
              <div
                key={idx}
                className="  flex justify-between items-center border-b py-2"
              >
                <div>
                  <h2 className="font-semibold">{e.input}</h2>
                  <p className="text-sm text-gray-500">{e.category}</p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold">₹{e.amount}</p>
                  <button
                    onClick={() => {
                      handleDelete(idx);
                    }}
                    className=" hover:cursor-pointer active:scale-95 hover:bg-red-600 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 bg-white rounded-xl shadow-md p-4 overflow-y-auto">
          <h1 className="text-2xl">Total amount: {totalAmount}</h1>
        </div>
      </main>
    </div>
  );
};

export default App;
