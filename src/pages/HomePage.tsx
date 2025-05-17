
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses, currentUser } from "@/data/mockData";
import StreakPointsCard from "@/components/user/StreakPointsCard";

const HomePage = () => {
  const featuredCourses = courses.filter(course => course.isRecommended).slice(0, 3);
  
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome to SkillSprint</h1>
            <p className="text-gray-600 max-w-3xl">
              Accelerate your growth with interactive courses, skill tracking, and a
              supportive community. Learn, practice, and compete on your journey to mastery.
            </p>
          </div>
          
          {currentUser && (
            <div className="flex-shrink-0">
              <StreakPointsCard points={currentUser.points} streak={currentUser.streak} />
            </div>
          )}
        </div>
        <div className="flex gap-4 pt-2">
          <Button asChild>
            <Link to="/courses">Explore Courses</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/skill-graph">View Your Progress</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recommended for You</h2>
          <Button variant="ghost" asChild size="sm">
            <Link to="/courses" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/10 text-primary font-medium">
                  {course.icon}
                </div>
                <span className="skill-level-badge lowercase first-letter:uppercase">
                  {course.level}
                </span>
              </div>
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-gray-600 mt-2 mb-4">{course.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="progress-indicator">
                  <div 
                    className="progress-bar bg-primary" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500">
                  {course.totalHours} hours
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary/5 rounded-lg p-6 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Ready to challenge yourself?</h2>
            <p className="text-gray-600 mt-1">
              Join a hackathon and apply your skills to real-world problems.
            </p>
          </div>
          <Button asChild>
            <Link to="/hackbuddies">Find Hackathons</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
