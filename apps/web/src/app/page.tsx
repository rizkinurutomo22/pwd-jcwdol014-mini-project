import Carousel from '@/components/Carousel';
import EventGrid from '@/components/EventGrid';

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

const upcomingEvents = [
  {
    id: 'a1',
    title: 'Upcoming Event 1',
    imageUrl: '/images/Music/55a3c49f5cc6e8a7d625caf42af8fa0b.jpg',
    description: 'Description of upcoming event 1',
  },
  {
    id: 'a2',
    title: 'Upcoming Event 2',
    imageUrl: '/images/Music/55a3c49f5cc6e8a7d625caf42af8fa0b.jpg',
    description: 'Description of upcoming event 1',
  },
  {
    id: 'a3',
    title: 'Upcoming Event 3',
    imageUrl: '/images/Music/55a3c49f5cc6e8a7d625caf42af8fa0b.jpg',
    description: 'Description of upcoming event 1',
  },
  {
    id: 'a4',
    title: 'Upcoming Event 4',
    imageUrl: '/images/Music/55a3c49f5cc6e8a7d625caf42af8fa0b.jpg',
    description: 'Description of upcoming event 1',
  },
  {
    id: 'a5',
    title: 'Upcoming Event 5',
    imageUrl: '/images/Music/55a3c49f5cc6e8a7d625caf42af8fa0b.jpg',
    description: 'Description of upcoming event 1',
  },
  {
    id: 'a6',
    title: 'Upcoming Event 6',
    imageUrl: '/images/Music/55a3c49f5cc6e8a7d625caf42af8fa0b.jpg',
    description: 'Description of upcoming event 1',
  },
  {
    id: 'a7',
    title: 'Upcoming Event 7',
    imageUrl: '/images/Music/55a3c49f5cc6e8a7d625caf42af8fa0b.jpg',
    description: 'Description of upcoming event 1',
  },
  {
    id: 'a8',
    title: 'Upcoming Event 8',
    imageUrl: '/images/Music/55a3c49f5cc6e8a7d625caf42af8fa0b.jpg',
    description: 'Description of upcoming event 1',
  },
  {
    id: 'a9',
    title: 'Upcoming Event 9',
    imageUrl: '/images/Music/55a3c49f5cc6e8a7d625caf42af8fa0b.jpg',
    description: 'Description of upcoming event 1',
  },
  {
    id: 'a10',
    title: 'Upcoming Event 10',
    imageUrl: '/images/Music/55a3c49f5cc6e8a7d625caf42af8fa0b.jpg',
    description: 'Description of upcoming event 1',
  },
];

const premiereEvents = [
  {
    id: 'b1',
    title: 'Premiere Event 1',
    imageUrl: '/images/Music/7bff21e71989d391d34c05cb9d36948d.jpg',
    description: 'Description of premiere event 1',
  },
  {
    id: 'b2',
    title: 'Premiere Event 2',
    imageUrl: '/images/Music/7bff21e71989d391d34c05cb9d36948d.jpg',
    description: 'Description of premiere event 1',
  },
  {
    id: 'b3',
    title: 'Premiere Event 3',
    imageUrl: '/images/Music/7bff21e71989d391d34c05cb9d36948d.jpg',
    description: 'Description of premiere event 1',
  },
  {
    id: 'b4',
    title: 'Premiere Event 4',
    imageUrl: '/images/Music/7bff21e71989d391d34c05cb9d36948d.jpg',
    description: 'Description of premiere event 1',
  },
  {
    id: 'b5',
    title: 'Premiere Event 5',
    imageUrl: '/images/Music/7bff21e71989d391d34c05cb9d36948d.jpg',
    description: 'Description of premiere event 1',
  },
  {
    id: 'b6',
    title: 'Premiere Event 6',
    imageUrl: '/images/Music/7bff21e71989d391d34c05cb9d36948d.jpg',
    description: 'Description of premiere event 1',
  },
  {
    id: 'b7',
    title: 'Premiere Event 7',
    imageUrl: '/images/Music/7bff21e71989d391d34c05cb9d36948d.jpg',
    description: 'Description of premiere event 1',
  },
  {
    id: 'b8',
    title: 'Premiere Event 8',
    imageUrl: '/images/Music/7bff21e71989d391d34c05cb9d36948d.jpg',
    description: 'Description of premiere event 1',
  },
  {
    id: 'b9',
    title: 'Premiere Event 9',
    imageUrl: '/images/Music/7bff21e71989d391d34c05cb9d36948d.jpg',
    description: 'Description of premiere event 1',
  },
  {
    id: 'b10',
    title: 'Premiere Event 10',
    imageUrl: '/images/Music/7bff21e71989d391d34c05cb9d36948d.jpg',
    description: 'Description of premiere event 1',
  },
];

const promotionEvents = [
  {
    id: 'c1',
    title: 'Promotion Event 1',
    imageUrl: '/images/Music/0fb517cc9cf2b7db7c09c6203b3913ec.jpg',
    description: 'Description of promotion event 1',
  },
  {
    id: 'c2',
    title: 'Promotion Event 2',
    imageUrl: '/images/Music/0fb517cc9cf2b7db7c09c6203b3913ec.jpg',
    description: 'Description of promotion event 1',
  },
  {
    id: 'c3',
    title: 'Promotion Event 3',
    imageUrl: '/images/Music/0fb517cc9cf2b7db7c09c6203b3913ec.jpg',
    description: 'Description of promotion event 1',
  },
  {
    id: 'c4',
    title: 'Promotion Event 4',
    imageUrl: '/images/Music/0fb517cc9cf2b7db7c09c6203b3913ec.jpg',
    description: 'Description of promotion event 1',
  },
  {
    id: 'c5',
    title: 'Promotion Event 5',
    imageUrl: '/images/Music/0fb517cc9cf2b7db7c09c6203b3913ec.jpg',
    description: 'Description of promotion event 1',
  },
  {
    id: 'c6',
    title: 'Promotion Event 6',
    imageUrl: '/images/Music/0fb517cc9cf2b7db7c09c6203b3913ec.jpg',
    description: 'Description of promotion event 1',
  },
  {
    id: 'c7',
    title: 'Promotion Event 7',
    imageUrl: '/images/Music/0fb517cc9cf2b7db7c09c6203b3913ec.jpg',
    description: 'Description of promotion event 1',
  },
  {
    id: 'c8',
    title: 'Promotion Event 8',
    imageUrl: '/images/Music/0fb517cc9cf2b7db7c09c6203b3913ec.jpg',
    description: 'Description of promotion event 1',
  },
  {
    id: 'c9',
    title: 'Promotion Event 9',
    imageUrl: '/images/Music/0fb517cc9cf2b7db7c09c6203b3913ec.jpg',
    description: 'Description of promotion event 1',
  },
  {
    id: 'c10',
    title: 'Promotion Event 10',
    imageUrl: '/images/Music/0fb517cc9cf2b7db7c09c6203b3913ec.jpg',
    description: 'Description of promotion event 1',
  },
];

export default function Home() {
  return (
    <div id="home-page" className="bg-gradient-main">
      <div className="pb-10">
        <Carousel items={carouselItems} />
      </div>
      <div className="px-10 pb-10 md:px-20">
        <EventGrid events={upcomingEvents} h={'Upcoming Events'} />
        <EventGrid events={premiereEvents} h={'Premiere Events'} />
        <EventGrid events={promotionEvents} h={'Promotion Events'} />
      </div>
    </div>
  );
}
