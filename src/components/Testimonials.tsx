import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  university: string;
  quote: string;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    university: 'Stanford University',
    quote: 'Thanks to ScholarshipForEveryone, I found and secured a full-ride scholarship that allowed me to attend my dream school without financial stress.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 2,
    name: 'David Chen',
    university: 'MIT',
    quote: 'The scholarship I found through this platform completely changed my academic journey. The application process was straightforward, and I received guidance every step of the way.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 3,
    name: 'Maya Patel',
    university: 'Oxford University',
    quote: 'As an international student, I was worried about funding my education abroad. ScholarshipForEveryone helped me find multiple scholarships specifically for international students.',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Success Stories</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Hear from students who found life-changing scholarships through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.university}</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">{testimonial.quote}</blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 