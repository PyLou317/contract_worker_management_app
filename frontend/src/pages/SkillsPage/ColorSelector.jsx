import { useState } from 'react';
import skillColorClasses from './SkillColorClasses';

const colors = Object.keys(skillColorClasses);

export default function ColorSelector({ onColorChange }) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    onColorChange(e.target.value);
  };

  function capitalizeFirstLetter(word) {
    if (typeof word !== 'string' || word.length === 0) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className="flex flex-row space-y-4 gap-4">
      <div>
        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="color">
          Base Color
        </label>
        <select
          className="border rounded-lg p-2 w-full h-[40px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="color"
          name="color"
          value={selectedColor}
          onChange={handleColorChange}
          required
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {capitalizeFirstLetter(color)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center items-center mt-2">
        <div
          className={`h-10 w-10 rounded-lg border border-gray-300 shadow-lg transition-all duration-300 ${skillColorClasses[selectedColor][1]}`}
        ></div>
      </div>
    </div>
  );
}
