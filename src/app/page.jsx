import Link from 'next/link';
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-600 to-gray-900 ">
      {/* Navbar */}
      <nav className="bg-[#1E3A8A] text-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Techsold</div>
        <ul className="hidden lg:flex space-x-6 text-white font-medium">
          <li><Link href="/todo" className="hover:text-gray-300">Todo List</Link></li>
          <li><Link href="/Calculator" className="hover:text-gray-300">Calculator</Link></li>
          <li><Link href="/weather_App" className="hover:text-gray-300">Weather App</Link></li>
        </ul>
      </nav>

      {/* Content (optional) */}
      <section className="flex flex-col items-center justify-center mt-20 text-center">
        <h1 className="text-3xl font-bold text-[#7c8bab] mb-4">Welcome to Techsold</h1>
       
        <p className="text-gray-400 text-lg">Choose a tool from the navigation menu</p>
        <p className="text-gray-500 mt-2">Explore our Todo List, Calculator, and Weather App</p>

        <p className="text-gray-500 mt-2">Made by  
        <span className="text-blue-500"> @hunain_ahmed</span></p>
        <p className="text-gray-500 mt-2">Powered by Next.js and Tailwind CSS</p>
      </section>
    </main>
  );
}
