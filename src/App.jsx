import React from "react";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

const App = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  async function getUser() {
    if (!search.trim()) return;
    try {
      const res = await fetch(`https://api.github.com/users/${search.trim()}`);
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setError(null);
      } else {
        setUser(null);
        setError(data.message || "User not found");
      }
    } catch (err) {
      setUser(null);
      setError("Failed to fetch user data.");
    }
  }

  return (
    <div className="h-screen w-full text-white bg-gray-900">
      {/* search bar */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          getUser();
        }}
        className=" h-20 flex justify-center items-center"
      >
        <div className="border border-[#dadada] px-8 py-2  flex justify-between rounded-full">
          <input
            type="text"
            placeholder="Search Profile"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" h-7 w-32 sm:w-72  md:w-96 bg-transparent text-white border-none placeholder:text-gray-400 focus:outline-none"
          />
          <button type="submit" className=" h-7 scale-90 cursor-pointer">
            <Search className="text-gray-600" />
          </button>
        </div>
      </form>

      {error && (
        <div className="flex justify-center text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      {/* user info card */}

      {user && (
        <div>
          <div className=" h-40 flex justify-around items-center">
            <div className="h-40 w-40 flex items-center justify-center">
              <img
                src={
                  user.avatar_url ||
                  "https://placehold.co/600x400?text=Image+Placeholder"
                }
                alt={user.name || "User Avatar"}
                className="h-22 w-22 object-cover rounded-full "
              />
            </div>
            <div className="h-20 w-50 flex flex-col justify-center">
              <h2 className="text-md w-20 text-center mb-3">
                {user.name || user.login || "user"}
              </h2>
              <div className="flex justify-between">
                <div className="w-12 text-center">
                  <p>{user.public_repos || 0}</p>
                  <p className="text-sm">repos</p>
                </div>
                <div className="w-20 text-center">
                  <p>{user.followers || 0}</p>
                  <p className="text-sm">followers</p>
                </div>
                <div className="w-20 text-center">
                  <p>{user.following || 0}</p>
                  <p className="text-sm">following</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-around h-20 pl-4 w-full">
            <div className=" h-full w-90">
              <div className="flex h-5 text-gray-500 items-center text-sm ">
                <MapPin className="scale-[0.6]" />
                <p>{user.location || "Not Provided"}</p>
              </div>
              <div className="h-5 pl-2 flex items-center">
                <p className="text-xs mt-5">
                  <span className="text-gray-200">Created At:</span>{" "}
                  {user.created_at.slice(0, 10) || "not provided"}
                </p>
              </div>
              <div className="h-10 pl-2 flex items-center">
                <p className="text-xs mt-5">{user.bio || "not provided"}</p>
              </div>
            </div>

            <div className="scale-[0.6] bg-gray-300 rounded-4xl items-center justify-center gap-10 flex h-15 px-4 w-80">
              {user.twitter_username ? (
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scale-150 hover:scale-[1.75] duration-150 cursor-pointer"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=6Fsj3rv2DCmG&format=png&color=000000"
                    alt="x"
                    className="w-15 h-4"
                  />
                </a>
              ) : (
                <div className="scale-150 opacity-30 cursor-not-allowed">
                  <img
                    src="https://img.icons8.com/?size=100&id=6Fsj3rv2DCmG&format=png&color=000000"
                    alt="x"
                    className="w-15 h-4"
                  />
                </div>
              )}
              {user.blog ? (
                <a
                  href={
                    user.blog.startsWith("http")
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scale-150 hover:scale-[1.75] duration-150 cursor-pointer"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=1349&format=png&color=000000"
                    alt="web"
                    className="w-15 h-4"
                  />
                </a>
              ) : (
                <div className="scale-150 opacity-30 cursor-not-allowed">
                  <img
                    src="https://img.icons8.com/?size=100&id=1349&format=png&color=000000"
                    alt="web"
                    className="w-15 h-4"
                  />
                </div>
              )}
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="scale-200 hover:scale-[1.75] duration-150 cursor-pointer"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=60987&format=png&color=000000"
                  alt="GitHub"
                  className="w-15 h-4"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
