'use client';

import { useState } from 'react';
import Input from '@/components/template/Input';

const PromotionForm = () => {
  const [discountType, setDiscountType] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [maxUses, setMaxUses] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const promotionData = {
      discountType,
      discountValue,
      maxUses,
    };
    console.log('Promotion Data:', promotionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Discount Type"
        name="discountType"
        type="text"
        value={discountType}
        onChange={(e) => setDiscountType(e.target.value)}
      />
      <Input
        label="Discount Value (%)"
        name="discountValue"
        type="number"
        value={discountValue}
        onChange={(e) => setDiscountValue(e.target.value)}
      />
      <Input
        label="Max Uses"
        name="maxUses"
        type="number"
        value={maxUses}
        onChange={(e) => setMaxUses(e.target.value)}
      />
      <br />
      <button
        type="submit"
        className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-500"
      >
        Create Promotion
      </button>
    </form>
  );
};

export default PromotionForm;
