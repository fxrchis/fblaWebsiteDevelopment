import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      title: 'Easy Job Search',
      description: 'Find relevant job opportunities tailored for high school students',
      icon: '🔍',
    },
    {
      title: 'Direct Applications',
      description: 'Apply directly to jobs through our platform',
      icon: '📝',
    },
    {
      title: 'Employer Connections',
      description: 'Connect with local employers looking for young talent',
      icon: '🤝',
    },
    {
      title: 'Career Growth',
      description: 'Start building your career path early',
      icon: '📈',
    },
  ];

  const howItWorks = [
    {
      title: 'Create Your Profile',
      description: 'Sign up and create your student profile with your skills and interests',
      icon: '👤',
    },
    {
      title: 'Browse Opportunities',
      description: 'Explore job postings from local businesses and organizations',
      icon: '🔎',
    },
    {
      title: 'Apply with Ease',
      description: 'Submit applications directly through our platform',
      icon: '✉️',
    },
    {
      title: 'Get Hired',
      description: 'Connect with employers and start your career journey',
      icon: '🎯',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'High School Student',
      image: '/images/girl1.png',
      content: 'CareerBridge helped me find my first part-time job! The process was so simple and straightforward.',
    },
    {
      name: 'Mike Brown',
      role: 'Local Business Owner',
      image: '/images/owner.png',
      content: 'As an employer, I love how easy it is to connect with motivated young talent in our community.',
    },
    {
      name: 'Emily Chen',
      role: 'High School Junior',
      image: '/images/girl2.png',
      content: 'Thanks to CareerBridge, I found an amazing internship that aligns with my career goals.',
    },
  ];

  const impactStats = [
    { number: 'Helped Students', label: '' },
    { number: 'Partnered Employers', label: '' },
    { number: 'Job Opportunities', label: '' },
    { number: 'Thriving Communities', label: '' },
  ];

  return (
    <div className="min-h-screen">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-32"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Launch Your Career Journey Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-50">
              Connecting ambitious high school students with meaningful job opportunities
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/jobs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg shadow-lg hover:bg-primary-50 transition-all duration-200 flex items-center justify-center"
                >
                  Find Jobs
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What is CareerBridge?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CareerBridge is a revolutionary platform that bridges the gap between high school students
              and local employers, creating meaningful employment opportunities that foster career growth
              and community development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-gray-900">
                Empowering Students
              </h3>
              <p className="text-lg text-gray-600">
                We believe every student deserves the opportunity to gain real-world experience and
                develop professional skills. Our platform makes it easy to:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary-600 mt-1 mr-2" />
                  <span className="text-gray-600">Discover jobs that match your interests and schedule</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary-600 mt-1 mr-2" />
                  <span className="text-gray-600">Build your professional profile and resume</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary-600 mt-1 mr-2" />
                  <span className="text-gray-600">Connect with local employers who value young talent</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/images/workingstudents.jpg"
                alt="Students working"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-primary-600 opacity-10 rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How CareerBridge Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started with CareerBridge in four simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-primary-600">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRightIcon className="w-6 h-6 text-primary-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-primary-100">
              Making a difference in students' lives and local businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CareerBridge?
            </h2>
            <p className="text-xl text-gray-600">
              We make it easy to start your career journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-primary-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Success stories from students and employers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join CareerBridge today and discover amazing opportunities
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg shadow-lg hover:bg-primary-50 transition-all duration-200"
                >
                  Sign Up Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
