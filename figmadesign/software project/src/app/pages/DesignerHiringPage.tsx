import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Star, CheckCircle } from 'lucide-react';

export default function DesignerHiringPage() {
  const navigate = useNavigate();

  const designers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      skills: ['3D Modeling', 'CAD Design', 'CNC Programming'],
      rating: 4.9,
      reviews: 87,
      completed: 124,
      availability: 'Available',
      hourlyRate: 50,
    },
    {
      id: 2,
      name: 'Mike Chen',
      skills: ['G-code Optimization', '3D Printing', 'Parametric Design'],
      rating: 4.8,
      reviews: 63,
      completed: 89,
      availability: 'Available',
      hourlyRate: 45,
    },
    {
      id: 3,
      name: 'Emma Davis',
      skills: ['Industrial Design', 'Prototyping', 'CAM Programming'],
      rating: 4.7,
      reviews: 52,
      completed: 76,
      availability: 'Busy',
      hourlyRate: 55,
    },
    {
      id: 4,
      name: 'Alex Turner',
      skills: ['Mechanical Design', 'FEA Analysis', 'CNC Machining'],
      rating: 4.9,
      reviews: 94,
      completed: 156,
      availability: 'Available',
      hourlyRate: 60,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hire a Designer</h1>
          <p className="text-gray-600">Find professional designers for custom G-code and 3D modeling work</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {designers.map((designer) => (
            <Card key={designer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-lg">{designer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle>{designer.name}</CardTitle>
                      <Badge variant={designer.availability === 'Available' ? 'default' : 'secondary'}>
                        {designer.availability}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{designer.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({designer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>{designer.completed} projects completed</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {designer.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">${designer.hourlyRate}</div>
                    <div className="text-sm text-gray-600">per hour</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate(`/designer/${designer.id}`)}>
                      View Profile
                    </Button>
                    <Button onClick={() => navigate('/custom-request')}>Hire</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
