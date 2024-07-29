'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';
import EventGrid from '@/components/EventGrid';
import axios from 'axios';

const carouselItems = [
  {
    src: '/images/Music/55a3c49f5cc6e8a7d625caf42af8fa0b.jpg',
    link: '/event/music/aaa',
  },
  {
    src: '/images/Music/7bff21e71989d391d34c05cb9d36948d.jpg',
    link: '/event/music/bbb',
  },
  {
    src: '/images/Music/0fb517cc9cf2b7db7c09c6203b3913ec.jpg',
    link: '/event/music/ccc',
  },
  {
    src: '/images/Music/572b5a8fec8a603acf6eaa6ea358f49c.jpg',
    link: '/event/music/ddd',
  },
  {
    src: '/images/Music/afac2cc0ed5619aaccbcb997371d71c7.jpg',
    link: '/event/music/eee',
  },
];

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Header />
      <div id="home-page" className="bg-gradient-main">
        <div className="pb-10">
          <Carousel items={carouselItems} />
        </div>
        <div className="px-10 pb-10 md:px-20">
          <EventGrid events={events} h={'Upcoming Events'} loading={loading} />
          {/* <EventGrid events={premiereEvents} h={'Premiere Events'} /> */}
          {/* <EventGrid events={promotionEvents} h={'Promotion Events'} /> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
