function UserProfile() {
  return (
    <div className="user-profile 
                    bg-gray-100 
                    p-4 sm:p-6 md:p-8 
                    max-w-xs sm:max-w-sm md:max-w-md 
                    mx-auto 
                    my-8 sm:my-12 md:my-20 
                    rounded-lg 
                    shadow-lg 
                    text-center
                    hover:scale-105 
                    transition-transform duration-300">

      {/* User Image */}
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full mx-auto"
      />

      {/* User Name */}
      <h1 className="text-lg sm:text-xl md:text-2xl text-blue-800 my-2 sm:my-3 md:my-4 font-semibold">
        John Doe
      </h1>

      {/* User Description */}
      <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2 sm:px-4 md:px-0">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
