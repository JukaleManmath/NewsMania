
function Loader() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[300px]'>
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-mono text-gray-700 animate-pulse">
        Loading the News shortly...
        </p>
    </div>
  );
}

export default Loader