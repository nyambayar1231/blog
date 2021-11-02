import { HiSearch } from "react-icons/hi";
const Hero = () => {
  return (
    <div className="z-0 flex flex-col items-center justify-center pt-16 text-white bg-green-500">
      <h1 className="text-4xl">Posts</h1>
      <h2 className="text-xl text-gray-300">Search the best</h2>
      <h2 className="text-xl text-gray-300">blog posts</h2>
      <h2 className="text-xl text-gray-300">in our 1000+ posts</h2>
      <div className="relative flex flex-wrap items-stretch w-full px-5 my-8 md:px-40 ">
        <span className="absolute z-10 flex items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center text-blue-300 bg-transparent rounded">
          <HiSearch className="text-xl" />
        </span>
        <input
          type="text"
          placeholder="Search Blogs"
          className="relative w-full px-2 py-1 pl-10 text-xl text-blue-800 placeholder-blue-300 bg-white border-0 rounded shadow outline-none focus:outline-none focus:ring"
        />
      </div>
    </div>
  );
};
export default Hero;
