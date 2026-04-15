import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
const App = () => {
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState([]);
  const [filter, setFilter] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const filteredExpenses =
    filter.length === 0
      ? expense
      : expense.filter((item) => {
          return filter.includes(item.category);
        });

  const totalAmount = filteredExpenses.reduce((sum, item) => {
    return sum + Number(item.amount);
  }, 0);

  function handleDarkMode() {
    setDark((prev) => {
      const newDark = !prev;

      if (newDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return newDark;
    });
  }

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

  return (
    <div className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col">
      {/* HEADER */}
      <header>
        <div className="flex justify-between items-center gap-10 py-6 bg-gray-800 dark:bg-gray-900 text-white text-center px-7">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Expense Tracker
          </h1>

          <div>
            <button
              onClick={handleDarkMode}
              className="bg-gray-700 hover:cursor-pointer dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 p-2 rounded-full active:scale-95 transition"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* INPUT SECTION */}
        <nav className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 m-4 max-w-[85rem] w-full mx-auto">
          <h2 className="text-xl sm:text-2xl mb-4 font-semibold">
            Add New Expense
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <label>Title</label>
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRender();
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border rounded-md px-3 py-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g. Lunch, Groceries"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Amount (₹)</label>
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRender();
                }}
                min={0}
                max={100000}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border rounded-md px-3 py-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g. 250"
                type="number"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Category</label>
              <select
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRender();
                }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-md px-3 py-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="" disabled>
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

            <div className="flex items-center justify-center mt-3">
              <button
                onClick={(e) => handleRender(e)}
                className="w-full bg-green-500 dark:bg-green-600 text-white px-3 py-2 rounded-xl hover:bg-green-600 dark:hover:bg-green-700 active:scale-95 m-3"
              >
                + Add
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* MAIN */}
      <main className="flex flex-col lg:flex-row gap-4 p-4 max-w-[85rem] mx-auto w-full">
        {/* EXPENSE LIST */}
        <div className="flex-[2] bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 max-h-[600px] overflow-y-auto">
          <h1 className="text-xl sm:text-2xl font-semibold mb-3">Expenses</h1>

          {filteredExpenses.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No expenses yet</p>
          ) : (
            filteredExpenses.map((e, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 py-2"
              >
                <div>
                  <h2 className="font-semibold">{e.input}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {e.category}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="font-bold">₹{e.amount}</p>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SIDEBAR */}
        <div className="flex-[1] w-full lg:w-80 flex flex-col gap-4">
          {/* TOTAL */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 max-w-full">
            <h1 className="text-lg sm:text-xl font-semibold">
              Total amount: ₹{totalAmount}
            </h1>
          </div>

          {/* FILTERS */}
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full shadow-md p-4 max-w-full">
            <p className="text-lg sm:text-xl font-semibold mb-3">Filters</p>

            <div className="p-2 flex flex-col justify-between">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm sm:text-base">
                {[
                  "Food",
                  "Shopping",
                  "Entertainment",
                  "Education",
                  "Travel",
                  "Miscellaneous",
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      onChange={(e) =>
                        handleFilter(e.target.checked, e.target.value)
                      }
                      value={item}
                      type="checkbox"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
