
import { useState } from "react";
import { Trophy, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { topUsers } from "@/data/mockData";

const LeaderboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredUsers = topUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-gray-600 mt-2">
          See the top performers and your current ranking.
        </p>
      </div>
      
      <div className="flex justify-end">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 font-semibold text-gray-500 border-b">
          <div className="col-span-1">Rank</div>
          <div className="col-span-7 sm:col-span-5">User</div>
          <div className="col-span-4 sm:col-span-3 text-right">Points</div>
          <div className="hidden sm:block sm:col-span-3 text-right">Courses</div>
        </div>
        
        {filteredUsers.map((user, index) => (
          <div 
            key={user.id} 
            className={`grid grid-cols-12 gap-4 p-4 items-center ${
              user.id === "1" ? "bg-primary/5" : index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="col-span-1 font-semibold">
              {index === 0 ? (
                <Trophy className="h-5 w-5 text-yellow-500" />
              ) : index === 1 ? (
                <Trophy className="h-5 w-5 text-gray-400" />
              ) : index === 2 ? (
                <Trophy className="h-5 w-5 text-amber-700" />
              ) : (
                index + 1
              )}
            </div>
            <div className="col-span-7 sm:col-span-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <span className="text-gray-500 font-medium">
                  {user.name.substring(0, 1)}
                </span>
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-3 text-right font-semibold">
              {user.points} pts
            </div>
            <div className="hidden sm:block sm:col-span-3 text-right">
              {user.coursesEnrolled.length} enrolled
            </div>
          </div>
        ))}
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
