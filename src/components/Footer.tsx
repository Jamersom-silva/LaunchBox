export default function Footer() {
  return (
    <footer className="mt-12 py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold">L</div>
          <span className="text-sm font-medium">LaunchBox</span>
        </div>

        <p className="text-sm text-gray-500">© {new Date().getFullYear()} LaunchBox — Built with ❤️</p>

        <div className="flex gap-3">
          <a className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
          <a className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
        </div>
      </div>
    </footer>
  );
}
