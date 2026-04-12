import { useEffect, useState } from "react";
import { Hash } from "lucide-react";

const App = () => {
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState([]);
  const [filter, setFilter] = useState([]);
  
  const filteredExpenses = filter.length===0 ? expense : expense.filter((item)=>{

    return filter.includes(item.category)
    
  })
  
  const totalAmount = filteredExpenses.reduce((sum, item) => {
    return sum + Number(item.amount);
  }, 0);


  function handleFilter(checked, value) {
    const newFilter = {
      isChecked: checked,
      value: value,
    };
    if (newFilter.isChecked) {
      setFilter((prev) => [...prev, newFilter.value]);
    } else {
      setFilter((prev) => prev.filter((item) => item !== newFilter.value));
    }

    console.log(filter);
  }

  function handleRender() {
    if (input == "" || amount == "" || category == "") {
      alert("Fill all the fields");
    } else {
      const newExpense = {
        input: input,
        amount: amount,
        category: category,
      };
      setExpense((prev) => [...prev, newExpense]);
      console.log(expense)
      setInput("");
      setAmount("");
      setCategory("");
    }
  }

  function handleDelete(idx) {
    const copyExpense = [...expense];
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
          <h1 className="text-3xl mb-2">Expense Tracker</h1>
          <p className="text-sm">Track your expense </p>
        </div>

        {/* Input Column */}
        <nav className="bg-white rounded-xl shadow-md p-6 m-4">
          <h2 className="text-2xl mb-2 p-2 font-semibold">Add New Expense</h2>
          <div className="flex gap-6 items-end flex-wrap">
            <div className="flex flex-col gap-1 ">
              {/* Input Section */}
              <label htmlFor="title">Title</label>
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRender();
                  }
                }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRender();
                  }
                }}
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
              <label htmlFor="Category">Category</label>
              <select
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRender();
                  }
                }}
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

                <option value="Food"> Food</option>
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
              className=" hover:cursor-pointer active:scale-95 hover:bg-green-[600] bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              + Add
            </button>
          </div>
        </nav>
      </header>
      <main className="flex gap-6 p-6 h-screen overflow-hidden">
        <div className="flex-4/3 bg-white rounded-xl shadow-md p-4 overflow-y-auto h-full no-scrollbar">
          {" "}
          <h1 className="text-2xl  font-semibold  mb-3">Expenses</h1>{" "}
          {/* Redering Section */}
          {filteredExpenses.map((e, idx) => {
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
        <div className="flex  flex-col gap-6">
          {/* Total Amount Section */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h1 className="text-2xl font-semibold">
              Total amount : {totalAmount}
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4  ">
            {" "}
            {/* Filter Section  */}
            <p className=" text-2xl font-semibold p-1">Filters</p>
            <div className="flex gap-4 flex-wrap justify-start mt-3 items-center text-xl">
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => {
                    handleFilter(e.target.checked, e.target.value);
                  }}
                  value="Food"
                  id="food"
                  type="checkbox"
                />
                <label htmlFor="food">Food</label>
              </div>

              <div className="flex items-center gap-2 ">
                <input
                  onChange={(e) => {
                    handleFilter(e.target.checked, e.target.value);
                  }}
                  value="Shopping"
                  id="shopping"
                  type="checkbox"
                />
                <label htmlFor="shopping">Shopping</label>
              </div>

              <input
                onChange={(e) => {
                  handleFilter(e.target.checked, e.target.value);
                }}
                value="Entertainment"
                id="entertainment"
                type="checkbox"
              />
              <label htmlFor="entertainment">Entertainment</label>

              <input
                onChange={(e) => {
                  handleFilter(e.target.checked, e.target.value);
                }}
                value="Education"
                id="education"
                type="checkbox"
              />
              <label htmlFor="education">Education</label>

              <input
                onChange={(e) => {
                  handleFilter(e.target.checked, e.target.value);
                }}
                value="Travel"
                id="travel"
                type="checkbox"
              />
              <label htmlFor="travel">Travel</label>
              <input
                onChange={(e) => {
                  handleFilter(e.target.checked, e.target.value);
                }}
                value="Miscellaneous"
                id="misc"
                type="checkbox"
              />
              <label htmlFor="misc">Miscellaneous</label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
