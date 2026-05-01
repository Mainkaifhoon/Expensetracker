import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";

const App = () => {
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState([]);
  const [filter, setFilter] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (expense.length === 0) return;
    localStorage.setItem("expenses", JSON.stringify(expense));
  }, [expense]);

  useEffect(() => {
    const savedExpense = localStorage.getItem("expenses");
    if (savedExpense) {
      setExpense(JSON.parse(savedExpense));
    }
  }, []);

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
              className="bg-gray-900 hover:cursor-pointer dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 p-2 rounded-full active:scale-95 transition"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* INPUT SECTION */}
        <ExpenseForm
          input={input}
          setInput={setInput}
          amount={amount}
          setAmount={setAmount}
          category={category}
          setCategory={setCategory}
          handleRender={handleRender}
        />
      </header>

      {/* MAIN */}
      <main className="flex flex-col lg:flex-row gap-4 p-4 max-w-[85rem] mx-auto w-full">
        {/* EXPENSE LIST */}
        <ExpenseList expenses={filteredExpenses} handleDelete={handleDelete} />

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
