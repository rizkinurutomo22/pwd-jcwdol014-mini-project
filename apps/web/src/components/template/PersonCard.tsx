import Image from 'next/image';

interface Person {
  picture: {
    large: string;
  };
  name: {
    first: string;
    last: string;
  };
  role: string;
  email: string;
  phone: string;
}

interface PersonCardProps {
  person: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div className="group flex flex-col items-center rounded-3xl bg-white shadow-sm hover:bg-purple-600">
      <Image
        src={person.picture.large}
        alt={`${person.name.first} ${person.name.last}`}
        width={128}
        height={128}
        className="w-full rounded-t-3xl"
      />
      <div className="w-full p-5">
        <h3 className="mb-3 truncate text-xl font-bold group-hover:text-white">
          {person.name.first} {person.name.last}
        </h3>
        <p className="truncate font-semibold text-black group-hover:text-white">
          {person.role}
        </p>
        <p className="truncate italic text-black group-hover:text-white">
          {person.email}
        </p>
        <p className="truncate text-black group-hover:text-white">
          {person.phone}
        </p>
      </div>
    </div>
  );
};

export default PersonCard;
