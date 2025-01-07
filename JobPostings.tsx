import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  status: string;
  createdAt: string;
  hasApplied?: boolean;
}

const JobPostings = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    salary: '',
    search: '',
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Fetch all approved jobs
        const jobsRef = collection(db, 'jobs');
        const q = query(jobsRef, where('status', '==', 'approved'));
        const querySnapshot = await getDocs(q);
        let jobsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt || new Date().toISOString(),
          hasApplied: false
        })) as JobPosting[];

        if (currentUser) {
          const applicationsRef = collection(db, 'applications');
          const applicationsQuery = query(
            applicationsRef,
            where('userId', '==', currentUser.uid)
          );
          const applicationsSnapshot = await getDocs(applicationsQuery);
          const appliedJobIds = new Set(
            applicationsSnapshot.docs.map(doc => doc.data().jobId)
          );

          jobsData = jobsData.map(job => ({
            ...job,
            hasApplied: appliedJobIds.has(job.id)
          }));
        }

        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentUser]);

  useEffect(() => {
    const filtered = jobs.filter(job => {
      const matchesType = !filters.type || job.type === filters.type;
      const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesSalary = !filters.salary || job.salary === filters.salary;
      const matchesSearch = !filters.search || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase());

      return matchesType && matchesLocation && matchesSalary && matchesSearch;
    });

    setFilteredJobs(filtered);
  }, [jobs, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Positions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <input
                type="text"
                name="search"
                placeholder="Search jobs..."
                value={filters.search}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
              <input
                type="text"
                name="location"
                placeholder="Location..."
                value={filters.location}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="salary"
                value={filters.salary}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Salary Range</option>
                <option value="0-30000">$0 - $30,000</option>
                <option value="30000-50000">$30,000 - $50,000</option>
                <option value="50000-80000">$50,000 - $80,000</option>
                <option value="80000+">$80,000+</option>
              </select>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600 mt-1">{job.company}</p>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Location:</span> {job.location}
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Type:</span> {job.type}
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Salary:</span> {job.salary}
                          </p>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                        </div>
                        {job.requirements && job.requirements.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
                            <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                              {job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="ml-6">
                        {job.hasApplied ? (
                          <span className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100">
                            Applied
                          </span>
                        ) : (
                          <Link
                            to={`/apply/${job.id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Apply Now
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostings;
