const ExpenseForm = ({
  input,
  setInput,
  amount,
  setAmount,
  category,
  setCategory,
  handleRender,
}) => {
  return (
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
                className="hover:cursor-pointer border rounded-md px-3 py-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="hover:cursor-pointer w-full bg-green-500 dark:bg-green-600 text-white px-3 py-2 rounded-xl hover:bg-green-600 dark:hover:bg-green-700 active:scale-95 m-3"
              >
                + Add
              </button>
            </div>
          </div>
      
    </nav>
  );
};

export default ExpenseForm;