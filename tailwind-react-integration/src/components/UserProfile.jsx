function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-6 sm:p-8 max-w-sm sm:max-w-md mx-auto my-12 sm:my-20 rounded-lg shadow-lg text-center">

      {/* User Image */}
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full mx-auto"
      />

      {/* User Name */}
      <h1 className="text-lg sm:text-xl text-blue-800 my-3 sm:my-4 font-semibold">
        John Doe
      </h1>

      {/* User Description */}
      <p className="text-gray-600 text-sm sm:text-base px-2 sm:px-0">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
