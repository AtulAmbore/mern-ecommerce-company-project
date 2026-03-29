export function Loading() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="text-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4 animate-spin border-t-blue-500"></div>
        {/* <div data-testid="spinner" className="loader ..."></div> */}
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}
