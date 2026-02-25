const fs = require('fs');

const calculators = {
    // 1. Finance
    margin: { topic: "profit margins, revenue, and product pricing strategy" },
    loan: { topic: "monthly loan payments, amortization, and total interest", isSpecific: true },
    savings: { topic: "future goal timelines and compounding effect for savings" },
    deposit: { topic: "fixed-term deposit maturity amounts and after-tax interest" },
    salary: { topic: "net take-home pay by estimating income taxes and deductions" },
    severance: { topic: "employee severance pay and retirement payouts" },
    estate: { topic: "real estate acquisition taxes and property closing costs" },
    stock: { topic: "stock investment returns, profit margins, and yield" },
    exchange: { topic: "currency exchange rates for international finance" },
    inflation: { topic: "purchasing power adjustments across different years" },
    giftTax: { topic: "estimated gift tax liabilities and applicable deductions" },
    "401k": { topic: "long-term 401(k) retirement balance and employer matches", isSpecific: true },
    rothIra: { topic: "Roth vs Traditional IRA growth and tax advantages" },
    creditCardPayoff: { topic: "debt elimination timelines and total interest paid" },
    salaryHourly: { topic: "annual salary equivalencies to hourly and weekly rates" },
    dutchPay: { topic: "splitting bills evenly among friends, including tips and taxes" },
    tip: { topic: "restaurant tips and split totals per person" },

    // 2. Health & Lifestyle
    bmi: { topic: "Body Mass Index (BMI) categories to assess general health", isSpecific: true },
    bmr: { topic: "Basal Metabolic Rate (BMR) to understand baseline calorie burn" },
    calories: { topic: "calories burned during various physical activities and exercises" },
    whr: { topic: "Waist-to-Hip Ratio (WHR) to evaluate body fat distribution" },
    idealWeight: { topic: "ideal body weight estimates based on age, height, and gender" },
    waterIntake: { topic: "daily hydration goals tailored to your weight and activity" },
    smokingCost: { topic: "financial costs and health impacts of long-term smoking" },
    menstrualCycle: { topic: "menstrual cycles, ovulation days, and fertile windows" },
    childGrowth: { topic: "infant and child growth charts relative to standard percentiles" },
    caffeine: { topic: "daily caffeine intake against safe health limits" },
    childObesity: { topic: "childhood obesity levels using adjusted pediatric BMI" },
    macro: { topic: "macronutrient splits (Carbs, Protein, Fat) for dietary planning" },
    bac: { topic: "Blood Alcohol Concentration (BAC) limits and sobriety estimates" },
    tdee: { topic: "Total Daily Energy Expenditure (TDEE) for weight management", isSpecific: true },
    sleep: { topic: "optimal sleep cycles and wake-up times to feel refreshed" },
    petAge: { topic: "dog and cat ages converted into equivalent human years" },
    age: { topic: "international age, chronological age, and zodiac signs" },
    date: { topic: "days elapsed or remaining for important D-Day events" },
    militaryService: { topic: "military discharge dates and service completion percentages" },

    // 3. Math & Core
    percent: { topic: "percentage changes, fractions, and ratio derivations" },
    vat: { topic: "Value Added Tax (VAT), gross amounts, and net amounts" },
    area: { topic: "surface area of 2D geometric shapes like circles and rectangles" },
    volume: { topic: "volume of 3D geometric shapes like cylinders and spheres" },
    gpa: { topic: "academic Grade Point Averages (GPA) across different grading scales" },
    unitPrice: { topic: "unit prices to determine the most cost-effective grocery deals" },
    time: { topic: "duration differences between two precise dates and times" },
    baseConverter: { topic: "number base conversions like Binary, Hex, and Decimal" },
    discount: { topic: "final sale prices and total savings after percent discounts" },

    // 4. Units & Misc
    cookingConverter: { topic: "recipe measurement conversions between cups, spoons, and mL" },
    globalSizeConverter: { topic: "international clothing and shoe size charts" },
    gasCost: { topic: "trip fuel expenses based on distance, efficiency, and gas price" },
    areaConverter: { topic: "land area conversions like Pyung, Acres, and Hectares" },
    lengthConverter: { topic: "distance and length conversions across metric and imperial systems" },
    volumeConverter: { topic: "liquid volume conversions including gallons and liters" },
    weightConverter: { topic: "mass and weight conversions like pounds, ounces, and kilograms" },

    // 5. Engineering & Smart Farm
    ohmsLaw: { topic: "voltage, current, resistance, and power using Ohm's Law" },
    voltageDrop: { topic: "electrical voltage drops across wire distances and gauges" },
    fertilizer: { topic: "fertilizer dilution ratios and chemical dosing for agriculture" },
    vpd: { topic: "Vapor Pressure Deficit (VPD) to optimize greenhouse climates" },

    // 6. Lotto
    kerala: { topic: "Kerala Lottery random number variations", customDesc: "The Kerala Lottery Generator relies on verifiable random number generation to produce potential winning combinations tailored to Indian Kerala state lotto rules.", isSpecific: true },
    lottoTax: { topic: "net lottery payout reductions based on state and federal taxes" },
    lotto: { topic: "standard 6/45 lottery number combinations" },
    universalLotto: { topic: "custom lotto combinations (e.g., Powerball, Mega Millions)", isSpecific: true }
};

