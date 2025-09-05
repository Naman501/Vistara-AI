import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-center text-white px-6">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-6">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="rounded-2xl bg-white text-black px-4 py-3 font-medium hover:bg-gray-300 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
