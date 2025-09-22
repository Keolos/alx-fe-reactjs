function UserProfile() {
  return (
    <div className="user-profile 
                    bg-gray-100 
                    p-2 sm:p-4 md:p-8 
                    max-w-xs sm:max-w-xs md:max-w-sm 
                    mx-auto 
                    my-8 sm:my-12 md:my-20 
                    rounded-lg 
                    shadow-lg 
                    text-center
                    hover:shadow-xl
                    transition-shadow duration-300">

      {/* User Image */}
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="w-24 h-24 sm:w-24 md:w-36 h-24 sm:h-24 md:h-36 rounded-full mx-auto
                   hover:scale-110 
                   transition-transform duration-300 ease-in-out"
      />

      {/* User Name */}
      <h1 className="text-lg sm:text-lg md:text-xl text-blue-800 my-2 sm:my-3 md:my-4 font-semibold
                     hover:text-blue-500 
                     transition-colors duration-300">
        John Doe
      </h1>

      {/* User Description */}
      <p className="text-sm sm:text-sm md:text-base text-gray-600 px-2 sm:px-2 md:px-0">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
