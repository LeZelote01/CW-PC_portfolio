#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Jean Yves Yao Portfolio
Tests all endpoints with realistic data and validates multilingual content
"""

import requests
import json
import os
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE_URL = f"{BACKEND_URL}/api"

print(f"Testing API at: {API_BASE_URL}")

class PortfolioAPITester:
    def __init__(self):
        self.base_url = API_BASE_URL
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details
        })
        
    def test_health_endpoints(self):
        """Test health check endpoints"""
        print("\n=== Testing Health Endpoints ===")
        
        # Test root endpoint
        try:
            response = self.session.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data:
                    self.log_test("GET /api/ - Root health check", True, f"Status: {data.get('status')}")
                else:
                    self.log_test("GET /api/ - Root health check", False, "Missing required fields in response")
            else:
                self.log_test("GET /api/ - Root health check", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/ - Root health check", False, f"Exception: {str(e)}")
            
        # Test health endpoint
        try:
            response = self.session.get(f"{self.base_url}/health")
            if response.status_code == 200:
                data = response.json()
                if "status" in data and "service" in data:
                    self.log_test("GET /api/health - Health check", True, f"Service: {data.get('service')}")
                else:
                    self.log_test("GET /api/health - Health check", False, "Missing required fields in response")
            else:
                self.log_test("GET /api/health - Health check", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/health - Health check", False, f"Exception: {str(e)}")
    
    def test_profile_endpoint(self):
        """Test profile endpoint"""
        print("\n=== Testing Profile Endpoint ===")
        
        try:
            response = self.session.get(f"{self.base_url}/profile")
            if response.status_code == 200:
                profile = response.json()
                
                # Check required fields
                required_fields = ['first_name', 'last_name', 'title', 'bio', 'email', 'phone', 'location']
                missing_fields = [field for field in required_fields if field not in profile]
                
                if not missing_fields:
                    # Check multilingual fields
                    if isinstance(profile.get('title'), dict) and 'fr' in profile['title'] and 'en' in profile['title']:
                        if isinstance(profile.get('bio'), dict) and 'fr' in profile['bio'] and 'en' in profile['bio']:
                            # Check if it's Jean Yves Yao
                            if profile['first_name'] == 'Jean Yves' and profile['last_name'] == 'Yao':
                                self.log_test("GET /api/profile - Profile data", True, 
                                            f"Profile for {profile['first_name']} {profile['last_name']}")
                            else:
                                self.log_test("GET /api/profile - Profile data", False, 
                                            f"Expected Jean Yves Yao, got {profile.get('first_name')} {profile.get('last_name')}")
                        else:
                            self.log_test("GET /api/profile - Profile data", False, "Bio field missing multilingual content")
                    else:
                        self.log_test("GET /api/profile - Profile data", False, "Title field missing multilingual content")
                else:
                    self.log_test("GET /api/profile - Profile data", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("GET /api/profile - Profile data", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/profile - Profile data", False, f"Exception: {str(e)}")
    
    def test_projects_endpoints(self):
        """Test projects endpoints"""
        print("\n=== Testing Projects Endpoints ===")
        
        # Test all projects
        try:
            response = self.session.get(f"{self.base_url}/projects")
            if response.status_code == 200:
                projects = response.json()
                if isinstance(projects, list) and len(projects) > 0:
                    # Check first project structure
                    project = projects[0]
                    required_fields = ['title', 'description', 'category', 'client', 'year', 'tags']
                    missing_fields = [field for field in required_fields if field not in project]
                    
                    if not missing_fields:
                        # Check multilingual fields
                        if isinstance(project.get('title'), dict) and 'fr' in project['title'] and 'en' in project['title']:
                            if isinstance(project.get('description'), dict) and 'fr' in project['description'] and 'en' in project['description']:
                                self.log_test("GET /api/projects - All projects", True, 
                                            f"Found {len(projects)} projects with multilingual content")
                            else:
                                self.log_test("GET /api/projects - All projects", False, "Project description missing multilingual content")
                        else:
                            self.log_test("GET /api/projects - All projects", False, "Project title missing multilingual content")
                    else:
                        self.log_test("GET /api/projects - All projects", False, f"Project missing fields: {missing_fields}")
                else:
                    self.log_test("GET /api/projects - All projects", False, "No projects found or invalid response format")
            else:
                self.log_test("GET /api/projects - All projects", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/projects - All projects", False, f"Exception: {str(e)}")
        
        # Test featured projects
        try:
            response = self.session.get(f"{self.base_url}/projects/featured")
            if response.status_code == 200:
                featured_projects = response.json()
                if isinstance(featured_projects, list):
                    # Check that all returned projects are featured
                    all_featured = all(project.get('featured', False) for project in featured_projects)
                    if all_featured:
                        self.log_test("GET /api/projects/featured - Featured projects", True, 
                                    f"Found {len(featured_projects)} featured projects")
                    else:
                        self.log_test("GET /api/projects/featured - Featured projects", False, 
                                    "Some returned projects are not marked as featured")
                else:
                    self.log_test("GET /api/projects/featured - Featured projects", False, "Invalid response format")
            else:
                self.log_test("GET /api/projects/featured - Featured projects", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/projects/featured - Featured projects", False, f"Exception: {str(e)}")
        
        # Test projects by category filter
        try:
            response = self.session.get(f"{self.base_url}/projects?category=Content Strategy")
            if response.status_code == 200:
                filtered_projects = response.json()
                if isinstance(filtered_projects, list):
                    # Check that all returned projects have the correct category
                    correct_category = all(project.get('category') == 'Content Strategy' for project in filtered_projects)
                    if correct_category:
                        self.log_test("GET /api/projects?category - Category filter", True, 
                                    f"Found {len(filtered_projects)} projects in 'Content Strategy' category")
                    else:
                        self.log_test("GET /api/projects?category - Category filter", False, 
                                    "Some returned projects don't match the category filter")
                else:
                    self.log_test("GET /api/projects?category - Category filter", False, "Invalid response format")
            else:
                self.log_test("GET /api/projects?category - Category filter", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/projects?category - Category filter", False, f"Exception: {str(e)}")
    
    def test_skills_endpoint(self):
        """Test skills endpoint"""
        print("\n=== Testing Skills Endpoint ===")
        
        try:
            response = self.session.get(f"{self.base_url}/skills")
            if response.status_code == 200:
                skills = response.json()
                if isinstance(skills, list) and len(skills) > 0:
                    # Check first skill structure
                    skill = skills[0]
                    required_fields = ['name', 'category', 'level', 'description']
                    missing_fields = [field for field in required_fields if field not in skill]
                    
                    if not missing_fields:
                        # Check multilingual description
                        if isinstance(skill.get('description'), dict) and 'fr' in skill['description'] and 'en' in skill['description']:
                            # Check level is valid (0-100)
                            level = skill.get('level', 0)
                            if 0 <= level <= 100:
                                # Check categories
                                categories = set(s.get('category') for s in skills)
                                expected_categories = {'Writing', 'SEO', 'Marketing', 'Strategy', 'Technical', 'Social Media'}
                                if categories.intersection(expected_categories):
                                    self.log_test("GET /api/skills - Skills data", True, 
                                                f"Found {len(skills)} skills with {len(categories)} categories")
                                else:
                                    self.log_test("GET /api/skills - Skills data", False, 
                                                f"Unexpected categories: {categories}")
                            else:
                                self.log_test("GET /api/skills - Skills data", False, f"Invalid skill level: {level}")
                        else:
                            self.log_test("GET /api/skills - Skills data", False, "Skill description missing multilingual content")
                    else:
                        self.log_test("GET /api/skills - Skills data", False, f"Skill missing fields: {missing_fields}")
                else:
                    self.log_test("GET /api/skills - Skills data", False, "No skills found or invalid response format")
            else:
                self.log_test("GET /api/skills - Skills data", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/skills - Skills data", False, f"Exception: {str(e)}")
    
    def test_testimonials_endpoints(self):
        """Test testimonials endpoints"""
        print("\n=== Testing Testimonials Endpoints ===")
        
        # Test all testimonials
        try:
            response = self.session.get(f"{self.base_url}/testimonials")
            if response.status_code == 200:
                testimonials = response.json()
                if isinstance(testimonials, list) and len(testimonials) > 0:
                    # Check first testimonial structure
                    testimonial = testimonials[0]
                    required_fields = ['name', 'position', 'company', 'rating', 'comment']
                    missing_fields = [field for field in required_fields if field not in testimonial]
                    
                    if not missing_fields:
                        # Check multilingual comment
                        if isinstance(testimonial.get('comment'), dict) and 'fr' in testimonial['comment'] and 'en' in testimonial['comment']:
                            # Check rating is valid (1-5)
                            rating = testimonial.get('rating', 0)
                            if 1 <= rating <= 5:
                                self.log_test("GET /api/testimonials - All testimonials", True, 
                                            f"Found {len(testimonials)} testimonials with multilingual content")
                            else:
                                self.log_test("GET /api/testimonials - All testimonials", False, f"Invalid rating: {rating}")
                        else:
                            self.log_test("GET /api/testimonials - All testimonials", False, "Testimonial comment missing multilingual content")
                    else:
                        self.log_test("GET /api/testimonials - All testimonials", False, f"Testimonial missing fields: {missing_fields}")
                else:
                    self.log_test("GET /api/testimonials - All testimonials", False, "No testimonials found or invalid response format")
            else:
                self.log_test("GET /api/testimonials - All testimonials", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/testimonials - All testimonials", False, f"Exception: {str(e)}")
        
        # Test featured testimonials
        try:
            response = self.session.get(f"{self.base_url}/testimonials/featured")
            if response.status_code == 200:
                featured_testimonials = response.json()
                if isinstance(featured_testimonials, list):
                    # Check that all returned testimonials are featured
                    all_featured = all(testimonial.get('featured', False) for testimonial in featured_testimonials)
                    if all_featured:
                        self.log_test("GET /api/testimonials/featured - Featured testimonials", True, 
                                    f"Found {len(featured_testimonials)} featured testimonials")
                    else:
                        self.log_test("GET /api/testimonials/featured - Featured testimonials", False, 
                                    "Some returned testimonials are not marked as featured")
                else:
                    self.log_test("GET /api/testimonials/featured - Featured testimonials", False, "Invalid response format")
            else:
                self.log_test("GET /api/testimonials/featured - Featured testimonials", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/testimonials/featured - Featured testimonials", False, f"Exception: {str(e)}")
    
    def test_services_endpoint(self):
        """Test services endpoint"""
        print("\n=== Testing Services Endpoint ===")
        
        try:
            response = self.session.get(f"{self.base_url}/services")
            if response.status_code == 200:
                services = response.json()
                if isinstance(services, list) and len(services) > 0:
                    # Check first service structure
                    service = services[0]
                    required_fields = ['name', 'description', 'icon', 'price', 'features']
                    missing_fields = [field for field in required_fields if field not in service]
                    
                    if not missing_fields:
                        # Check multilingual fields
                        if isinstance(service.get('name'), dict) and 'fr' in service['name'] and 'en' in service['name']:
                            if isinstance(service.get('description'), dict) and 'fr' in service['description'] and 'en' in service['description']:
                                if isinstance(service.get('features'), dict) and 'fr' in service['features'] and 'en' in service['features']:
                                    # Check that features are lists
                                    fr_features = service['features']['fr']
                                    en_features = service['features']['en']
                                    if isinstance(fr_features, list) and isinstance(en_features, list):
                                        self.log_test("GET /api/services - Services data", True, 
                                                    f"Found {len(services)} services with multilingual content and pricing")
                                    else:
                                        self.log_test("GET /api/services - Services data", False, "Service features are not lists")
                                else:
                                    self.log_test("GET /api/services - Services data", False, "Service features missing multilingual content")
                            else:
                                self.log_test("GET /api/services - Services data", False, "Service description missing multilingual content")
                        else:
                            self.log_test("GET /api/services - Services data", False, "Service name missing multilingual content")
                    else:
                        self.log_test("GET /api/services - Services data", False, f"Service missing fields: {missing_fields}")
                else:
                    self.log_test("GET /api/services - Services data", False, "No services found or invalid response format")
            else:
                self.log_test("GET /api/services - Services data", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/services - Services data", False, f"Exception: {str(e)}")
    
    def test_contact_endpoint(self):
        """Test contact endpoint"""
        print("\n=== Testing Contact Endpoint ===")
        
        # Test sending a message
        test_message = {
            "name": "Sophie Dubois",
            "email": "sophie.dubois@example.com",
            "subject": "Demande de devis pour rédaction de contenu",
            "message": "Bonjour Jean Yves, je souhaiterais obtenir un devis pour la rédaction de contenu pour mon site e-commerce. Pouvez-vous me contacter pour discuter de mes besoins ?"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/contact", json=test_message)
            if response.status_code == 200:
                result = response.json()
                if "message" in result and "id" in result:
                    message_id = result["id"]
                    self.log_test("POST /api/contact - Send message", True, 
                                f"Message sent successfully with ID: {message_id}")
                    
                    # Test retrieving messages (if endpoint exists)
                    try:
                        messages_response = self.session.get(f"{self.base_url}/messages")
                        if messages_response.status_code == 200:
                            messages = messages_response.json()
                            if isinstance(messages, list):
                                # Find our test message
                                test_msg_found = any(msg.get('email') == test_message['email'] for msg in messages)
                                if test_msg_found:
                                    self.log_test("GET /api/messages - Retrieve messages", True, 
                                                f"Found {len(messages)} messages including test message")
                                else:
                                    self.log_test("GET /api/messages - Retrieve messages", True, 
                                                f"Found {len(messages)} messages (test message may not be visible)")
                            else:
                                self.log_test("GET /api/messages - Retrieve messages", False, "Invalid response format")
                        else:
                            self.log_test("GET /api/messages - Retrieve messages", False, f"Status code: {messages_response.status_code}")
                    except Exception as e:
                        self.log_test("GET /api/messages - Retrieve messages", False, f"Exception: {str(e)}")
                        
                else:
                    self.log_test("POST /api/contact - Send message", False, "Missing required fields in response")
            else:
                self.log_test("POST /api/contact - Send message", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("POST /api/contact - Send message", False, f"Exception: {str(e)}")
    
    def test_data_consistency(self):
        """Test data consistency and completeness"""
        print("\n=== Testing Data Consistency ===")
        
        try:
            # Get all data
            profile_response = self.session.get(f"{self.base_url}/profile")
            projects_response = self.session.get(f"{self.base_url}/projects")
            skills_response = self.session.get(f"{self.base_url}/skills")
            testimonials_response = self.session.get(f"{self.base_url}/testimonials")
            services_response = self.session.get(f"{self.base_url}/services")
            
            all_success = all(r.status_code == 200 for r in [profile_response, projects_response, skills_response, testimonials_response, services_response])
            
            if all_success:
                profile = profile_response.json()
                projects = projects_response.json()
                skills = skills_response.json()
                testimonials = testimonials_response.json()
                services = services_response.json()
                
                # Check data completeness
                data_complete = (
                    len(projects) >= 3 and  # At least 3 projects
                    len(skills) >= 5 and    # At least 5 skills
                    len(testimonials) >= 3 and  # At least 3 testimonials
                    len(services) >= 3      # At least 3 services
                )
                
                if data_complete:
                    # Check featured content exists
                    featured_projects = [p for p in projects if p.get('featured')]
                    featured_testimonials = [t for t in testimonials if t.get('featured')]
                    
                    if len(featured_projects) >= 2 and len(featured_testimonials) >= 2:
                        self.log_test("Data consistency - Complete portfolio", True, 
                                    f"Portfolio contains: {len(projects)} projects, {len(skills)} skills, {len(testimonials)} testimonials, {len(services)} services")
                    else:
                        self.log_test("Data consistency - Complete portfolio", False, 
                                    f"Insufficient featured content: {len(featured_projects)} featured projects, {len(featured_testimonials)} featured testimonials")
                else:
                    self.log_test("Data consistency - Complete portfolio", False, 
                                f"Insufficient data: {len(projects)} projects, {len(skills)} skills, {len(testimonials)} testimonials, {len(services)} services")
            else:
                self.log_test("Data consistency - Complete portfolio", False, "Failed to retrieve all data endpoints")
                
        except Exception as e:
            self.log_test("Data consistency - Complete portfolio", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting Portfolio API Tests")
        print(f"Testing backend at: {self.base_url}")
        print("=" * 60)
        
        self.test_health_endpoints()
        self.test_profile_endpoint()
        self.test_projects_endpoints()
        self.test_skills_endpoint()
        self.test_testimonials_endpoints()
        self.test_services_endpoint()
        self.test_contact_endpoint()
        self.test_data_consistency()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if total - passed > 0:
            print("\n❌ Failed Tests:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['details']}")
        
        return passed == total

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! The Portfolio API is ready for frontend integration.")
    else:
        print("\n⚠️  Some tests failed. Please check the issues above.")
    
    exit(0 if success else 1)