import React, { useState, useEffect } from 'react';
import { Minus, RotateCcw } from 'lucide-react';

const GeneralCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [memory, setMemory] = useState(0);
    const [isRad, setIsRad] = useState(false); // Default to Degrees
    const [lastAnswer, setLastAnswer] = useState(0);
    const [isNewCalculation, setIsNewCalculation] = useState(false);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            const key = e.key;

            if (/\d/.test(key)) handleNumber(key);
            if (key === '.') handleNumber('.');
            if (key === '+') handleOperator('+');
            if (key === '-') handleOperator('-');
            if (key === '*') handleOperator('×');
            if (key === '/') handleOperator('÷');
            if (key === 'Enter' || key === '=') { e.preventDefault(); calculate(); }
            if (key === 'Backspace') handleBack();
            if (key === 'Escape') handleClear();
            if (key === '(') handleFunction('(');
            if (key === ')') handleFunction(')');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [display, isNewCalculation, memory, isRad]);

    const handleNumber = (num) => {
        if (display === '0' || display === 'Error' || isNewCalculation) {
            setDisplay(num.toString());
            setIsNewCalculation(false);
        } else {
            setDisplay(display + num.toString());
        }
    };

    const handleOperator = (op) => {
        if (isNewCalculation) setIsNewCalculation(false);
        if (display === 'Error') return;
        setDisplay(display + op);
    };

    const handleFunction = (func) => {
        if (isNewCalculation) setIsNewCalculation(false);
        if (display === 'Error') return;

        switch (func) {
            case 'sin': setDisplay(display === '0' ? 'sin(' : display + 'sin('); break;
            case 'cos': setDisplay(display === '0' ? 'cos(' : display + 'cos('); break;
            case 'tan': setDisplay(display === '0' ? 'tan(' : display + 'tan('); break;
            case 'asin': setDisplay(display === '0' ? 'asin(' : display + 'asin('); break;
            case 'acos': setDisplay(display === '0' ? 'acos(' : display + 'acos('); break;
            case 'atan': setDisplay(display === '0' ? 'atan(' : display + 'atan('); break;
            case 'ln': setDisplay(display === '0' ? 'ln(' : display + 'ln('); break;
            case 'log': setDisplay(display === '0' ? 'log(' : display + 'log('); break;
            case 'sqrt': setDisplay(display === '0' ? 'sqrt(' : display + 'sqrt('); break;
            case 'cbrt': setDisplay(display === '0' ? 'cbrt(' : display + 'cbrt('); break;
            case 'pi': setDisplay(display === '0' ? 'π' : display + 'π'); break;
            case 'e': setDisplay(display === '0' ? 'e' : display + 'e'); break;
            case '^': setDisplay(display + '^'); break;
            case 'root': setDisplay(display + '^(1/'); break; // for yroot
            case '%': setDisplay(display + '%'); break;
            case '!': setDisplay(display + '!'); break;
            case '(': setDisplay(display === '0' ? '(' : display + '('); break;
            case ')': setDisplay(display + ')'); break;
            case 'inv': setDisplay(display === '0' ? '1/(' : display + '1/('); break;
        }
    };

    const factorial = (n) => {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    };

    const calculate = () => {
        try {
            let expr = display
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/sin\(/g, isRad ? 'Math.sin(' : `Math.sin((Math.PI/180)*`)
                .replace(/cos\(/g, isRad ? 'Math.cos(' : `Math.cos((Math.PI/180)*`)
                .replace(/tan\(/g, isRad ? 'Math.tan(' : `Math.tan((Math.PI/180)*`)
                .replace(/asin\(/g, isRad ? 'Math.asin(' : `(180/Math.PI)*Math.asin(`)
                .replace(/acos\(/g, isRad ? 'Math.acos(' : `(180/Math.PI)*Math.acos(`)
                .replace(/atan\(/g, isRad ? 'Math.atan(' : `(180/Math.PI)*Math.atan(`)
                .replace(/ln\(/g, 'Math.log(')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/sqrt\(/g, 'Math.sqrt(')
                .replace(/cbrt\(/g, 'Math.cbrt(')
                .replace(/\^/g, '**');

            expr = expr.replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)));
            expr = expr.replace(/(\d+)%/g, (_, n) => `(${n}/100)`);

            const result = new Function('return ' + expr)();
            const formatted = Math.round(result * 10000000000) / 10000000000;

            setDisplay(formatted.toString());
            setLastAnswer(formatted);
            setIsNewCalculation(true);
        } catch (error) {
            setDisplay('Error');
            setIsNewCalculation(true);
        }
    };

    const handleBack = () => {
        if (display === 'Error' || isNewCalculation) {
            setDisplay('0');
            setIsNewCalculation(false);
        } else {
            setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setIsNewCalculation(false);
    };

    const memAdd = () => { try { const val = parseFloat(display); if (!isNaN(val)) setMemory(memory + val); } catch { } };
    const memSub = () => { try { const val = parseFloat(display); if (!isNaN(val)) setMemory(memory - val); } catch { } };
    const memRecall = () => { setDisplay(memory.toString()); setIsNewCalculation(true); };

    // Beautiful Glassmorphism Design
    const Btn = ({ label, onClick, className = '' }) => (
        <button
            onClick={onClick}
            className={`
                h-10 text-[13px] font-semibold rounded-xl shadow-sm 
                transition-all duration-200 active:scale-90 flex items-center justify-center
                backdrop-blur-sm border border-white/10
                ${className}
            `}
        >
            {label}
        </button>
    );

    return (
        <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col relative text-gray-900">
            {/* Header / Display */}
            <div className="p-6 pb-2 text-right relative z-10 shrink-0">
                <div className="absolute top-4 left-5 text-xs font-medium text-white/60 tracking-wider">
                    SCIENTIFIC
                </div>
                <div className="text-5xl font-light text-white overflow-hidden text-ellipsis whitespace-nowrap h-20 flex items-center justify-end tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    {display}
                </div>
            </div>

            <div className="p-3 grid grid-cols-[3.5fr_4fr] gap-3 flex-grow overflow-auto pb-4">
                {/* Left: Scientific Functions */}
                <div className="grid grid-cols-3 gap-2 content-start">
                    {/* Function Buttons: Low opacity white for "glass" feel, dark text for contrast */}
                    <Btn label="sin" onClick={() => handleFunction('sin')} className="bg-white/20 hover:bg-white/30 text-white" />
                    <Btn label="cos" onClick={() => handleFunction('cos')} className="bg-white/20 hover:bg-white/30 text-white" />
                    <Btn label="tan" onClick={() => handleFunction('tan')} className="bg-white/20 hover:bg-white/30 text-white" />

                    <div className="col-span-3 flex items-center justify-center space-x-0 bg-black/20 rounded-xl p-1 mb-1">
                        <button
                            onClick={() => setIsRad(false)}
                            className={`flex-1 h-8 rounded-lg text-xs font-bold transition-all ${!isRad ? 'bg-white text-blue-900 shadow-md' : 'text-white/70 hover:text-white'}`}
                        >
                            DEG
                        </button>
                        <button
                            onClick={() => setIsRad(true)}
                            className={`flex-1 h-8 rounded-lg text-xs font-bold transition-all ${isRad ? 'bg-white text-blue-900 shadow-md' : 'text-white/70 hover:text-white'}`}
                        >
                            RAD
                        </button>
                    </div>

                    <Btn label="sin⁻¹" onClick={() => handleFunction('asin')} className="bg-white/10 hover:bg-white/20 text-white/90" />
                    <Btn label="cos⁻¹" onClick={() => handleFunction('acos')} className="bg-white/10 hover:bg-white/20 text-white/90" />
                    <Btn label="tan⁻¹" onClick={() => handleFunction('atan')} className="bg-white/10 hover:bg-white/20 text-white/90" />

                    <Btn label="π" onClick={() => handleFunction('pi')} className="bg-white/10 hover:bg-white/20 text-white/90" />
                    <Btn label="e" onClick={() => handleFunction('e')} className="bg-white/10 hover:bg-white/20 text-white/90" />
                    <Btn label="xʸ" onClick={() => handleFunction('^')} className="bg-white/10 hover:bg-white/20 text-white/90" />

                    <Btn label="x²" onClick={() => { handleFunction('^'); handleNumber('2'); }} className="bg-white/10 hover:bg-white/20 text-white/90" />
                    <Btn label="√" onClick={() => handleFunction('sqrt')} className="bg-white/10 hover:bg-white/20 text-white/90" />
                    <Btn label="ln" onClick={() => handleFunction('ln')} className="bg-white/10 hover:bg-white/20 text-white/90" />

                    <Btn label="(" onClick={() => handleFunction('(')} className="bg-white/10 hover:bg-white/20 text-white/90" />
                    <Btn label=")" onClick={() => handleFunction(')')} className="bg-white/10 hover:bg-white/20 text-white/90" />
                    <Btn label="!" onClick={() => handleFunction('!')} className="bg-white/10 hover:bg-white/20 text-white/90" />
                </div>

                {/* Right: Numpad */}
                <div className="grid grid-cols-4 gap-2 content-start">
                    <Btn label="AC" onClick={handleClear} className="bg-red-500 hover:bg-red-400 text-white font-bold" />
                    <Btn label="Back" onClick={handleBack} className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold col-span-2" />
                    <Btn label="÷" onClick={() => handleOperator('÷')} className="bg-amber-500 hover:bg-amber-400 text-white text-lg font-bold" />

                    <Btn label="7" onClick={() => handleNumber('7')} className="bg-white/90 hover:bg-white text-gray-800 text-lg font-bold" />
                    <Btn label="8" onClick={() => handleNumber('8')} className="bg-white/90 hover:bg-white text-gray-800 text-lg font-bold" />
                    <Btn label="9" onClick={() => handleNumber('9')} className="bg-white/90 hover:bg-white text-gray-800 text-lg font-bold" />
                    <Btn label="×" onClick={() => handleOperator('×')} className="bg-amber-500 hover:bg-amber-400 text-white text-lg font-bold" />

                    <Btn label="4" onClick={() => handleNumber('4')} className="bg-white/90 hover:bg-white text-gray-800 text-lg font-bold" />
                    <Btn label="5" onClick={() => handleNumber('5')} className="bg-white/90 hover:bg-white text-gray-800 text-lg font-bold" />
                    <Btn label="6" onClick={() => handleNumber('6')} className="bg-white/90 hover:bg-white text-gray-800 text-lg font-bold" />
                    <Btn label="-" onClick={() => handleOperator('-')} className="bg-amber-500 hover:bg-amber-400 text-white text-lg font-bold" />

                    <Btn label="1" onClick={() => handleNumber('1')} className="bg-white/90 hover:bg-white text-gray-800 text-lg font-bold" />
                    <Btn label="2" onClick={() => handleNumber('2')} className="bg-white/90 hover:bg-white text-gray-800 text-lg font-bold" />
                    <Btn label="3" onClick={() => handleNumber('3')} className="bg-white/90 hover:bg-white text-gray-800 text-lg font-bold" />
                    <Btn label="+" onClick={() => handleOperator('+')} className="bg-amber-500 hover:bg-amber-400 text-white text-lg font-bold" />

                    <Btn label="0" onClick={() => handleNumber('0')} className="bg-white/90 hover:bg-white text-gray-800 text-lg font-bold col-span-2" />
                    <Btn label="." onClick={() => handleNumber('.')} className="bg-white/90 hover:bg-white text-gray-800 text-lg font-bold" />
                    <Btn label="=" onClick={calculate} className="bg-blue-500 hover:bg-blue-400 text-white text-lg font-bold" />
                </div>
            </div>
        </div>
    );
};

export default GeneralCalculator;
