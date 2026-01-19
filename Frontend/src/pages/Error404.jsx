import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black relative">
      <div className="flex flex-col items-center gap-8 text-center">

        {/* Eyes Section */}
        <div className="flex gap-1">
          <div className="w-20 h-20 bg-yellow-400 rounded-full grid place-items-center">
            <div className="w-8 h-8 bg-black rounded-full animate-pupilMove"></div>
          </div>

          <div className="w-20 h-20 bg-yellow-400 rounded-full grid place-items-center">
            <div className="w-8 h-8 bg-black rounded-full animate-pupilMove"></div>
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-semibold text-yellow-400 capitalize">
            Looks like you're lost
          </h1>
          <p className="mt-2 text-2xl font-light">404 error</p>
        </div>

        {/* Button */}
        <Link
          to="/"
          className="border border-yellow-400 text-lg font-light px-8 py-4 rounded-xl shadow-[0px_7px_0px_-2px_#faca2e] transition-all duration-300 hover:bg-yellow-400 hover:text-white hover:shadow-none capitalize"
        >
          back to home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
