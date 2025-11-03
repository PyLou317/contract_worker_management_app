import { useState } from 'react';
import SelectInput from '@/components/Inputs/FloatingSelectInput';
import skillColorClasses from './SkillColorClasses';

const colors = Object.keys(skillColorClasses);

export default function ColorSelector({ onColorChange }) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    onColorChange(e.target.value);
  };

  return (
    <div className="flex flex-row items-center gap-4 w-full">
      <SelectInput
        label="Color"
        type="text"
        id="color"
        name="color"
        value={selectedColor}
        onChange={handleColorChange}
        options={colors}
        required
        className="flex-grow-1"
      />
      <div
        className={`h-10 w-10 rounded-lg border border-gray-300 shadow-lg transition-all duration-300 ${skillColorClasses[selectedColor][1]}`}
      ></div>
    </div>
  );
}
