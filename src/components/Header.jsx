function Header() {
  console.log("header rendered");
  
  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="bg-white shadow-md px-6 py-4 flex items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Registration Portal
          </h1>
        </div>
      </nav>
    </>
  );
}

export default Header;
