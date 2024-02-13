import react , {useState} from 'react';

function Button() {
    const [selectedButton, setSelectedButton] = useState('all');
    const ALL_BUTTON_ID = 'all-btn';
    const COMPLIANT_BUTTON_ID = 'compliant-btn';
    const NON_COMPLIANT_BUTTON_ID = 'non-compliant-btn';
    const BUTTON_LABELS = {
        [ALL_BUTTON_ID]: 'All',
        [COMPLIANT_BUTTON_ID]: 'Compliant',
        [NON_COMPLIANT_BUTTON_ID]: 'Non-Compliant',
    };
    function handleButtonClick(buttonId) {
        setSelectedButton(buttonId);
      }
      return (
        <div className="flex space-x-2 max-w-sm max-h-12 border-gray-900 rounded-lg mx-10 mt-3 ">
          <button
            id={ALL_BUTTON_ID}
            className={`${selectedButton === ALL_BUTTON_ID ? 'bg-black text-white' : 'bg-white text-black'} flex-1 text-sm font-medium py-2 px-4 rounded-l-lg `}
            onClick={() => handleButtonClick(ALL_BUTTON_ID)}
          >
            All
          </button>
          <button
            id={COMPLIANT_BUTTON_ID}
            className={`${selectedButton === COMPLIANT_BUTTON_ID ? 'bg-black text-white' : 'bg-white text-black'} flex-1 text-sm font-medium py-2 px-4 border-l`}
            onClick={() => handleButtonClick(COMPLIANT_BUTTON_ID)}
          >
            Compliant
          </button>
          <button
            id={NON_COMPLIANT_BUTTON_ID}
            className={`${selectedButton === NON_COMPLIANT_BUTTON_ID ? 'bg-black text-white' : 'bg-white text-black'} flex-1 text-xs font-medium py-2 px-4 border-l rounded-r-lg`}
            onClick={() => handleButtonClick(NON_COMPLIANT_BUTTON_ID)}
          >
            Non-Compliant
          </button>
        </div>
      );
}

export default Button