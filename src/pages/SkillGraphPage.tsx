
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses, currentUser } from '@/data/mockData';

const SkillGraphPage = () => {
  // Filter enrolled courses
  const enrolledCourses = courses.filter(course => 
    currentUser.coursesEnrolled.includes(course.id)
  );
  
  // Calculate overall progress
  const totalProgress = enrolledCourses.length > 0 
    ? enrolledCourses.reduce((acc, course) => acc + (course.progress || 0), 0) / enrolledCourses.length
    : 0;
  
  // Prepare data for chart
  const chartData = enrolledCourses.map(course => ({
    name: course.title,
    progress: course.progress,
  }));
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Skill Graph</h1>
        <p className="text-gray-600 mt-2">
          Track your progress across different courses and skills.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.completedLevels.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.points}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">{totalProgress.toFixed(0)}%</div>
            <div className="progress-indicator">
              <div 
                className="progress-bar bg-primary" 
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>
            Visualizing your progress across different courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#9b87f5">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(258, 74%, ${55 + index * 5}%)`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">No course data available yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {enrolledCourses.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">You haven't enrolled in any courses yet</h3>
          <p className="text-gray-500 mt-2">Enroll in courses to track your progress</p>
        </div>
      )}
    </div>
  );
};

export default SkillGraphPage;
