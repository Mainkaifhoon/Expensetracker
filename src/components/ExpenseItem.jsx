const ExpenseItem = ({ item, index, handleDelete }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 py-2">
      <div>
        <h2 className="font-semibold">{item.input}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {item.category}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <p className="font-bold">₹{item.amount}</p>
        <button
          onClick={() => handleDelete(index)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;