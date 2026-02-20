import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

const GpaCalculator = () => {
    const { t } = useTranslation();

    // Scale: A=4, B=3, C=2, D=1, F=0
    // Weight: Regular=0, Honors=+0.5, AP/IB=+1.0

    const [courses, setCourses] = useState([
        { name: 'Course 1', grade: 'A', credits: 3, type: 'regular' },
        { name: 'Course 2', grade: 'B', credits: 3, type: 'regular' },
        { name: 'Course 3', grade: 'A', credits: 4, type: 'ap' },
    ]);

    const [result, setResult] = useState(null);

    const gradePoints = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'D-': 0.7,
        'F': 0.0
    };

    const weights = {
        'regular': 0,
        'honors': 0.5,
        'ap': 1.0,
        'ib': 1.0
    };

    const addCourse = () => {
        setCourses([...courses, { name: `Course ${courses.length + 1}`, grade: 'A', credits: 3, type: 'regular' }]);
    };

    const removeCourse = (index) => {
        if (courses.length > 1) {
            const newCourses = courses.filter((_, i) => i !== index);
            setCourses(newCourses);
        }
    };

    const updateCourse = (index, field, value) => {
        const newCourses = [...courses];
        newCourses[index][field] = value;
        setCourses(newCourses);
    };

    const calculateGpa = () => {
        let totalCredits = 0;
        let totalUnweightedPoints = 0;
        let totalWeightedPoints = 0;

        courses.forEach(c => {
            const cred = parseFloat(c.credits);
            const basePoint = gradePoints[c.grade] || 0;
            const weightAdd = weights[c.type] || 0;

            if (cred > 0) {
                totalCredits += cred;
                totalUnweightedPoints += (basePoint * cred);
                totalWeightedPoints += ((basePoint + weightAdd) * cred);
            }
        });

        if (totalCredits > 0) {
            setResult({
                unweighted: (totalUnweightedPoints / totalCredits).toFixed(2),
                weighted: (totalWeightedPoints / totalCredits).toFixed(2),
                totalCredits
            });
        } else {
            setResult(null);
        }
    };

    useEffect(() => {
        calculateGpa();
    }, [courses]);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_gpa')} id="gpa" icon={<GraduationCap className="text-amber-500" />} />

            <div className="space-y-6 mt-6">
                <div className="space-y-4">
                    {courses.map((course, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl items-end md:items-center">
                            <div className="flex-1 w-full">
                                <label className="text-xs text-gray-500 dark:text-gray-400 ml-1 mb-1 block md:hidden">{t('label_course_name')}</label>
                                <input
                                    type="text"
                                    value={course.name}
                                    onChange={(e) => updateCourse(index, 'name', e.target.value)}
                                    placeholder={t('label_course_name')}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 text-sm"
                                />
                            </div>
                            <div className="w-24">
                                <label className="text-xs text-gray-500 dark:text-gray-400 ml-1 mb-1 block md:hidden">{t('label_grade')}</label>
                                <select
                                    value={course.grade}
                                    onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 text-sm"
                                >
                                    {Object.keys(gradePoints).map(g => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-20">
                                <label className="text-xs text-gray-500 dark:text-gray-400 ml-1 mb-1 block md:hidden">{t('label_credits')}</label>
                                <input
                                    type="number"
                                    value={course.credits}
                                    onChange={(e) => updateCourse(index, 'credits', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 text-sm"
                                />
                            </div>
                            <div className="w-32">
                                <label className="text-xs text-gray-500 dark:text-gray-400 ml-1 mb-1 block md:hidden">{t('label_type')}</label>
                                <select
                                    value={course.type}
                                    onChange={(e) => updateCourse(index, 'type', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 text-sm"
                                >
                                    <option value="regular">{t('type_regular')}</option>
                                    <option value="honors">{t('type_honors')}</option>
                                    <option value="ap">{t('type_ap')}</option>
                                    <option value="ib">{t('type_ib')}</option>
                                </select>
                            </div>
                            <button
                                onClick={() => removeCourse(index)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                disabled={courses.length <= 1}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={addCourse}
                        className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus size={18} /> {t('btn_add_course')}
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('label_gpa_weighted')}</p>
                                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
                                    {result.weighted}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('label_gpa_unweighted')}</p>
                                <p className="text-4xl font-bold text-gray-700 dark:text-gray-200">
                                    {result.unweighted}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Scale: 4.0</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GpaCalculator;
