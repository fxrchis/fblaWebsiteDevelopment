import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I create an account?",
    answer: "Click the 'Sign Up' button in the navigation bar. Choose your role (Student or Employer), fill in your details, and create your account. Students will need to provide their name, email, and phone number. Employers will also need to provide their company name."
  },
  {
    question: "How do I post a job? (For Employers)",
    answer: "Once logged in as an employer, click on 'Post Job' in the navigation menu. Fill in the job details including title, description, requirements, and salary information. Your job posting will be reviewed by our administrators before being published."
  },
  {
    question: "How do I apply for a job? (For Students)",
    answer: "Browse the job listings and click on any job that interests you. On the job details page, click the 'Apply' button. You'll need to upload your resume and optionally include a cover letter. Track your application status in your dashboard."
  },
  {
    question: "How can I track my applications? (For Students)",
    answer: "Go to your dashboard and click on 'My Applications'. Here you can see all your submitted applications and their current status (Pending, Accepted, or Rejected)."
  },
  {
    question: "How do I manage my job postings? (For Employers)",
    answer: "Access your dashboard and click on 'My Postings'. Here you can view, edit, or delete your job postings. You can also see the applications received for each posting."
  },
  {
    question: "Can I change my account type?",
    answer: "Account types (Student/Employer) cannot be changed after registration. If you need to change your account type, please contact our support team."
  },
  {
    question: "How do I update my profile?",
    answer: "Click on your profile picture in the navigation bar and select 'Settings'. Here you can update your personal information, notification preferences, and account settings."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take data security seriously. All personal information is encrypted and stored securely. We never share your personal information with third parties without your consent."
  }
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <motion.button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    <span className="ml-6 flex-shrink-0">
                      <motion.svg
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        className="h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    </span>
                  </motion.button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4"
                      >
                        <p className="text-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
