import ExpenseItem from "./ExpenseItem";
const ExpenseList = ({ expenses, handleDelete }) => {
  return (
    <div className="flex-[2] bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 max-h-[600px] overflow-y-auto">
      <h1 className="text-xl sm:text-2xl font-semibold mb-3">Expenses</h1>

      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        expenses.map((e, idx) => (
          <ExpenseItem
            key={idx}
            item={e}
            index={idx}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default ExpenseList;
