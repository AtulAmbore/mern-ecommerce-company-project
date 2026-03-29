export function AdminToggle({ isAdmin, setIsAdmin }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-white font-semibold">Admin</span>
      <button
        type="button"
        onClick={() => setIsAdmin((prev) => !prev)}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          isAdmin ? "bg-blue-600" : "bg-gray-400"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            isAdmin ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
}
