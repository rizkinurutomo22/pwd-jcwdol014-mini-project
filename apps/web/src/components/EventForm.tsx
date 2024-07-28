'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/template/Input';
import Select from '@/components/template/Select';
import DatePicker from '@/components/template/DatePicker';
import TimePicker from '@/components/template/TimePicker';
import TextArea from '@/components/template/TextArea';
import axios from 'axios';

const eventTypes = ['free', 'paid'];
const eventCategory = ['Unknown', 'Music', 'Stand Up', 'Festival'];

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [availableSeats, setAvailableSeats] = useState<number | string>('');
  const [ticketType, setTicketType] = useState(eventTypes[0]);
  const [category, setCategory] = useState(eventCategory[0]);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPromotion, setShowPromotion] = useState(false);
  // Promotion
  const [discountValue, setDiscountValue] = useState<number | string>('');
  const [maxUses, setMaxUses] = useState<number | string>('');
  const [referralCode, setReferralCode] = useState('');
  const [validUntil, setValidUntil] = useState('');

  useEffect(() => {
    if (ticketType === 'free') {
      setPrice(0);
    }
  }, [ticketType]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setError(null);
    } else {
      setError('Please upload a valid image file');
      setImage(null);
    }
  };

  const validateForm = () => {
    if (!image) {
      setError('No image selected');
      return false;
    }
    if (
      Number(price) < 0 ||
      Number(availableSeats) < 0 ||
      Number(discountValue) < 0 ||
      Number(maxUses) < 0
    ) {
      setError(
        'Price, available seats, discount value, and max uses cannot be negative',
      );
      return false;
    }
    if (ticketType === 'free' && Number(price) !== 0) {
      setError('Price must be 0 for free events');
      return false;
    }
    if (Number(maxUses) > Number(availableSeats)) {
      setError('Max uses cannot be greater than available seats');
      return false;
    }
    if (validUntil && new Date(validUntil) > new Date(date)) {
      setError('Valid until date cannot be later than the event date');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Menggabungkan date dan time ke format ISO
    const eventDateTime = new Date(`${date}T${time}`).toISOString();

    const eventData = {
      name: eventName,
      type: ticketType,
      price: Number(price),
      seat: Number(availableSeats),
      location,
      category,
      dateTime: eventDateTime,
      thumbnail: image ? image.name : '',
      description,
      updatedAt: new Date().toISOString(),
    };

    let message = '';

    try {
      const eventResponse = await axios.post(
        'http://localhost:8000/api/event-management/create-event',
        eventData,
      );

      if (eventResponse.status !== 201) {
        message = 'Failed to create event';
        throw new Error('Failed to create event');
      }

      message = 'Event created successfully';
      console.log('Event created successfully');

      // Reset state input setelah submit berhasil
      setEventName('');
      setPrice('');
      setDate('');
      setTime('');
      setLocation('');
      setDescription('');
      setAvailableSeats('');
      setTicketType(eventTypes[0]);
      setCategory(eventCategory[0]);
      setImage(null);
      setShowPromotion(false);
      setDiscountValue('');
      setMaxUses('');
      setReferralCode('');
      setValidUntil('');
      setError(null);
    } catch (error) {
      message = 'Failed to create event';
      console.error('Error creating event: ', error);
      setError('Failed to create event');
      alert(message);
      return;
    }

    // Handle promotion data
    if (
      showPromotion &&
      (discountValue || maxUses || referralCode || validUntil)
    ) {
      // Menggabungkan validUntil ke format ISO
      const promoValidUntil = new Date(`${validUntil}`).toISOString();

      const promotionData = {
        event_id: 1, // Assuming eventResponse returns the created event ID
        event_name: eventName,
        org_id: 8,
        org_name: '',
        referal_code: referralCode,
        discout: Number(discountValue),
        max_uses: Number(maxUses),
        remaining: Number(maxUses),
        valid_until: promoValidUntil,
        updatedAt: new Date().toISOString(),
      };

      try {
        const promoResponse = await axios.post(
          'http://localhost:8000/api/event-management/create-promotion',
          promotionData,
        );

        if (promoResponse.status !== 201) {
          message += ' but failed to create promotion';
          throw new Error('Failed to create promotion');
        }

        message += ' and promotion created successfully';
        console.log('Promotion created successfully');
      } catch (error) {
        message += ' but failed to create promotion';
        console.error('Error creating promotion: ', error);
        setError('Failed to create promotion');
      }
    }

    alert(message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Event Name"
        name="eventName"
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <Select
        label="Ticket Type"
        name="ticketType"
        options={eventTypes}
        value={ticketType}
        onChange={(e) => setTicketType(e.target.value)}
      />
      <Input
        label="Event Price (IDR)"
        name="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={ticketType === 'free'}
      />
      <Input
        label="Available Seats"
        name="availableSeats"
        type="number"
        value={availableSeats}
        onChange={(e) => setAvailableSeats(e.target.value)}
      />
      <Input
        label="Location"
        name="location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Select
        label="Event Category"
        name="category"
        options={eventCategory}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <DatePicker
        label="Event Date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TimePicker
        label="Time"
        name="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <div>
        <label className="block text-lg text-black">
          Thumbnail / Poster Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        {image && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-auto w-full rounded-md"
            />
          </div>
        )}
      </div>
      <TextArea
        label="Event Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* Promotion */}
      <div className="mb-8 mt-4 h-1 rounded-full bg-purple-600"></div>
      <div className="flex items-center">
        <label
          htmlFor="input-promotion-checkbox"
          className="text-md mr-4 text-purple-400"
        >
          <span className="text-semibold italic">Add Promotion</span>
        </label>
        <input
          id="input-promotion-checkbox"
          type="checkbox"
          checked={showPromotion}
          onChange={(e) => setShowPromotion(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        />
      </div>
      {showPromotion && (
        <>
          <Input
            label="Referral Code"
            name="referralCode"
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
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
          <DatePicker
            label="Valid Until"
            name="validUntil"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
          />
        </>
      )}
      <br />
      {error && <p className="text-semibold mt-2 text-red-600">{error}</p>}
      <br />
      <button
        type="submit"
        className="mb-10 w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
