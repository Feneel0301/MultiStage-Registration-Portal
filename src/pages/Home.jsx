import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-8xl font-bold mb-3">Welcome to the Portal</h1>
        <h3 className="text-4xl text-gray-600 mb-6">
          Complete your Role based registration to get Started
        </h3>
        <NavLink to="/register">
          <button className="bg-blue-600 text-white text-2xl px-6 py-3 rounded-lg hover:bg-blue-500 transition">
            Start Registration
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default Home;
