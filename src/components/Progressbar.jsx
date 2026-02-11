function Progressbar({ progress, color }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-200 h-5 rounded-full overflow-hidden">
          <div
            className={`h-5 rounded-full transition-all duration-500 ${color}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-500 font-medium">{progress}%</span>
      </div>
    </div>
  );
}

export default Progressbar;
