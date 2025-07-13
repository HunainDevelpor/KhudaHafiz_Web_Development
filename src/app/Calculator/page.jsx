'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Calculator() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);


  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => setInput('');

  const calculate = () => {
    try {
      // Evaluate using Function constructor for safety
      const result = Function(`return ${input}`)();
      setHistory((prev) => [...prev, `${input} = ${result}`]);

      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', 'C', '+'],
  ];

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-600 to-gray-900 flex items-center justify-center px-4">
      
      <div className='flex gap-10 w-full justify-center items-center'>
        <div className="bg-gradient-to-br from-indigo-800 to-indigo-950 p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Simple Calculator</h1>

        {/* Display */}
        <div className="bg-gray-700 rounded-md p-4 text-right font-mono text-2xl mb-4 h-20 overflow-x-auto">
          {input || '0'}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === 'C') return clearInput();
                handleClick(btn);
              }}
              className={`p-6 text-xl rounded-4xl shadow ${
                ['/', '*', '-', '+'].includes(btn)
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                  : btn === 'C'
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-600 text-white hover:bg-gray-900'
              }`}
            >
              {btn}
            </button>
          ))}
          <button
            onClick={calculate}
            className="col-span-4 bg-green-500 text-white p-4 rounded text-xl hover:bg-green-600 shadow"
          >
            =
          </button>
        </div>
      </div>
      <div className='w-[35%] h-96 bg-zinc-800 rounded-xl shadow-lg p-4 flex flex-col justify-between'>
        <h1 className='text-2xl font-bold text-gray-300'>Your History</h1>
        <div className='h-[90%] overflow-y-auto'>
          {/* History content can be added here */}
          <p className='text-gray-400 mb-2'>Previous calculations:</p>
          <ul className='list-disc pl-5'>
            {history.map((item, index) => (
              <li key={index} className='text-gray-500'>{item}</li>
            ))}
          </ul>

        </div>
          <button onClick={() => setHistory([])} className='mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600'>Clear</button>
      </div>
      <div className="fixed bottom-8 left-4 z-50">
        <Link
          href="/"
          className="bg-gray-600 border border-gray-100 text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-700 transition duration-200"
        >
          ← Back to Home
        </Link>
      </div>
      </div>
    </main>
  );
}
