# textme
What is Innminds ?
Innminds is a cutting-edge tutoring platform designed to revolutionize the way students learn and excel in their academic pursuits. With a user-friendly interface and powerful features, our application connects students with experienced tutors, providing personalized learning experiences tailored to their individual needs.

Why Choose Innminds?
Quality Education: We prioritize quality instruction and academic excellence, ensuring that students receive the highest standard of tutoring from verified tutors. Convenience: With anytime, anywhere access, students can learn from the comfort of their own homes, eliminating the hassle of commuting to tutoring centers. Affordability: We believe that every student deserves access to quality education. Our transparent pricing model offers competitive rates and flexible payment options. Community Support: Join a vibrant community of learners and educators, where students can collaborate with peers, share study tips, and access additional resources to enhance their learning journey.

Documentation
Software Requirement Specification
Overview
Innminds is a cutting-edge tutoring platform designed to revolutionize the way students learn and excel in their academic pursuits. With a user-friendly interface and powerful features, our application connects students with experienced tutors, providing personalized learning experiences tailored to their individual needs.

components and functional requirement
1. Authentication and authorisation management

user can register through admin
user can log into innminds webapp
user can access their unique profile
2. User/Profile management

user can access their personal preferences
user can update their personal information
user can deactivate their profile
3. Grading subsystem

user able to see their marks
tutor able to upload grades
student can get a progress result
4. communication/chat subsystem

student

user able to send and receive from community of the subject they enrolled in
user can directly message the tutor involved with the subject
submit feedback on the lessons
tutor

send and receive message in community of their subject
send and receive message to/from student
announce of any new content
5. lesson management subsystem

student

student able to attend classes
student able to download classes pdf notes
student able to download past papers and extra resources
submit homework
tutor

tutor can upload youtube video
tutor can upload pdf of the lesson
tutor can review homework
tutor can upload homework
6. Request subsystem

student can log a request for any personal information they would like to change
tutor can log a request for any details to be added or edited
7. Subject Management

tutor able to add and edit subject
tutor to delete subject
use case diagrams
architecture diagram
Design
Wireframes
Domain Model
State diagram
running application
FRONTEND
npm install

Development
npm run dev

Production
npm run build
npm start
Docker frontend (if you have environement setup)
npm run docker
npm run docker-start
docker currently running in detach mode so you will need to add the following under environment variables

ENV NEXT_PUBLIC_API_BASE_URI ACTUAL_BASE_URL
BACKEND
Visual Studio

select web.host as startup project
build application
run application under IIS Express
FRONTEND-CI
npm run ci
Setup for husky
In the client directory run the following command

npm run prepare