const finalData = {};

for (const [key, meta] of Object.entries(calculators)) {
    // Generate specialized EN text for each
    const niceName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

    let description = meta.customDesc || `The ${niceName} Calculator is a specialized tool designed to help you accurately determine ${meta.topic}. Whether you are planning ahead or need quick daily answers, this tool provides instantly reliable results tailored to your specific inputs.`;

    if (meta.isSpecific) {
        if (key === 'loan') {
            description = "A Loan Calculator is a powerful financial tool that helps you estimate your monthly loan payments. Whether you're looking at a mortgage, auto loan, or personal loan, understanding your monthly repayment obligations is crucial for maintaining financial health.";
        } else if (key === 'bmi') {
            description = "BMI (Body Mass Index) is a simple index of weight-for-height commonly used to classify underweight, overweight, and obesity in adults. It serves as an essential screening tool for metabolic health risks.";
        } else if (key === '401k') {
            description = "The 401(k) Retirement Calculator forecasts your retirement nest egg. It factors in employer matches, current balance, and expected market returns to help you plan your financial future.";
        } else if (key === 'tdee') {
            description = "Total Daily Energy Expenditure (TDEE) estimates the number of calories your body burns in a day, accounting for both your resting metabolism and your daily physical activity levels. It's the ultimate metric for weight management.";
        } else if (key === 'universalLotto') {
            description = "The Universal Lotto Generator is a comprehensive tool predicting number sets for major worldwide lotteries, including US Powerball, Mega Millions, and EuroJackpot, using a balanced random distribution algorithm.";
        }
    }

    let howTo = [
        "Enter the required values in the designated input fields.",
        "Adjust any optional settings (like measurement units) to match your region.",
        "Click the calculate button to process your data.",
        "Review the detailed breakdown and final result provided below."
    ];

    if (key === 'loan') howTo = ["Enter the total loan amount (Principal).", "Input the annual interest rate (APR).", "Specify the loan term in years or months.", "Click 'Calculate' to see your monthly payment and total interest."];
    else if (key === 'bmi') howTo = ["Select your preferred measurement system.", "Input your exact height and weight.", "Click Calculate to view your BMI score.", "Check your status against the standard WHO categories."];

    let formula = `Standard logic and mathematical formulas tailored for calculating ${meta.topic}.`;
    if (key === 'loan') formula = "Monthly Payment = [P x r x (1 + r)^n] / [(1 + r)^n - 1]\nWhere:\nP = Principal loan amount\nr = Monthly interest rate (Annual Rate / 12)\nn = Number of months";
    else if (key === 'bmi') formula = "Metric: BMI = weight (kg) / [height (m)]²\nImperial: BMI = 703 × weight (lbs) / [height (in)]²";
    else if (key === 'ohmsLaw') formula = "V = I × R (Voltage = Current × Resistance)\nP = V × I (Power = Voltage × Current)";

    let faq = [
        { q: `Is this ${niceName} calculation completely accurate?`, a: `Yes, our tool utilizes standard formulas and real-time updates to provide precise ${meta.topic}. However, always consider results as estimations for professional scenarios.` },
        { q: "Is my inputted data saved?", a: "No, all calculations are performed locally in your browser. We respect your privacy and do not store your personal inputs." }
    ];

    if (key === 'loan') {
        faq = [
            { q: "How is the monthly payment calculated?", a: "We use the standard amortization formula. This ensures that a portion of your payment goes towards interest and the rest reduces your principal balance." },
            { q: "Can I make extra payments?", a: "Yes! Making extra payments directly reduces your principal balance, which decreases the total interest paid and shortens your loan term." }
        ];
    } else if (key.toLowerCase().includes('lotto') || key === 'kerala') {
        faq = [
            { q: "Do these numbers increase my chances of winning?", a: "No. Lottery draws are purely random events. Our generator provides random numbers, but it does not predict future outcomes or improve odds." }
        ];
    }

    finalData[key] = { description, howTo, formula, faq };
}

fs.writeFileSync('base_info_en.json', JSON.stringify(finalData, null, 2));
console.log("Created base_info_en.json with 61 calculators!");
