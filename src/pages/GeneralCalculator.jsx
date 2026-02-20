import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Delete, RotateCcw, Equal } from 'lucide-react';

const GeneralCalculator = () => {
    const { t } = useTranslation();
    const [input, setInput] = useState('0');
    const [previousInput, setPreviousInput] = useState(null);
    const [operator, setOperator] = useState(null);
    const [overwrite, setOverwrite] = useState(false);

    const handleNumberCode = (num) => {
        if (overwrite) {
            setInput(num);
            setOverwrite(false);
        } else {
            setInput(input === '0' ? num : input + num);
        }
    };

    const handleOperator = (op) => {
        if (previousInput === null) {
            setPreviousInput(input);
        } else if (operator) {
            const result = calculate(previousInput, input, operator);
            setPreviousInput(result);
            setInput(result);
        }
        setOperator(op);
        setOverwrite(true);
    };

    const calculate = (a, b, op) => {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        if (isNaN(num1) || isNaN(num2)) return '0';

        switch (op) {
            case '+': return (num1 + num2).toString();
            case '-': return (num1 - num2).toString();
            case '*': return (num1 * num2).toString();
            case '/': return (num2 === 0 ? 'Error' : (num1 / num2).toString());
            default: return b;
        }
    };

    const handleEqual = () => {
        if (operator && previousInput !== null) {
            const result = calculate(previousInput, input, operator);
            setInput(result);
            setPreviousInput(null);
            setOperator(null);
            setOverwrite(true);
        }
    };

    const handleClear = () => {
        setInput('0');
        setPreviousInput(null);
        setOperator(null);
        setOverwrite(false);
    };

    const handleDelete = () => {
        if (overwrite) {
            setInput('0');
            setOverwrite(false);
            return;
        }
        if (input.length === 1) {
            setInput('0');
        } else {
            setInput(input.slice(0, -1));
        }
    };

    const handlePercent = () => {
        const result = (parseFloat(input) / 100).toString();
        setInput(result);
        setOverwrite(true);
    };

    const handleDot = () => {
        if (overwrite) {
            setInput('0.');
            setOverwrite(false);
        } else if (!input.includes('.')) {
            setInput(input + '.');
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;

            if (/[0-9]/.test(key)) {
                handleNumberCode(key);
            } else if (['+', '-', '*', '/'].includes(key)) {
                handleOperator(key);
            } else if (key === 'Enter' || key === '=') {
                e.preventDefault();
                handleEqual();
            } else if (key === 'Backspace') {
                handleDelete();
            } else if (key === 'Escape') {
                handleClear();
            } else if (key === '.') {
                handleDot();
            } else if (key === '%') {
                handlePercent();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [input, previousInput, operator, overwrite]); // Dependencies needed for closures to work

    const btnClass = "h-16 rounded-2xl text-xl font-semibold transition-all duration-200 shadow-sm active:scale-95 flex items-center justify-center";
    const numBtnClass = `${btnClass} bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700`;
    const opBtnClass = `${btnClass} bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50`;
    const actionBtnClass = `${btnClass} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600`;
    const equalBtnClass = `${btnClass} col-span-1 bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 dark:shadow-none`;

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]">
            <div className="w-full max-w-sm bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6">
                <div className="mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 h-24 flex flex-col justify-end items-end shadow-inner border border-gray-100 dark:border-gray-700">
                        <div className="text-gray-500 dark:text-gray-400 text-sm h-6">
                            {previousInput} {operator}
                        </div>
                        <div className="text-4xl font-bold text-gray-900 dark:text-white tracking-widest overflow-x-auto w-full text-right scrollbar-hide">
                            {input}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    <button onClick={handleClear} className={`${actionBtnClass} text-red-500`}>AC</button>
                    <button onClick={handleDelete} className={actionBtnClass}><Delete size={20} /></button>
                    <button onClick={handlePercent} className={actionBtnClass}>%</button>
                    <button onClick={() => handleOperator('/')} className={opBtnClass}>÷</button>

                    <button onClick={() => handleNumberCode('7')} className={numBtnClass}>7</button>
                    <button onClick={() => handleNumberCode('8')} className={numBtnClass}>8</button>
                    <button onClick={() => handleNumberCode('9')} className={numBtnClass}>9</button>
                    <button onClick={() => handleOperator('*')} className={opBtnClass}>×</button>

                    <button onClick={() => handleNumberCode('4')} className={numBtnClass}>4</button>
                    <button onClick={() => handleNumberCode('5')} className={numBtnClass}>5</button>
                    <button onClick={() => handleNumberCode('6')} className={numBtnClass}>6</button>
                    <button onClick={() => handleOperator('-')} className={opBtnClass}>-</button>

                    <button onClick={() => handleNumberCode('1')} className={numBtnClass}>1</button>
                    <button onClick={() => handleNumberCode('2')} className={numBtnClass}>2</button>
                    <button onClick={() => handleNumberCode('3')} className={numBtnClass}>3</button>
                    <button onClick={() => handleOperator('+')} className={opBtnClass}>+</button>

                    <button onClick={() => handleNumberCode('0')} className={`${numBtnClass} col-span-2`}>0</button>
                    <button onClick={handleDot} className={numBtnClass}>.</button>
                    <button onClick={handleEqual} className={equalBtnClass}>=</button>
                </div>
            </div>
        </div>
    );
};

export default GeneralCalculator;
