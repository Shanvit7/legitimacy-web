const Spinner = () => (
    <div className="relative h-12 w-12 mx-auto">
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
    </div>
  );
  
  export default Spinner;
  