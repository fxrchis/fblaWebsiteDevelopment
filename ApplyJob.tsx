import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  employerId: string;
}

const ApplyJob = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    resume: '',
    coverLetter: '',
  });

  const { jobId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;

      try {
        const jobDoc = await getDoc(doc(db, 'jobs', jobId));
        
        if (jobDoc.exists()) {
          const jobData = jobDoc.data() as Job;
          setJob({ ...jobData, id: jobDoc.id });
        } else {
          setError('Job not found');
        }
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !job) return;

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      
      const applicationsRef = collection(db, 'applications');
      const existingQuery = query(
        applicationsRef,
        where('userId', '==', currentUser.uid),
        where('jobId', '==', jobId)
      );
      const existingApps = await getDocs(existingQuery);

      if (!existingApps.empty) {
        setError('You have already applied for this position');
        return;
      }

      
      const applicationData = {
        jobId,
        userId: currentUser.uid,
        employerId: job.employerId,
        status: 'pending',
        createdAt: serverTimestamp(),
        resume: formData.resume,
        coverLetter: formData.coverLetter || null,
      };

      await addDoc(collection(db, 'applications'), applicationData);
      setSuccess('Application submitted successfully!');

      
      setTimeout(() => {
        navigate('/my-applications');
      }, 2000);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Job Not Found</h2>
            <p className="mt-2 text-gray-600">The job posting you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border-t-4 border-blue-800">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <svg className="w-8 h-8 text-blue-800 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">Apply for Position</h2>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
              <p className="text-gray-600 mt-1">{job.company}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium text-gray-900">Location:</span> {job.location}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Type:</span> {job.type}
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
                <p className="text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                  Resume Link
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    id="resume"
                    name="resume"
                    required
                    value={formData.resume}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://drive.google.com/..."
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Please provide a link to your resume (Google Drive, Dropbox, etc.)
                </p>
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                  Cover Letter Link (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://drive.google.com/..."
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Optional: Provide a link to your cover letter
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/job-postings')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
