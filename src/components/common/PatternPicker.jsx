const PatternPicker = ({ selected, onChange, patterns }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {patterns.map((pattern) => (
                <button
                    key={pattern.value}
                    onClick={() => onChange(pattern.value)}
                    className={`p-2 border rounded-lg flex items-center justify-center ${selected === pattern.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-600'}`}
                    title={pattern.label}
                >
                    <div className={`w-6 h-6 ${getPatternStyle(pattern.value)}`}></div>
                </button>
            ))}
        </div>
    );
};

const getPatternStyle = (pattern) => {
    switch (pattern) {
        case 'square':
            return 'bg-current';
        case 'dots':
            return 'rounded-full bg-current';
        case 'rounded':
            return 'rounded-md bg-current';
        case 'extra-rounded':
            return 'rounded-lg bg-current';
        default:
            return 'bg-current';
    }
};

export default PatternPicker;