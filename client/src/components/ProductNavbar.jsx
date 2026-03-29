export function ProductNavbar({ inputValue, setInputValue }) {
  return (
    <div className="w-full h-1/10 bg-white flex justify-around py-2 fixed">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        name="search"
        id="search"
        className="w-6/10 border border-gray-400 px-4 rounded-2xl py-2 outline-none text-gray-500"
        placeholder="Search by title"
        spellCheck={false}
      />
      <div className="w-2/10 flex items-center justify-around">
        <h1 className="font-bold text-gray-500 text-xl">Sort By</h1>
        <div className="border border-gray-400 text-gray-500 rounded-2xl px-3">
          <select className="border-gray-400 outline-none text-gray-500 rounded-2xl px-3 py-2">
            <option value="" disabled selected>
              Sort By
            </option>
            <option value="brand">Brand</option>
            <option value="title">Title</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="alphabetically">Alphabetically</option>
          </select>
        </div>
      </div>
    </div>
  );
}
